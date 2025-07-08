const mongoose = require("mongoose");

const productmini = new mongoose.Schema({
    productId: {
        type: String,
        required: [true, "Product id is Must required"]
    },
    name: {
        type: String,
        required: [true, "Product Name is Must required"]
    },
    sizename: {
        type: String,
        required: [true, "Product id is must Required"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is must Required"]
    },
    color: {
        type: String,
        required: [true, "Product Category is must Required"]
    },
    image: {
        type: String
    },
    maincategory: {
        type: String,
        required: [true, "Product Color is Must Required"]
    },
    subcategory: {
        type: String,
        required: [true, "Product Subcategory Must Required"]
    }
});

const orderSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User Id is must required"]
    },
    product: [productmini],
    OrderDate: {
        type: Date,
        default: Date.now()
    },
    OrderStatus:{
        type:String,
        default:"Pending"
    },
    AnyMessage:{
        type:String
    }
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
