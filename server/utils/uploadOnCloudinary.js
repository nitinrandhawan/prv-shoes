const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    const uploadFile = await cloudinary.uploader.upload(file);
    fs.unlink(file, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return uploadFile.secure_url;
  } catch (error) {
    console.log("cloudinary error", error);
  }
};

module.exports = uploadOnCloudinary;