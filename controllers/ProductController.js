const { where } = require("sequelize");
const { Product, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send({ msg: "Producto creado", product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "No se a podido agregar el producto correctamente" });
    }
  },
  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      res.send({ msg: "Todos los productos:", products });
    } catch (error) {
      console.error(error);
      res.status(500).send({msg:"Error al obtener los productos"});
    }
  },
  async getByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}`,
          },
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
    }
  },

  async deleteProduct(req, res) {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Producto eliminado correctamente");
  },

  async updateProduct(req, res) {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send("Producto actualizado correctamente");
  },
};

module.exports = ProductController;
