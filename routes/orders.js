const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/",authentication , OrderController.getAll);

router.get("/user",authentication , OrderController.getUserOrders); 

router.post("/",authentication ,  OrderController.create);

router.put("/update/:id", authentication,  OrderController.updateOrder);

router.delete("/delete/:id", authentication,  OrderController.deleteOrder);

module.exports = router;