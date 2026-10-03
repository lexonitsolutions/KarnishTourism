const express = require("express");
const { optionalAuthenticate } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const controller = require("../controllers/inquiryController");
const router = express.Router(); router.post("/", optionalAuthenticate, requireFields("name", "email", "phone"), controller.create); module.exports = router;
