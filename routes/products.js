const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/", authentication, ProductController.getAll);
router.get("/product/:name", authentication, ProductController.getByName);
router.post("/", authentication, ProductController.create);
router.delete("/delete/:id", authentication, ProductController.deleteProduct);
router.put("/update/:id", authentication, ProductController.updateProduct);

module.exports = router;
