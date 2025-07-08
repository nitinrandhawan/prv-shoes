const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category name is must required"]
    },
    categoryImage: {
        type: String,
        required: [true, "Category image is must required"]
    }
})

const Category = mongoose.model("Category", categoryschema)

module.exports = Category