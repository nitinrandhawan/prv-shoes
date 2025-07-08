const { createRecord, getRecord, confirmOrder, cancelOrder, DeleteOrder } = require("../Controller/OrderController")
// const { verifyBuyer } = require("../verification")

const OrderRouter = require("express").Router()

OrderRouter.post("/", createRecord)
OrderRouter.get("/", getRecord)
OrderRouter.post("/confirm",confirmOrder)
OrderRouter.delete("/delete/:id",DeleteOrder)

OrderRouter.post("/cancel",cancelOrder)


module.exports = OrderRouter