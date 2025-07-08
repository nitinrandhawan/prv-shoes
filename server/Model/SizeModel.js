const mongoose = require("mongoose")

const  sizeSchema = new mongoose.Schema({
    sizename:{
        type:String,
        required:[true,"Size is must Required"]
    }
})

const Size = mongoose.model("Size" , sizeSchema)

module.exports = Size