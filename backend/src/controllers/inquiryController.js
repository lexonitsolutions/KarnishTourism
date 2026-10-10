const Inquiry = require("../models/Inquiry");
const Destination = require("../models/Destination");
const TourPackage = require("../models/TourPackage");
const { slugify } = require("../utils/query");
const { sendInquiryNotification, sendCollaborationNotification } = require("../services/emailService");

const escapeRegex = (str) => String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

exports.create = async (req, res, next) => {
  try {
    const rawDest = req.body.destinationId || req.body.destination;
    const rawPkg = req.body.packageId || req.body.package;
    let destination = undefined;
    let tourPkg = undefined;

    if (rawDest) {
      const destStr = String(rawDest).trim();
      if (/^[a-f\d]{24}$/i.test(destStr)) {
        const found = await Destination.findById(destStr).select("_id").lean();
        if (found) destination = found._id;
      }
      if (!destination) {
        const found = await Destination.findOne({
          $or: [
            { slug: slugify(destStr) },
            { slug: destStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(destStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) destination = found._id;
      }
    }

    if (rawPkg) {
      const pkgStr = String(rawPkg).trim();
      if (/^[a-f\d]{24}$/i.test(pkgStr)) {
        const found = await TourPackage.findById(pkgStr).select("_id").lean();
        if (found) tourPkg = found._id;
      }
      if (!tourPkg) {
        const found = await TourPackage.findOne({
          $or: [
            { slug: slugify(pkgStr) },
            { slug: pkgStr.toLowerCase() },
            { title: new RegExp(`^${escapeRegex(pkgStr)}$`, "i") }
          ]
        }).select("_id").lean();
        if (found) tourPkg = found._id;
      }
    }

    const payload = { ...req.body };
    if (destination) payload.destination = destination; else delete payload.destination;
    if (tourPkg) payload.package = tourPkg; else delete payload.package;
    if (req.user?.id) payload.user = req.user.id;

    const item = await Inquiry.create(payload);

    // Dispatch SMTP email notification
    sendInquiryNotification({
      name: item.name,
      email: item.email,
      phone: item.phone,
      service: req.body.service,
      message: item.message,
      destinationName: req.body.destinationTitle || req.body.destination,
      packageName: req.body.packageTitle || req.body.package,
    }).catch((err) => {
      console.error("[Email Notification Failed]:", err.message);
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.createCollaboration = async (req, res, next) => {
  try {
    const {
      companyName,
      contactPerson,
      businessType,
      email,
      phone,
      city,
      country,
      gstNumber,
      volume,
      servicesOffered,
      collaborationTypes,
      requirements,
      id: clientRequestId,
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Company name, contact person, email, and phone are required.",
      });
    }

    const requestId =
      clientRequestId || `COL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const servicesList = Array.isArray(servicesOffered) ? servicesOffered : [];
    const collabList = Array.isArray(collaborationTypes) ? collaborationTypes : [];

    const summaryMessage = [
      `Business Collaboration Request from: ${companyName}`,
      `Contact Person: ${contactPerson}`,
      `Business Type: ${businessType || "N/A"}`,
      `Tax / GST ID: ${gstNumber || "N/A"}`,
      `Location: ${city || "N/A"}, ${country || "N/A"}`,
      `Estimated Monthly Volume: ${volume ? `${volume} bookings/month` : "N/A"}`,
      `Services Offered: ${servicesList.join(", ") || "None specified"}`,
      `Collaboration Modes: ${collabList.join(", ") || "None specified"}`,
      ``,
      `Additional Requirements:`,
      requirements || "(None provided)",
    ].join("\n");

    const payload = {
      name: contactPerson,
      companyName,
      email: String(email).toLowerCase().trim(),
      phone: String(phone).trim(),
      service: `Business Collaboration: ${businessType || "Partnership"}`,
      businessType,
      gstNumber,
      city,
      country,
      servicesOffered: servicesList,
      volume,
      collaborationTypes: collabList,
      requirements,
      message: summaryMessage,
      isCollaboration: true,
      requestId,
      status: "new",
      ...(req.user?.id ? { user: req.user.id } : {}),
    };

    const item = await Inquiry.create(payload);

    // Send email notification via Brevo HTTP API
    sendCollaborationNotification({
      ...payload,
      contactPerson,
      companyName,
    }).catch((err) => {
      console.error("[Brevo Collaboration Email Failed]:", err.message);
    });

    res.status(201).json({ success: true, item, requestId });
  } catch (error) {
    next(error);
  }
};
