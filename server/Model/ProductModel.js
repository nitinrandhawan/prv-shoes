const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is must Required"],
  },
  brand: {
    type: String,
    required: [true, "Product Brand is Must Required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product Category is Must Required"],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: [true, "Product Subcategory Must Required"],
  },
  color: {
    type: String,
    required: [true, "Product Color is Must Required"],
  },
  sizename: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: [true, "Product Color is Must Required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is must Required"],
  },
  description: {
    type: String,
  },
  pic1: {
    type: String,
    required: [true, "Product Pic is must Required"]
  },
  pic2: {
    type: String,
  },
  pic3: {
    type: String,
  },
  pic4: {
    type: String,
  },
 
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
