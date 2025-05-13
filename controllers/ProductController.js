const { where } = require("sequelize");
const { Product, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const Joi = require("joi");

const ProductController = {
  async create(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().integer().min(0).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ msg: error.details[0].message });
      }

      const product = await Product.create(req.body);
      res.status(201).send({ msg: "Producto creado", product });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).send({ msg: "Error al crear el producto" });
    }
  },

  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      res.send({ msg: "Todos los productos:", products });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).send({ msg: "Error al obtener los productos" });
    }
  },

  async getByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });

      if (!product) {
        return res.status(404).send({ msg: "Producto no encontrado" });
      }

      res.send(product);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      res.status(500).send({ msg: "Error al buscar el producto" });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).send({ msg: "Producto no encontrado" });
      }

      await Product.destroy({ where: { id: req.params.id } });
      res.send({ msg: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).send({ msg: "Error al eliminar el producto" });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send({ msg: "Producto no encontrado" });
      }

      const schema = Joi.object({
        name: Joi.string().min(3),
        description: Joi.string().min(5),
        price: Joi.number().positive(),
        stock: Joi.number().integer().min(0),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ msg: error.details[0].message });
      }

      await Product.update(req.body, { where: { id } });

      const updatedProduct = await Product.findByPk(id);
      res.send({
        msg: "Producto actualizado con éxito",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).send({ msg: "Error al actualizar el producto" });
    }
  },
};

module.exports = ProductController;
