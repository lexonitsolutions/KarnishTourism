const mongoose = require("mongoose");
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, type: { type: String, required: true }, title: { type: String, required: true }, message: { type: String, required: true }, data: mongoose.Schema.Types.Mixed, readAt: Date }, { timestamps: true });
schema.index({ user: 1, readAt: 1, createdAt: -1 }); module.exports = mongoose.model("Notification", schema);
