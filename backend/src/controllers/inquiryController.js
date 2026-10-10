const Inquiry = require("../models/Inquiry");
const Destination = require("../models/Destination");
const TourPackage = require("../models/TourPackage");
const { slugify } = require("../utils/query");
const { sendInquiryNotification } = require("../services/emailService");

const escapeRegex = (str) => String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

exports.create = async (req, res, next) => {
  try {
    const rawDest = req.body.destinationId || req.body.destination;
    const rawPkg = req.body.packageId || req.body.package;
    let destination = undefined;
    let tourPkg = undefined;

    if (rawDest) {
      const destStr = String(rawDest).trim();
      if (/^[a-f\d]{24}$/i.test(destStr)) {
        const found = await Destination.findById(destStr).select("_id").lean();
        if (found) destination = found._id;
      }
      if (!destination) {
        const found = await Destination.findOne({
          $or: [
            { slug: slugify(destStr) },
            { slug: destStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(destStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) destination = found._id;
      }
    }

    if (rawPkg) {
      const pkgStr = String(rawPkg).trim();
      if (/^[a-f\d]{24}$/i.test(pkgStr)) {
        const found = await TourPackage.findById(pkgStr).select("_id").lean();
        if (found) tourPkg = found._id;
      }
      if (!tourPkg) {
        const found = await TourPackage.findOne({
          $or: [
            { slug: slugify(pkgStr) },
            { slug: pkgStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(pkgStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) tourPkg = found._id;
      }
    }

    const payload = { ...req.body };
    if (destination) payload.destination = destination; else delete payload.destination;
    if (tourPkg) payload.package = tourPkg; else delete payload.package;
    if (req.user?.id) payload.user = req.user.id;

    const item = await Inquiry.create(payload);

    // Dispatch SMTP email notification to shaikjafarsadhik2521@gmail.com
    sendInquiryNotification({
      name: item.name,
      email: item.email,
      phone: item.phone,
      service: req.body.service,
      message: item.message,
      destinationName: req.body.destinationTitle || req.body.destination,
      packageName: req.body.packageTitle || req.body.package,
    }).catch((err) => {
      console.error("[Email Notification Failed]:", err.message);
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};
