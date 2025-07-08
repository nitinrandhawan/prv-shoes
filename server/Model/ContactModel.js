const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must required"]
    },
    email: {
        type: String,
        required: [true, "Email id is must required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is must required"]
    },
    address: {
        type: String,
        required: [true, "Address is must Required"]
    },
    message: {
        type: String,
        required: [true, "Message is must Required"]
    }

})

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = Contact