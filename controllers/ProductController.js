const { Product } = require("../models/index");

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send({ msg: "PProducto creado", product });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = ProductController;
