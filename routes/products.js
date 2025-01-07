const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/product/:name", ProductController.getByName);
router.post("/", ProductController.create);

module.exports = router;
