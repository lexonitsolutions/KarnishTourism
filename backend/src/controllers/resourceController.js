const { pagination, slugify } = require("../utils/query");
const mongoose = require("mongoose");
const Destination = require("../models/Destination");
const TourPackage = require("../models/TourPackage");
const { STARTER_DESTINATIONS } = require("../services/catalogSeed");

const escapeRegex = (str) => String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const serialize = (value) => ({ ...value, id: String(value._id || value.id), title: value.title || value.name });

async function resolveReferences(Model, data) {
  if (!Model.schema) return data;

  // 1. Resolve destination reference if model has a 'destination' path
  if (Model.schema.path("destination") && data.destination !== undefined && data.destination !== null) {
    let destVal = data.destination;
    if (typeof destVal === "object" && destVal !== null) {
      destVal = destVal._id || destVal.id || destVal.slug || destVal.title;
    }
    const destStr = String(destVal || "").trim();

    if (destStr) {
      let resolvedId = null;

      // Check if it's already a valid 24-character hexadecimal ObjectId
      if (/^[a-f\d]{24}$/i.test(destStr)) {
        const found = await Destination.findById(destStr).select("_id").lean();
        if (found) resolvedId = found._id;
      }

      // If not resolved yet, search by slug or title
      if (!resolvedId) {
        const candidateSlug = slugify(destStr);
        const found = await Destination.findOne({
          $or: [
            { slug: candidateSlug },
            { slug: destStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(destStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) resolvedId = found._id;
      }

      // If still not resolved, check starter destinations or auto-create Destination
      if (!resolvedId) {
        const candidateSlug = slugify(destStr);
        const starter = (STARTER_DESTINATIONS || []).find(
          d => d.slug === candidateSlug || d.slug === destStr.toLowerCase() || d.title.toLowerCase() === destStr.toLowerCase()
        );
        const typeHint = data.type || (starter ? starter.type : "international");
        const created = await Destination.create({
          title: starter?.title || (destStr.charAt(0).toUpperCase() + destStr.slice(1)),
          slug: starter?.slug || candidateSlug,
          country: starter?.country || (typeHint === "domestic" ? "India" : "International"),
          type: typeHint,
          imageUrl: starter?.imageUrl || "/images/destination-01.jpg",
          description: starter?.description || `Explore ${starter?.title || destStr} tours, stays and packages.`,
          status: "active"
        });
        resolvedId = created._id;
      }

      data.destination = resolvedId;
    } else {
      delete data.destination;
    }
  }

  // 2. Resolve package reference if model has a 'package' path (e.g. Inquiries, Bookings, Reviews)
  if (Model.schema.path("package") && data.package !== undefined && data.package !== null) {
    let pkgVal = data.package;
    if (typeof pkgVal === "object" && pkgVal !== null) {
      pkgVal = pkgVal._id || pkgVal.id || pkgVal.slug || pkgVal.title;
    }
    const pkgStr = String(pkgVal || "").trim();
    if (pkgStr) {
      let resolvedId = null;
      if (/^[a-f\d]{24}$/i.test(pkgStr)) {
        const found = await TourPackage.findById(pkgStr).select("_id").lean();
        if (found) resolvedId = found._id;
      }
      if (!resolvedId) {
        const candidateSlug = slugify(pkgStr);
        const found = await TourPackage.findOne({
          $or: [
            { slug: candidateSlug },
            { slug: pkgStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(pkgStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) resolvedId = found._id;
      }
      if (resolvedId) {
        data.package = resolvedId;
      } else {
        delete data.package;
      }
    } else {
      delete data.package;
    }
  }

  return data;
}

const filterFor = (query, isPublic, resource) => {
  const statusMap = { reviews: "approved", testimonials: "approved", posts: "published", blogs: "published" };
  const filter = isPublic ? { status: statusMap[resource] || "active" } : {};
  for (const field of ["type", "featured", "destination", "category", "status", "available"]) {
    if (query[field] !== undefined) filter[field] = query[field];
  }
  if (query.search) filter.$text = { $search: String(query.search).slice(0, 100) };
  return filter;
};

const list = (Model, { isPublic = false, resource } = {}) => async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = filterFor(req.query, isPublic, resource);
    let queryBuilder = Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    if (Model.schema && Model.schema.path("destination")) {
      queryBuilder = queryBuilder.populate("destination", "title country slug type");
    }
    const [items, total] = await Promise.all([
      queryBuilder.lean(),
      Model.countDocuments(filter)
    ]);
    res.json({ success: true, items: items.map(serialize), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

const getOne = (Model, { isPublic = false, resource } = {}) => async (req, res, next) => {
  try {
    const statusMap = { reviews: "approved", testimonials: "approved", posts: "published", blogs: "published" };
    const selector = /^[a-f\d]{24}$/i.test(req.params.id) ? { _id: req.params.id } : { slug: req.params.id };
    if (isPublic) selector.status = statusMap[resource] || "active";
    let queryBuilder = Model.findOne(selector);
    if (Model.schema && Model.schema.path("destination")) {
      queryBuilder = queryBuilder.populate("destination", "title country slug type");
    }
    const item = await queryBuilder.lean();
    if (!item) return res.status(404).json({ success: false, error: "Record not found" });
    res.json({ success: true, item: serialize(item) });
  } catch (error) { next(error); }
};

const create = (Model) => async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: "MongoDB is disconnected. Check the Atlas connection and try again." });
    }
    const data = { ...req.body };
    const titleOrName = data.title || data.name;
    if (titleOrName && !data.slug && Model.schema && Model.schema.path("slug")) {
      const baseSlug = slugify(titleOrName);
      let candidateSlug = baseSlug;
      let counter = 1;
      while (await Model.exists({ slug: candidateSlug })) {
        candidateSlug = `${baseSlug}-${counter++}`;
      }
      data.slug = candidateSlug;
    }
    await resolveReferences(Model, data);
    const item = await Model.create(data);
    res.status(201).json({ success: true, item: serialize(item.toObject ? item.toObject() : item) });
  } catch (error) { next(error); }
};

const update = (Model) => async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: "MongoDB is disconnected. Check the Atlas connection and try again." });
    }
    const data = { ...req.body };
    await resolveReferences(Model, data);
    const item = await Model.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: "Record not found" });
    res.json({ success: true, item: serialize(item.toObject ? item.toObject() : item) });
  } catch (error) { next(error); }
};

const remove = (Model) => async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: "MongoDB is disconnected. Check the Atlas connection and try again." });
    }
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Record not found" });
    res.json({ success: true });
  } catch (error) { next(error); }
};

module.exports = { list, getOne, create, update, remove };
