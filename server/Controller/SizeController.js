const Product = require("../Model/ProductModel");
const Size = require("../Model/SizeModel");

const createSize = async (req, res) => {
  try {
    const { sizename } = req.body || {};

    if (!sizename || !sizename.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Size name is required" });
    }

    const newSize = new Size({ sizename: sizename.trim() });
    const data = await newSize.save();

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error("Create Size Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSizes = async (req, res) => {
  try {
    const data = await Size.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Get Sizes Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSingleSize = async (req, res) => {
  try {
    const data = await Size.findById(req.params._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Size not found" });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Get Single Size Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateSize = async (req, res) => {
  try {
    const data = await Size.findById(req.params._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Size not found" });

    if (req.body.sizename) data.sizename = req.body.sizename.trim();

    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Update Size Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteSize = async (req, res) => {
  try {
    const isSizeExists = await Product.exists({ sizename: req.params._id });
    if (isSizeExists) {
      return res.status(400).json({
        success: false,
        message: "Size cannot be deleted as it is associated with products",
      });
    }
    const data = await Size.findByIdAndDelete(req.params._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Size not found" });

    res.status(200).json({ success: true, message: "Size deleted" });
  } catch (error) {
    console.error("Delete Size Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createSize,
  getSizes,
  getSingleSize,
  updateSize,
  deleteSize,
};
