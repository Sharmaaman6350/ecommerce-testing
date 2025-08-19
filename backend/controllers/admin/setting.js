const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Settings = require("../../models/adminSetting");

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage });

// GET settings
const getData = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

// POST / PUT settings
const postData = [
  upload.fields([{ name: "logo" }, { name: "favicon" }]),
  async (req, res) => {
    try {
      let data = req.body;

      if (req.files.logo) data.logo = req.files.logo[0].filename;
      if (req.files.favicon) data.favicon = req.files.favicon[0].filename;

      if (data.maintenanceMode !== undefined) data.maintenanceMode = data.maintenanceMode === "true";
      if (data.features) data.features = JSON.parse(data.features);
      if (data.notifications) data.notifications = JSON.parse(data.notifications);
      if (data.smtp) data.smtp = JSON.parse(data.smtp);
      if (data.socialLinks) data.socialLinks = JSON.parse(data.socialLinks);

      let settings = await Settings.findOne({});
      if (settings) {
        Object.assign(settings, data);
        await settings.save();
      } else {
        settings = await Settings.create(data);
      }

      res.json({ success: true, settings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save settings" });
    }
  },
];

module.exports = { getData, postData };
