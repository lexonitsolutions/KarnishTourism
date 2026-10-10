const express = require("express");
const { models, publicResources } = require("../services/modelRegistry");
const controller = require("../controllers/resourceController");
const router = express.Router();
for (const resource of publicResources) { const Model = models[resource]; router.get(`/${resource}`, controller.list(Model, { isPublic: true, resource })); router.get(`/${resource}/:id`, controller.getOne(Model, { isPublic: true, resource })); }
module.exports = router;
