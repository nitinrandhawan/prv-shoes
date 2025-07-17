const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  latestProducts
} = require("../Controller/ProductController");
const { verifyAdmin } = require("../verification");
const upload = require("../utils/multer");

const ProductRouter = express.Router();

ProductRouter.post(
  "/create-product",
  verifyAdmin,
  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
  ]),
  createProduct
);

ProductRouter.get("/get-all-products", getAllProducts);
ProductRouter.get("/latest-products", latestProducts);
ProductRouter.get("/get-single-product/:_id", getSingleProduct);

ProductRouter.put(
  "/update-product/:_id",
  verifyAdmin,
  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
  ]),
  updateProduct
);

ProductRouter.delete("/:_id", verifyAdmin, deleteProduct);

module.exports = ProductRouter;
