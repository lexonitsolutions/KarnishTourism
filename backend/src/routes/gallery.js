const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { authenticate, allowRoles } = require("../middleware/auth");
const AuditLog = require("../models/AuditLog");
const GalleryMedia = require("../models/GalleryMedia");
const GalleryAchievement = require("../models/GalleryAchievement");
const GalleryMemory = require("../models/GalleryMemory");
const GalleryMilestone = require("../models/GalleryMilestone");
const GallerySettings = require("../models/GallerySettings");

const router = express.Router();
const adminRouter = express.Router();
const resources = { media: GalleryMedia, achievements: GalleryAchievement, memories: GalleryMemory, milestones: GalleryMilestone };
const uploadsDir = path.resolve(__dirname, "../../uploads/gallery");
const allowedTypes = new Map([["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"], ["image/gif", ".gif"], ["video/mp4", ".mp4"], ["video/webm", ".webm"]]);

function publicFilter(req) {
  const filter = { status: "published" };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === "true") filter.featured = true;
  if (req.query.featureOnHome === "true") filter.featureOnHome = true;
  if (req.query.featureOnAbout === "true") filter.featureOnAbout = true;
  return filter;
}

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 60, 1), 100);
    const [media, achievements, memories, milestones, settings] = await Promise.all([
      GalleryMedia.find(publicFilter(req)).sort({ displayOrder: 1, createdAt: -1 }).limit(limit).lean(),
      GalleryAchievement.find({ status: "published" }).sort({ displayOrder: 1, year: -1 }).limit(limit).lean(),
      GalleryMemory.find({ status: "published" }).sort({ displayOrder: 1, travelDate: -1 }).limit(limit).lean(),
      GalleryMilestone.find({ status: "published" }).sort({ displayOrder: 1, milestoneDate: 1 }).limit(limit).lean(),
      GallerySettings.findOne({ key: "primary" }).lean(),
    ]);
    res.set("Cache-Control", "public, max-age=15, stale-while-revalidate=30");
    res.json({ success: true, media, achievements, memories, milestones, settings });
  } catch (error) { next(error); }
});

adminRouter.use(authenticate, allowRoles("admin", "super_admin"));
adminRouter.get("/", async (_req, res, next) => {
  try {
    const [media, achievements, memories, milestones, settings] = await Promise.all([
      GalleryMedia.find().sort({ displayOrder: 1, createdAt: -1 }).lean(), GalleryAchievement.find().sort({ displayOrder: 1, createdAt: -1 }).lean(),
      GalleryMemory.find().sort({ displayOrder: 1, createdAt: -1 }).lean(), GalleryMilestone.find().sort({ displayOrder: 1, milestoneDate: 1 }).lean(), GallerySettings.findOne({ key: "primary" }).lean(),
    ]);
    res.json({ success: true, media, achievements, memories, milestones, settings });
  } catch (error) { next(error); }
});

adminRouter.put("/settings", async (req, res, next) => {
  try {
    const item = await GallerySettings.findOneAndUpdate({ key: "primary" }, { $set: { ...req.body, key: "primary", updatedBy: req.user.id } }, { new: true, upsert: true, runValidators: true });
    res.json({ success: true, item });
  } catch (error) { next(error); }
});

adminRouter.post("/upload", express.raw({ type: [...allowedTypes.keys()], limit: "50mb" }), async (req, res, next) => {
  try {
    const extension = allowedTypes.get(req.headers["content-type"]);
    if (!extension || !Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ success: false, error: "Unsupported or empty media file" });
    const max = req.headers["content-type"].startsWith("video/") ? 50 * 1024 * 1024 : 12 * 1024 * 1024;
    if (req.body.length > max) return res.status(413).json({ success: false, error: `File exceeds the ${max / 1024 / 1024}MB limit` });
    await fs.mkdir(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
    await fs.writeFile(path.join(uploadsDir, fileName), req.body, { flag: "wx" });
    res.status(201).json({ success: true, url: `/uploads/gallery/${fileName}` });
  } catch (error) { next(error); }
});

for (const [name, Model] of Object.entries(resources)) {
  adminRouter.post(`/${name}`, async (req, res, next) => { try { const item = await Model.create({ ...req.body, createdBy: req.user.id, updatedBy: req.user.id }); await AuditLog.create({ actor: req.user.id, actorRole: req.user.role, actorName: req.user.name, actorEmail: req.user.email, action: `CREATE_GALLERY_${name.toUpperCase()}`, resource: Model.modelName, resourceId: String(item._id), details: { title: item.title } }).catch(() => {}); res.status(201).json({ success: true, item }); } catch (error) { next(error); } });
  adminRouter.put(`/${name}/:id`, async (req, res, next) => { try { const item = await Model.findByIdAndUpdate(req.params.id, { $set: { ...req.body, updatedBy: req.user.id } }, { new: true, runValidators: true }); if (!item) return res.status(404).json({ success: false, error: "Gallery item not found" }); res.json({ success: true, item }); } catch (error) { next(error); } });
  adminRouter.delete(`/${name}/:id`, async (req, res, next) => { try { const item = await Model.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ success: false, error: "Gallery item not found" }); res.json({ success: true }); } catch (error) { next(error); } });
}

module.exports = { galleryRouter: router, galleryAdminRouter: adminRouter, uploadsDir };
