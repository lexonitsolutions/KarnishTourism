const express = require("express");
const { authenticate, allowRoles } = require("../middleware/auth");
const { pagination } = require("../utils/query");
const TourPackage = require("../models/TourPackage"), Activity = require("../models/Activity"), Hotel = require("../models/Hotel"), Booking = require("../models/Booking"), Inquiry = require("../models/Inquiry");
const router = express.Router(); router.use(authenticate, allowRoles("collaborator", "b2b"));
const scopedList = (Model) => async (req, res, next) => { try { const { page, limit, skip } = pagination(req.query); const filter = { collaborator: req.user.id }; const [items, total] = await Promise.all([Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), Model.countDocuments(filter)]); res.json({ success: true, items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }); } catch (error) { next(error); } };
router.get("/dashboard", async (req, res, next) => { try { const filter = { collaborator: req.user.id }; const [products, bookings, inquiries] = await Promise.all([TourPackage.countDocuments(filter), Booking.countDocuments(filter), Inquiry.countDocuments(filter)]); res.json({ success: true, stats: { products, bookings, inquiries } }); } catch (error) { next(error); } });
router.get("/tours", scopedList(TourPackage)); router.get("/activities", scopedList(Activity)); router.get("/hotels", scopedList(Hotel)); router.get("/bookings", scopedList(Booking)); router.get("/inquiries", scopedList(Inquiry));
module.exports = router;
