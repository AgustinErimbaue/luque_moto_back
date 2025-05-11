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
      res.status(500).send({ msg: "Error al obtener los productos" });
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
    try {
      const { id } = req.params; // Asegúrate de obtener el id desde los parámetros de la solicitud
      const { name, description, price, stock } = req.body; // Obtener los datos del producto desde el cuerpo de la solicitud

      // Actualizar el producto en la base de datos
      const updatedProduct = await Product.update(
        { name, description, price, stock },
        { where: { id } }
      );

      if (!updatedProduct[0]) {
        // Si no se encontró el producto o no se actualizó, enviar un error
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      // Obtener el producto actualizado
      const product = await Product.findByPk(id);

      return res.json({ product });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al actualizar el producto" });
    }
  },
};

module.exports = ProductController;
