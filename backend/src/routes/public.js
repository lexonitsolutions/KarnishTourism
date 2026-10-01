const express = require("express");
const { all, get } = require("../config/database");
const { RESOURCE_TYPES } = require("../permissions/roles");

const router = express.Router();
const publicResources = new Set(["packages", "destinations", "activities", "visas", "hotels", "offers", "gallery", "blogs", "testimonials", "seo", "settings"]);
const parse = (row) => ({ ...JSON.parse(row.data || "{}"), id: row.id, title: row.title, status: row.status, updatedAt: row.updated_at });

router.get("/:resource", async (req, res, next) => {
  try {
    if (!RESOURCE_TYPES.includes(req.params.resource) || !publicResources.has(req.params.resource)) return res.status(404).json({ error: "Unknown public resource" });
    const rows = await all("SELECT * FROM resources WHERE resource_type = ? AND status IN ('Active','Published') ORDER BY updated_at DESC", [req.params.resource]);
    res.json({ items: rows.map(parse) });
  } catch (error) { next(error); }
});
router.get("/:resource/:id", async (req, res, next) => {
  try {
    if (!publicResources.has(req.params.resource)) return res.status(404).json({ error: "Unknown public resource" });
    const row = await get("SELECT * FROM resources WHERE resource_type = ? AND id = ? AND status IN ('Active','Published')", [req.params.resource, req.params.id]);
    if (!row) return res.status(404).json({ error: "Record not found" });
    res.json({ item: parse(row) });
  } catch (error) { next(error); }
});
module.exports = router;
