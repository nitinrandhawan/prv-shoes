const {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
  getSingleSubcategory,
} = require("../controller/SubcategoryController");

const upload = require("../utils/multer");
const SubcategoryRouter = require("express").Router();

SubcategoryRouter.post("/", upload.single("image"), createSubcategory);
SubcategoryRouter.put("/:_id", upload.single("image"), updateSubcategory);
SubcategoryRouter.get("/", getSubcategories);
SubcategoryRouter.get("/:_id", getSingleSubcategory);
SubcategoryRouter.delete("/:_id", deleteSubcategory);

module.exports = SubcategoryRouter;
