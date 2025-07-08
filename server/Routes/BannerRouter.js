const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const bannerController = require("../Controller/bannerController");

router.post("/", upload.single("bannerImage"), bannerController.createBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getSingleBanner);
router.put("/:id", upload.single("bannerImage"), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
