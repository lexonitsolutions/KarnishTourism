function pagination(query) { const page = Math.max(1, Number.parseInt(query.page, 10) || 1); const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 12)); return { page, limit, skip: (page - 1) * limit }; }
function slugify(value) { return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
module.exports = { pagination, slugify };
