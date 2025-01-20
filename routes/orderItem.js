const express = require("express");
const OrderItemController = require("../controllers/OrderItemController");
const router = express.Router();

router.get("/", OrderItemController.getAll);
router.get("order-item/:id", OrderItemController.getById);
router.post("/", OrderItemController.create);
router.put("update/:id", OrderItemController.updateOrder);
router.delete("/delete-order/:id", OrderItemController.deleteOrder);

module.exports = router;
