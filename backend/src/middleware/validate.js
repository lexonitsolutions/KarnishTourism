const objectId = /^[a-f\d]{24}$/i;
const requireFields = (...fields) => (req, res, next) => { const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === ""); return missing.length ? res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(", ")}` }) : next(); };
const validateObjectId = (param = "id") => (req, res, next) => objectId.test(req.params[param]) ? next() : res.status(400).json({ success: false, error: `Invalid ${param}` });
module.exports = { requireFields, validateObjectId };
