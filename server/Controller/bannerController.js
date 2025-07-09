const Banner = require("../model/bannerModel");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const imageUrl = await uploadOnCloudinary(req.file.path);

    if (!imageUrl) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const banner = await Banner.create({
      bannerImage: imageUrl,
      isActive: req.body?.isActive === "true" ?? false,
    });

    res.status(201).json({ message: "Banner created", data: banner });
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ message: "All banners", data: banners });
  } catch (error) {
    console.error("Get all banners error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getSingleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner found", data: banner });
  } catch (error) {
    console.error("Get single banner error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    let imageUrl = banner.bannerImage;
    if (req.file) {
      const newUrl = await uploadOnCloudinary(req.file.path);
      if (!newUrl) {
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }
      imageUrl = newUrl;
    }

    banner.bannerImage = imageUrl;
    if (req.body.isActive) {
      banner.isActive = req.body.isActive === "true";
    }

    const updated = await banner.save();
    res.status(200).json({ message: "Banner updated", data: updated });
  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
