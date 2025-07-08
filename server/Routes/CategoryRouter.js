const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getSingleCategory,
} = require("../controller/CategoryController");

const upload = require("../utils/multer");
const CategoryRouter = require("express").Router();

CategoryRouter.post("/", upload.single("image"), createCategory);
CategoryRouter.put("/:_id", upload.single("image"), updateCategory);
CategoryRouter.get("/", getCategories);
CategoryRouter.get("/:_id", getSingleCategory);
CategoryRouter.delete("/:_id", deleteCategory);

module.exports = CategoryRouter;
