const Product = require("../Model/ProductModel");
const Category = require("../Model/Category");
const Subcategory = require("../Model/SubcategoryModel");
const Size = require("../Model/SizeModel");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      color,
      sizename,
      stock,
      description,
    } = req.body || {};
    const price = req.body.price ? Number(req.body.price) : undefined;
    const discount = req.body.discount ? Number(req.body.discount) : undefined;
    const isLatest = req.body.isLatest === "true";
    if (
      !name ||
      !brand ||
      !category ||
      !subcategory ||
      !color ||
      !sizename ||
      !stock ||
      !description ||
      price === undefined ||
      discount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const [catExists, subExists, sizeExists] = await Promise.all([
      Category.findById(category),
      Subcategory.findById(subcategory),
      Size.findById(sizename),
    ]);
    if (!catExists || !subExists || !sizeExists) {
      return res.status(404).json({
        success: false,
        message: "Invalid Category, Subcategory, or Size.",
      });
    }

    const files = req.files;
    if (!files.pic1) {
      return res
        .status(400)
        .json({ success: false, message: "pic1 is required" });
    }

    const uploadImage = async (file) =>
      file ? await uploadOnCloudinary(file[0].path) : "";

    const [pic1, pic2, pic3, pic4] = await Promise.all([
      uploadImage(files?.pic1),
      uploadImage(files?.pic2),
      uploadImage(files?.pic3),
      uploadImage(files?.pic4),
    ]);
    const finalPrice = price - (price * discount) / 100;
    const newProduct = new Product({
      name,
      brand,
      category,
      subcategory,
      color,
      sizename,
      stock: Number(stock),
      description,
      pic1,
      pic2,
      pic3,
      pic4,
      price,
      finalPrice,
      discount,
      isLatest,
    });
    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const {
      name,
      brand,
      category,
      subcategory,
      color,
      sizename,
      stock,
      description,
    } = req.body || {};
    const files = req.files;
    const price = req.body.price ? Number(req.body.price) : undefined;
    const discount = req.body.discount ? Number(req.body.discount) : undefined;
    const isLatest =
      typeof req.body.isLatest !== "undefined"
        ? String(req.body.isLatest) === "true"
        : undefined;

    const uploadImage = async (file) =>
      file ? await uploadOnCloudinary(file[0].path) : "";

    if (files?.pic1) product.pic1 = await uploadImage(files.pic1);
    if (files?.pic2) product.pic2 = await uploadImage(files.pic2);
    if (files?.pic3) product.pic3 = await uploadImage(files.pic3);
    if (files?.pic4) product.pic4 = await uploadImage(files.pic4);

    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (subcategory) product.subcategory = subcategory;
    if (color) product.color = color;
    if (sizename) product.sizename = sizename;
    if (stock) product.stock = Number(stock);
    if (description !== undefined) product.description = description;
    if (price || discount) {
      if (price !== undefined) product.price = price;
      if (discount !== undefined) product.discount = discount;
      const updatedPrice = price || product.price;
      const updatedDiscount = discount || product.discount;
      product.finalPrice =
        updatedPrice - (updatedPrice * updatedDiscount) / 100;
    }
    if (isLatest !== undefined) product.isLatest = isLatest;
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "category subcategory sizename"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id).populate(
      "category subcategory sizename"
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
