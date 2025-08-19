const mongoose = require("mongoose");

const AdminSettingSchema = new mongoose.Schema({
  siteName: { type: String, default: "My Store" },
  adminEmail: { type: String, default: "" },
  supportPhone: { type: String, default: "" },
  currency: { type: String, default: "INR" },
  maintenanceMode: { type: Boolean, default: false },
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  themeColor: { type: String, default: "#6366f1" },
  smtp: {
    host: { type: String, default: "" },
    port: { type: String, default: "" },
    user: { type: String, default: "" },
    pass: { type: String, default: "" },
  },
  socialLinks: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
  features: {
    wishlist: { type: Boolean, default: true },
    reviews: { type: Boolean, default: true },
  },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  logo: { type: String, default: null },
  favicon: { type: String, default: null },
});

module.exports = mongoose.model("AdminSetting", AdminSettingSchema);
