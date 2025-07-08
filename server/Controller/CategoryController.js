const Category = require("../Model/Category");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");
const SubCategory = require("../Model/SubcategoryModel");

const createCategory = async (req, res) => {
  try {
    const { category } = req.body || {};
    if (!category) {
      return res
        .status(400)
        .json({ success: false, error: "Category name is required" });
    }
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    const data = new Category({
      category,
      categoryImage: imageUrl,
    });

    await data.save();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params._id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    if (req.body.category) data.category = req.body.category;

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      data.categoryImage = imageUrl;
    }

    await data.save();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const deleteCategory = async (req, res) => {
  try {
  const isCategoryExists = await SubCategory.exists({category: req.params._id})
    if (isCategoryExists) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete category with existing subcategories",
      });
    }
   const category = await Category.findByIdAndDelete(req.params._id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategories,
  getSingleCategory,
  deleteCategory,
};
