const express = require("express");
const { models, publicResources } = require("../services/modelRegistry");
const { authenticate, allowRoles } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validate");
const controller = require("../controllers/resourceController");
const router = express.Router();
for (const resource of publicResources) { const Model = models[resource]; router.get(`/${resource}`, controller.list(Model, { isPublic: true, resource })); router.get(`/${resource}/:id`, controller.getOne(Model, { isPublic: true, resource })); router.post(`/${resource}`, authenticate, allowRoles("admin", "super_admin"), controller.create(Model)); router.put(`/${resource}/:id`, authenticate, allowRoles("admin", "super_admin"), validateObjectId(), controller.update(Model)); router.delete(`/${resource}/:id`, authenticate, allowRoles("admin", "super_admin"), validateObjectId(), controller.remove(Model)); }
module.exports = router;
