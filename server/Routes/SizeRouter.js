const {
  createSize,
  getSizes,
  deleteSize,
  getSingleSize,
  updateSize,
} = require("../Controller/SizeController");

const sizeRouter = require("express").Router();

sizeRouter.post("/", createSize);
sizeRouter.get("/", getSizes);
sizeRouter.get("/:_id", getSingleSize);
sizeRouter.put("/:_id", updateSize);
sizeRouter.delete("/:_id", deleteSize);

module.exports = sizeRouter;
