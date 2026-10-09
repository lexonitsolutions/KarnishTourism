const express = require("express");
const { randomUUID } = require("crypto");
const { authenticate, allowRoles } = require("../middleware/auth");
const { pagination } = require("../utils/query");
const TourPackage = require("../models/TourPackage");
const Booking = require("../models/Booking");
const Commission = require("../models/Commission");
const Organization = require("../models/Organization");
const User = require("../models/User");

const router = express.Router();

// Enforce strict Collaborator/B2B authentication
router.use(authenticate, allowRoles("collaborator", "b2b"));

// Helper: Get collaborator's organization and profile
async function getCollaboratorContext(userId) {
  const user = await User.findById(userId).populate("organization").lean();
  const org = user?.organization || null;
  const commissionRate = org?.commissionRate || user?.collaboratorProfile?.commissionRate || 10;
  const tier = org?.tier || user?.collaboratorProfile?.tier || "standard";
  return { user, org, commissionRate, tier };
}

// ==========================================
// 1. COLLABORATOR OVERVIEW & DASHBOARD STATS
// ==========================================
router.get("/dashboard", async (req, res, next) => {
  try {
    const { user, org, commissionRate, tier } = await getCollaboratorContext(req.user.id);
    const orgId = org?._id;

    // Filter strictly to this collaborator or their organization
    const bookingFilter = orgId
      ? { $or: [{ collaborator: req.user.id }, { organization: orgId }] }
      : { collaborator: req.user.id };

    const [bookings, commissions, totalPackages] = await Promise.all([
      Booking.find(bookingFilter).lean(),
      Commission.find(bookingFilter).lean(),
      TourPackage.countDocuments({ status: "active", available: true }),
    ]);

    const totalBookingsCount = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.bookingStatus === "confirmed" || b.paymentStatus === "paid");
    const totalClientVolume = confirmedBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

    const earnedCommission = commissions
      .filter((c) => c.status === "approved" || c.status === "paid")
      .reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

    const pendingCommission = commissions
      .filter((c) => c.status === "pending")
      .reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

    res.json({
      success: true,
      partner: {
        id: req.user.id,
        name: user?.name,
        companyName: org?.name || user?.collaboratorProfile?.companyName || "Partner Agency",
        tier,
        commissionRate,
        approvalStatus: user?.collaboratorProfile?.approvalStatus || "approved",
      },
      stats: {
        totalBookings: totalBookingsCount,
        confirmedBookings: confirmedBookings.length,
        totalClientVolume,
        earnedCommission,
        pendingCommission,
        availablePackages: totalPackages,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 2. PARTNER PROFILE & ORGANIZATION DATA
// ==========================================
router.get("/profile", async (req, res, next) => {
  try {
    const { user, org, commissionRate, tier } = await getCollaboratorContext(req.user.id);
    res.json({
      success: true,
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.collaboratorProfile?.companyName || org?.name,
        taxId: user.collaboratorProfile?.taxId || org?.taxId,
        approvalStatus: user.collaboratorProfile?.approvalStatus || "approved",
        tier,
        commissionRate,
      },
      organization: org,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/profile", async (req, res, next) => {
  try {
    const { companyName, taxId, phone } = req.body;
    const update = {};
    if (phone) update.phone = phone;
    if (companyName) update["collaboratorProfile.companyName"] = companyName;
    if (taxId) update["collaboratorProfile.taxId"] = taxId;

    const updated = await User.findByIdAndUpdate(req.user.id, { $set: update }, { new: true });
    res.json({ success: true, user: updated });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. PARTNER-SPECIFIC PACKAGE PRICING & INVENTORY
// ==========================================
router.get("/packages", async (req, res, next) => {
  try {
    const { commissionRate, tier } = await getCollaboratorContext(req.user.id);
    const { page, limit, skip } = pagination(req.query);

    const filter = { status: "active", available: true };
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(String(req.query.search).trim(), "i") },
        { summary: new RegExp(String(req.query.search).trim(), "i") },
      ];
    }

    const [packages, total] = await Promise.all([
      TourPackage.find(filter)
        .populate("destination", "title country slug")
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TourPackage.countDocuments(filter),
    ]);

    // Calculate Partner B2B Net Rate and Commission Margin
    const partnerPackages = packages.map((pkg) => {
      const publicPrice = Number(pkg.price) || 0;
      // Check if custom tier pricing is specified on package
      const tierConfig = pkg.b2bPricing?.find((p) => p.tier === tier);
      const discount = tierConfig?.discountPercentage || commissionRate || 10;
      const b2bNetRate = tierConfig?.netPrice || Math.round(publicPrice * (1 - discount / 100));
      const marginEarned = publicPrice - b2bNetRate;

      return {
        ...pkg,
        publicPrice,
        b2bNetRate,
        marginEarned,
        commissionPercent: discount,
      };
    });

    res.json({
      success: true,
      items: partnerPackages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 4. CLIENT BOOKINGS MANAGEMENT (Strictly scoped)
// ==========================================
router.get("/bookings", async (req, res, next) => {
  try {
    const { org } = await getCollaboratorContext(req.user.id);
    const { page, limit, skip } = pagination(req.query);

    const filter = org?._id
      ? { $or: [{ collaborator: req.user.id }, { organization: org._id }] }
      : { collaborator: req.user.id };

    if (req.query.status) filter.bookingStatus = req.query.status;

    const [items, total] = await Promise.all([
      Booking.find(filter)
        .populate("package", "title price imageUrl slug durationDays")
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

router.post("/bookings", async (req, res, next) => {
  try {
    const { user, org, commissionRate } = await getCollaboratorContext(req.user.id);
    const { packageId, travelDate, adultCount, childCount = 0, clientDetails, specialRequests } = req.body;

    const pkg = await TourPackage.findOne({ _id: packageId, status: "active", available: true });
    if (!pkg) return res.status(404).json({ success: false, error: "Tour package not found or unavailable" });

    const adults = Number(adultCount) || 1;
    const children = Number(childCount) || 0;
    const totalTravelers = adults + children;
    const totalAmount = pkg.price * totalTravelers;
    const commissionAmount = Math.round((totalAmount * commissionRate) / 100);

    const bookingId = `KT-B2B-${Date.now().toString().slice(-6)}-${randomUUID().slice(0, 4).toUpperCase()}`;
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const booking = await Booking.create({
      bookingId,
      user: req.user.id,
      collaborator: req.user.id,
      organization: org?._id,
      package: pkg._id,
      travelDate,
      numberOfTravelers: totalTravelers,
      adultCount: adults,
      childCount: children,
      contactInformation: {
        name: clientDetails?.name || "Client Guest",
        email: clientDetails?.email || user.email,
        phone: clientDetails?.phone || user.phone || "0000000000",
      },
      clientDetails,
      totalAmount,
      currency: pkg.currency || "INR",
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      specialRequests,
      commissionAmount,
      commissionRate,
      commissionStatus: "approved",
      invoiceNumber,
    });

    // Create corresponding Commission record
    await Commission.create({
      collaborator: req.user.id,
      organization: org?._id,
      booking: booking._id,
      bookingAmount: totalAmount,
      commissionRate,
      amount: commissionAmount,
      currency: pkg.currency || "INR",
      status: "approved",
      invoiceNumber,
    });

    res.status(201).json({ success: true, item: booking });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 5. COMMISSION & EARNINGS TRACKING
// ==========================================
router.get("/commissions", async (req, res, next) => {
  try {
    const { org } = await getCollaboratorContext(req.user.id);
    const filter = org?._id
      ? { $or: [{ collaborator: req.user.id }, { organization: org._id }] }
      : { collaborator: req.user.id };

    const items = await Commission.find(filter)
      .populate("booking", "bookingId totalAmount travelDate")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 6. INVOICES & STATEMENTS MANAGEMENT
// ==========================================
router.get("/invoices", async (req, res, next) => {
  try {
    const { org } = await getCollaboratorContext(req.user.id);
    const filter = org?._id
      ? { $or: [{ collaborator: req.user.id }, { organization: org._id }], invoiceNumber: { $exists: true } }
      : { collaborator: req.user.id, invoiceNumber: { $exists: true } };

    const bookingsWithInvoices = await Booking.find(filter)
      .populate("package", "title price")
      .select("bookingId invoiceNumber totalAmount commissionAmount travelDate createdAt paymentStatus clientDetails")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, items: bookingsWithInvoices });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
