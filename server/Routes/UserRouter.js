const {
  newRegister,
  login,
  getByUserId,
  verifyAdminRole,
} = require("../Controller/UserController");
const { verifyAdmin } = require("../verification");

const UserRouter = require("express").Router();

UserRouter.post("/", verifyAdmin, newRegister);
UserRouter.post("/login", login);
UserRouter.get("/:_id", getByUserId);
UserRouter.post("/verify-admin", verifyAdmin, verifyAdminRole)

module.exports = UserRouter;
