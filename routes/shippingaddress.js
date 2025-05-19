const express = require("express");
const ShippingAddress = require("../controllers/ShippingAddressController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/", ShippingAddress.getAllAddresses);
router.post("/",authentication, ShippingAddress.create);
router.put("/updateAddress", ShippingAddress.updateAddress); 

module.exports = router;