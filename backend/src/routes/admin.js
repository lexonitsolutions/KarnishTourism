const express = require("express");
const { authenticate, allowRoles } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validate");
const { models } = require("../services/modelRegistry");
const controller = require("../controllers/resourceController");
const Booking = require("../models/Booking"), Inquiry = require("../models/Inquiry"), User = require("../models/User"), TourPackage = require("../models/TourPackage");
const router = express.Router(); router.use(authenticate, allowRoles("admin", "super_admin"));
router.get("/dashboard", async (_req, res, next) => {
  try {
    const [totalBookings, pendingBookings, totalCustomers, activePackages, pendingInquiries, revenue, recentBookings] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ bookingStatus: "pending" }),
      User.countDocuments({ role: "customer" }),
      TourPackage.countDocuments({ status: "active" }),
      Inquiry.countDocuments({ status: { $in: ["new", "contacted", "in_progress"] } }),
      Booking.aggregate([{ $match: { paymentStatus: "paid" } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Booking.find().sort({ createdAt: -1 }).limit(10).populate("package", "title destination").populate("user", "name email").lean()
    ]);
    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        totalCustomers,
        activePackages,
        pendingInquiries,
        totalRevenue: revenue[0]?.total || 0
      },
      bookings: (recentBookings || []).map(b => ({
        id: b.bookingId || String(b._id).slice(-6).toUpperCase(),
        customer: b.contactInformation?.name || b.user?.name || "Guest",
        customerEmail: b.contactInformation?.email || b.user?.email || "",
        item: b.package?.title || "Tour Package",
        destination: b.package?.destination || "Oman",
        amount: b.totalAmount || 0,
        status: b.bookingStatus || "pending",
        paymentStatus: b.paymentStatus || "pending",
        createdAt: b.createdAt
      }))
    });
  } catch (error) { next(error); }
});
router.get("/profiles", (req, res, next) => controller.list(User)(req, res, next));
router.patch("/profiles/:id/role", validateObjectId(), async (req, res, next) => { try { if (req.user.role !== "super_admin") return res.status(403).json({ success: false, error: "Only a Super Admin can assign privileged roles" }); const allowed = ["customer", "admin", "collaborator"]; if (!allowed.includes(req.body.role)) return res.status(400).json({ success: false, error: "Invalid assignable role" }); const item = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true, runValidators: true }); if (!item) return res.status(404).json({ success: false, error: "Profile not found" }); res.json({ success: true, user: item }); } catch (error) { next(error); } });
const withModel = (handler) => (req, res, next) => { const Model = models[req.params.resource]; if (!Model) return res.status(404).json({ success: false, error: "Unknown resource" }); return handler(Model)(req, res, next); };
router.get("/resources/:resource", withModel(controller.list)); router.post("/resources/:resource", withModel(controller.create)); router.put("/resources/:resource/:id", validateObjectId(), withModel(controller.update)); router.delete("/resources/:resource/:id", validateObjectId(), withModel(controller.remove));
module.exports = router;
