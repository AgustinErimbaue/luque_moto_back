const express = require("express");
const ShippingAddress = require("../controllers/ShippingAddressController");
const router = express.Router();

router.post("/", ShippingAddress.create);
router.put("/updateAddress", ShippingAddress.updateAddres); // Corregido el nombre del método

module.exports = router;
