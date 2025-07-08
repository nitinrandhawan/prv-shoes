const mongoose = require("mongoose");

const Subcategoryschema = new mongoose.Schema({
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is must required"],
  },
  subcategory: {
    type: String,
  },
  subcategoryImage: {
    type: String,
  },
});

const Subcategory = mongoose.model("Subcategory", Subcategoryschema);

module.exports = Subcategory;
