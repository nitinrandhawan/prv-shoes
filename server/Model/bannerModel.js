const mongoose = require("mongoose")

const BannerSchema = new mongoose.Schema({
    bannerImage: {
        type: String,
        required: [true, "Banner image is must required"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Banner = mongoose.model("Banner", BannerSchema)

module.exports = Banner