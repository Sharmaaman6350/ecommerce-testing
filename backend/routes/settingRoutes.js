const express = require("express");
const router = express.Router();
const {getData,postData} = require("../controllers/admin/setting");

router.get("/getSettingData", getData);
router.post("/postSettingData", postData);

module.exports = router;