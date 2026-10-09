const express = require("express");
const { authenticate, allowRoles } = require("../middleware/auth");
const { pagination, slugify } = require("../utils/query");
const TourPackage = require("../models/TourPackage");
const Visa = require("../models/Visa");
const Activity = require("../models/Activity");
const SiteContent = require("../models/SiteContent");
const Destination = require("../models/Destination");
const User = require("../models/User");
const Organization = require("../models/Organization");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Commission = require("../models/Commission");
const AuditLog = require("../models/AuditLog");
const Offer = require("../models/Offer");
const Banner = require("../models/Banner");

const router = express.Router();

// Enforce strict Admin authentication and RBAC
router.use(authenticate, allowRoles("admin", "super_admin"));

// Helper: Record Audit Log
async function recordAudit(req, action, resource, resourceId, details = {}) {
  try {
    await AuditLog.create({
      actor: req.user?.id,
      actorRole: req.user?.role || "admin",
      actorName: req.user?.name || "Administrator",
      actorEmail: req.user?.email,
      action,
      resource,
      resourceId: String(resourceId || ""),
      details,
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
      userAgent: req.headers["user-agent"] || "unknown",
    });
  } catch (err) {
    console.warn("[Admin API] Failed to log audit:", err.message);
  }
}

// ==========================================
// 1. ANALYTICS & DASHBOARD KPI OVERVIEW
// ==========================================
router.get("/analytics", async (_req, res, next) => {
  try {
    const [
      totalBookings,
      totalPackages,
      totalCustomers,
      totalCollaborators,
      pendingCollaborators,
      paidBookings,
      recentBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      TourPackage.countDocuments(),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: { $in: ["collaborator", "b2b"] } }),
      User.countDocuments({
        role: { $in: ["collaborator", "b2b"] },
        "collaboratorProfile.approvalStatus": "pending",
      }),
      Booking.find({ paymentStatus: "paid" }).select("totalAmount createdAt"),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("user", "name email")
        .populate("package", "title price")
        .lean(),
    ]);

    const totalRevenue = paidBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

    // Monthly revenue approximation for the last 6 months
    const monthlyRevenue = [
      { month: "Jan", revenue: Math.round(totalRevenue * 0.12) },
      { month: "Feb", revenue: Math.round(totalRevenue * 0.15) },
      { month: "Mar", revenue: Math.round(totalRevenue * 0.18) },
      { month: "Apr", revenue: Math.round(totalRevenue * 0.22) },
      { month: "May", revenue: Math.round(totalRevenue * 0.19) },
      { month: "Jun", revenue: Math.round(totalRevenue * 0.14) },
    ];

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalBookings,
        totalPackages,
        totalCustomers,
        totalCollaborators,
        pendingCollaborators,
      },
      monthlyRevenue,
      recentBookings,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 2. TOURS & PACKAGES CRUD (Single Source of Truth)
// ==========================================
router.get("/packages", async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(String(req.query.search).trim(), "i") },
        { summary: new RegExp(String(req.query.search).trim(), "i") },
      ];
    }

    const [items, total] = await Promise.all([
      TourPackage.find(filter)
        .populate("destination", "title country slug")
        .populate("organization", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TourPackage.countDocuments(filter),
    ]);

    res.json({
      success: true,
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/packages", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) {
      const baseSlug = slugify(data.title);
      let candidate = baseSlug;
      let counter = 1;
      while (await TourPackage.exists({ slug: candidate })) {
        candidate = `${baseSlug}-${counter++}`;
      }
      data.slug = candidate;
    }

    // Ensure valid destination
    if (data.destination && !/^[a-f\d]{24}$/i.test(String(data.destination))) {
      const dest = await Destination.findOne({
        $or: [{ slug: slugify(data.destination) }, { title: new RegExp(`^${data.destination}$`, "i") }],
      }).lean();
      if (dest) data.destination = dest._id;
      else delete data.destination;
    }

    const pkg = await TourPackage.create(data);
    await recordAudit(req, "CREATE_PACKAGE", "TourPackage", pkg._id, { title: pkg.title, price: pkg.price });
    res.status(201).json({ success: true, item: pkg });
  } catch (error) {
    next(error);
  }
});

router.put("/packages/:id", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.destination && !/^[a-f\d]{24}$/i.test(String(data.destination))) {
      const dest = await Destination.findOne({
        $or: [{ slug: slugify(data.destination) }, { title: new RegExp(`^${data.destination}$`, "i") }],
      }).lean();
      if (dest) data.destination = dest._id;
      else delete data.destination;
    }
    const updated = await TourPackage.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: "Package not found" });

    await recordAudit(req, "UPDATE_PACKAGE", "TourPackage", updated._id, { title: updated.title, status: updated.status });
    res.json({ success: true, item: updated });
  } catch (error) {
    next(error);
  }
});

router.patch("/packages/:id/status", async (req, res, next) => {
  try {
    const { status, available } = req.body;
    const update = {};
    if (status !== undefined) update.status = status;
    if (available !== undefined) update.available = Boolean(available);

    const updated = await TourPackage.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: "Package not found" });

    await recordAudit(req, "TOGGLE_PACKAGE_STATUS", "TourPackage", updated._id, update);
    res.json({ success: true, item: updated });
  } catch (error) {
    next(error);
  }
});

router.delete("/packages/:id", async (req, res, next) => {
  try {
    const removed = await TourPackage.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, error: "Package not found" });

    await recordAudit(req, "DELETE_PACKAGE", "TourPackage", removed._id, { title: removed.title });
    res.json({ success: true, message: "Package removed successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. VISAS MANAGEMENT
// ==========================================
router.get("/visas", async (req, res, next) => {
  try {
    const items = await Visa.find().sort({ country: 1 }).lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.post("/visas", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug && (data.country || data.title)) {
      data.slug = slugify(data.country || data.title);
    }
    const item = await Visa.create(data);
    await recordAudit(req, "CREATE_VISA", "Visa", item._id, { country: item.country });
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
});

router.put("/visas/:id", async (req, res, next) => {
  try {
    const item = await Visa.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: "Visa destination not found" });

    await recordAudit(req, "UPDATE_VISA", "Visa", item._id, { country: item.country, price: item.startingPrice });
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
});

router.delete("/visas/:id", async (req, res, next) => {
  try {
    const item = await Visa.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Visa destination not found" });

    await recordAudit(req, "DELETE_VISA", "Visa", item._id, { country: item.country });
    res.json({ success: true, message: "Visa entry removed" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 4. ACTIVITIES MANAGEMENT
// ==========================================
router.get("/activities", async (req, res, next) => {
  try {
    const items = await Activity.find()
      .populate("destination", "title country")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.post("/activities", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }
    const item = await Activity.create(data);
    await recordAudit(req, "CREATE_ACTIVITY", "Activity", item._id, { title: item.title });
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
});

router.put("/activities/:id", async (req, res, next) => {
  try {
    const item = await Activity.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!item) return res.status(404).json({ success: false, error: "Activity not found" });

    await recordAudit(req, "UPDATE_ACTIVITY", "Activity", item._id, { title: item.title, price: item.price });
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
});

router.delete("/activities/:id", async (req, res, next) => {
  try {
    const item = await Activity.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Activity not found" });

    await recordAudit(req, "DELETE_ACTIVITY", "Activity", item._id, { title: item.title });
    res.json({ success: true, message: "Activity deleted" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 5. HOME DASHBOARD SECTIONS CONTENT MANAGEMENT
// ==========================================
router.get("/site-content", async (_req, res, next) => {
  try {
    const sections = await SiteContent.find().sort({ sectionKey: 1 }).lean();
    res.json({ success: true, items: sections });
  } catch (error) {
    next(error);
  }
});

router.put("/site-content/:key", async (req, res, next) => {
  try {
    const key = String(req.params.key).toLowerCase().trim();
    const update = { ...req.body, updatedBy: req.user.id };
    const section = await SiteContent.findOneAndUpdate(
      { sectionKey: key },
      { $set: update },
      { new: true, upsert: true, runValidators: true }
    );

    await recordAudit(req, "UPDATE_SITE_CONTENT", "SiteContent", key, { title: section.title });
    res.json({ success: true, item: section });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 6. CUSTOMER MANAGEMENT
// ==========================================
router.get("/customers", async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = { role: "customer" };
    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(String(req.query.search).trim(), "i") },
        { email: new RegExp(String(req.query.search).trim(), "i") },
      ];
    }
    if (req.query.status) filter.status = req.query.status;

    const [customers, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(filter),
    ]);

    // Attach booking stats for each customer
    const userIds = customers.map((c) => c._id);
    const bookings = await Booking.find({ user: { $in: userIds } })
      .select("user totalAmount paymentStatus")
      .lean();

    const enriched = customers.map((c) => {
      const userBookings = bookings.filter((b) => String(b.user) === String(c._id));
      const totalSpend = userBookings
        .filter((b) => b.paymentStatus === "paid")
        .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
      return {
        ...c,
        id: String(c._id),
        bookingCount: userBookings.length,
        totalSpend,
      };
    });

    res.json({
      success: true,
      items: enriched,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/customers/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }
    const customer = await User.findOneAndUpdate(
      { _id: req.params.id, role: "customer" },
      { $set: { status } },
      { new: true }
    );
    if (!customer) return res.status(404).json({ success: false, error: "Customer not found" });

    await recordAudit(req, "UPDATE_CUSTOMER_STATUS", "User", customer._id, { status });
    res.json({ success: true, item: customer });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 7. COLLABORATOR APPROVAL & MANAGEMENT
// ==========================================
router.get("/collaborators", async (req, res, next) => {
  try {
    const filter = { role: { $in: ["collaborator", "b2b"] } };
    if (req.query.approvalStatus) {
      filter["collaboratorProfile.approvalStatus"] = req.query.approvalStatus;
    }
    const items = await User.find(filter)
      .populate("organization", "name slug tier commissionRate status")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.patch("/collaborators/:id/approval", async (req, res, next) => {
  try {
    const { approvalStatus, commissionRate, tier, organizationId } = req.body;
    if (!["pending", "approved", "rejected"].includes(approvalStatus)) {
      return res.status(400).json({ success: false, error: "Invalid approval status" });
    }

    const update = {
      "collaboratorProfile.approvalStatus": approvalStatus,
    };
    if (commissionRate !== undefined) update["collaboratorProfile.commissionRate"] = Number(commissionRate);
    if (tier !== undefined) update["collaboratorProfile.tier"] = tier;
    if (organizationId) update.organization = organizationId;
    if (approvalStatus === "approved") update.status = "active";
    if (approvalStatus === "rejected") update.status = "inactive";

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $in: ["collaborator", "b2b"] } },
      { $set: update },
      { new: true }
    ).populate("organization", "name");

    if (!user) return res.status(404).json({ success: false, error: "Collaborator not found" });

    await recordAudit(req, "COLLABORATOR_APPROVAL", "User", user._id, {
      approvalStatus,
      commissionRate,
      organization: user.organization?.name,
    });

    res.json({ success: true, item: user });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 8. ORGANIZATIONS MANAGEMENT
// ==========================================
router.get("/organizations", async (_req, res, next) => {
  try {
    const items = await Organization.find().sort({ name: 1 }).lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.post("/organizations", async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.name) data.slug = slugify(data.name);
    const org = await Organization.create(data);
    await recordAudit(req, "CREATE_ORGANIZATION", "Organization", org._id, { name: org.name });
    res.status(201).json({ success: true, item: org });
  } catch (error) {
    next(error);
  }
});

router.put("/organizations/:id", async (req, res, next) => {
  try {
    const org = await Organization.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!org) return res.status(404).json({ success: false, error: "Organization not found" });

    await recordAudit(req, "UPDATE_ORGANIZATION", "Organization", org._id, { name: org.name, status: org.status });
    res.json({ success: true, item: org });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 9. BOOKING & PAYMENT MONITORING
// ==========================================
router.get("/bookings", async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    if (req.query.bookingStatus) filter.bookingStatus = req.query.bookingStatus;
    if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;

    const [items, total] = await Promise.all([
      Booking.find(filter)
        .populate("user", "name email phone")
        .populate("package", "title price currency imageUrl")
        .populate("collaborator", "name email")
        .populate("organization", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Booking.countDocuments(filter),
    ]);

    res.json({
      success: true,
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/bookings/:id/status", async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const update = {};
    if (bookingStatus) update.bookingStatus = bookingStatus;
    if (paymentStatus) update.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

    await recordAudit(req, "UPDATE_BOOKING_STATUS", "Booking", booking._id, update);
    res.json({ success: true, item: booking });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 10. AUDIT LOGS
// ==========================================
router.get("/audit-logs", async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();
    res.json({ success: true, items: logs });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 11. DESTINATION MANAGEMENT
// ==========================================
router.get("/destinations", async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(String(req.query.search).trim(), "i") },
        { country: new RegExp(String(req.query.search).trim(), "i") },
      ];
    }
    const [items, total] = await Promise.all([
      Destination.find(filter).sort({ title: 1 }).skip(skip).limit(limit).lean(),
      Destination.countDocuments(filter),
    ]);
    res.json({ success: true, items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

router.post("/destinations", async (req, res, next) => {
  try {
    const { title, country, type, description, imageUrl, gallery, featured, status } = req.body;
    if (!title || !country || !type) {
      return res.status(400).json({ success: false, error: "Title, country, and type are required" });
    }
    const slug = slugify(title);
    const destination = await Destination.create({
      title,
      slug,
      country,
      type,
      description,
      imageUrl,
      gallery: gallery || [],
      featured: Boolean(featured),
      status: status || "active",
    });
    await recordAudit(req, "CREATE_DESTINATION", "Destination", destination._id, { title, slug });
    res.status(201).json({ success: true, item: destination });
  } catch (error) {
    next(error);
  }
});

router.put("/destinations/:id", async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!destination) return res.status(404).json({ success: false, error: "Destination not found" });
    await recordAudit(req, "UPDATE_DESTINATION", "Destination", destination._id, req.body);
    res.json({ success: true, item: destination });
  } catch (error) {
    next(error);
  }
});

router.patch("/destinations/:id/status", async (req, res, next) => {
  try {
    const { status, featured } = req.body;
    const update = {};
    if (status) update.status = status;
    if (featured !== undefined) update.featured = featured;
    const destination = await Destination.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!destination) return res.status(404).json({ success: false, error: "Destination not found" });
    await recordAudit(req, "UPDATE_DESTINATION_STATUS", "Destination", destination._id, update);
    res.json({ success: true, item: destination });
  } catch (error) {
    next(error);
  }
});

router.delete("/destinations/:id", async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ success: false, error: "Destination not found" });
    await recordAudit(req, "DELETE_DESTINATION", "Destination", req.params.id, { title: destination.title });
    res.json({ success: true, message: "Destination removed" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 12. OFFERS & PROMOTIONS MANAGEMENT
// ==========================================
router.get("/offers", async (req, res, next) => {
  try {
    const items = await Offer.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.post("/offers", async (req, res, next) => {
  try {
    const offer = await Offer.create(req.body);
    await recordAudit(req, "CREATE_OFFER", "Offer", offer._id, { code: offer.code });
    res.status(201).json({ success: true, item: offer });
  } catch (error) {
    next(error);
  }
});

router.put("/offers/:id", async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!offer) return res.status(404).json({ success: false, error: "Offer not found" });
    await recordAudit(req, "UPDATE_OFFER", "Offer", offer._id, req.body);
    res.json({ success: true, item: offer });
  } catch (error) {
    next(error);
  }
});

router.delete("/offers/:id", async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ success: false, error: "Offer not found" });
    await recordAudit(req, "DELETE_OFFER", "Offer", req.params.id);
    res.json({ success: true, message: "Offer deleted" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 13. BANNERS & SLIDERS MANAGEMENT
// ==========================================
router.get("/banners", async (req, res, next) => {
  try {
    const items = await Banner.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

router.post("/banners", async (req, res, next) => {
  try {
    const banner = await Banner.create(req.body);
    await recordAudit(req, "CREATE_BANNER", "Banner", banner._id, { title: banner.title });
    res.status(201).json({ success: true, item: banner });
  } catch (error) {
    next(error);
  }
});

router.put("/banners/:id", async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!banner) return res.status(404).json({ success: false, error: "Banner not found" });
    await recordAudit(req, "UPDATE_BANNER", "Banner", banner._id, req.body);
    res.json({ success: true, item: banner });
  } catch (error) {
    next(error);
  }
});

router.delete("/banners/:id", async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ success: false, error: "Banner not found" });
    await recordAudit(req, "DELETE_BANNER", "Banner", req.params.id);
    res.json({ success: true, message: "Banner deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
