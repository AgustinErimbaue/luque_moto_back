const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();

router.get("/", OrderController.getAll);
router.get("/order/:id", OrderController.getById);
router.post("/", OrderController.create);
router.put("/update/:id", OrderController.updateOrder);

module.exports = router;
