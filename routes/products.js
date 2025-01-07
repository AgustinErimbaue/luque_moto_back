const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/product/:name", ProductController.getByName);
router.post("/", ProductController.create);
router.delete("/delete/:id", ProductController.deleteProduct);
router.put("/update/:id", ProductController.updateProduct);

module.exports = router;
