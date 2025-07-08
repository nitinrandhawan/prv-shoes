const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is must required"]
    },
    userName: {
        type: String,
        required: [true, "User name is must Required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email id is must Required"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Phone number is must required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is must Required"]
    },
    role:{
        type:String,
        default:"Buyer"
    }
    
})

const User = mongoose.model("User", UserSchema)

module.exports = User