const express = require("express");
const { models, publicResources } = require("../services/modelRegistry");
const controller = require("../controllers/resourceController");
const router = express.Router();
router.get("/:resource", (req, res, next) => { const Model = models[req.params.resource]; if (!Model || !publicResources.has(req.params.resource)) return res.status(404).json({ success: false, error: "Unknown public resource" }); return controller.list(Model, { isPublic: true, resource: req.params.resource })(req, res, next); });
router.get("/:resource/:id", (req, res, next) => { const Model = models[req.params.resource]; if (!Model || !publicResources.has(req.params.resource)) return res.status(404).json({ success: false, error: "Unknown public resource" }); return controller.getOne(Model, { isPublic: true, resource: req.params.resource })(req, res, next); });
module.exports = router;
