const Category = require("../Model/Category");
const Product = require("../Model/ProductModel");
const Subcategory = require("../Model/SubcategoryModel");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

const createSubcategory = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    if (!category || !subcategory) {
      return res.status(400).json({ success: false, msg: "Please fill all fields" });
    }

    const isCategoryExists = await Category.findById(category);
    if (!isCategoryExists) {
      return res.status(404).json({ success: false, msg: "Category not found" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    const saveData = new Subcategory({
      category,
      subcategory,
      subcategoryImage: imageUrl,
    });

    const data = await saveData.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const updateSubcategory = async (req, res) => {
  try {
    const data = await Subcategory.findById(req.params._id);
    if (!data) {
      return res.status(404).json({ success: false, error: "Subcategory not found" });
    }

    if (req.body.category) data.category = req.body.category;
    if (req.body.subcategory) data.subcategory = req.body.subcategory;

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      data.subcategoryImage = imageUrl;
    }

    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const getSubcategories = async (req, res) => {
  try {
    const data = await Subcategory.find().populate("category");
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const getSingleSubcategory = async (req, res) => {
  try {
    const data = await Subcategory.findById(req.params._id).populate("category");
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const isSubCategoryExists =await Product.exists({ subcategory: req.params._id });
    if (isSubCategoryExists) {
      return res.status(400).json({
        success: false,
        msg: "Subcategory cannot be deleted as it is associated with products",
      });    
    }
   
    const data = await Subcategory.findById(req.params._id);
    if (!data) {
      return res.status(404).json({ success: false, msg: "Subcategory not found" });
    }
    await data.deleteOne();
    res.status(200).json({ success: true, msg: "Subcategory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategories = await Subcategory.find({ category: id }).populate("category");
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ success: false, msg: "No subcategories found for this category" });
    }
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = {
  createSubcategory,
  updateSubcategory,
  getSubcategories,
  deleteSubcategory,
  getSingleSubcategory,
  getSubcategoriesByCategory
};
