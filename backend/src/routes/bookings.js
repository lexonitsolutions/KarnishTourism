const express = require("express");
const { authenticate } = require("../middleware/auth");
const { requireFields, validateObjectId } = require("../middleware/validate");
const controller = require("../controllers/bookingController");
const router = express.Router(); router.use(authenticate);
router.get("/", controller.listMine); router.get("/:id", validateObjectId(), controller.getMine); router.post("/", requireFields("packageId", "travelDate", "numberOfTravelers", "adultCount", "contactInformation"), controller.create);
module.exports = router;
