const { where } = require("sequelize");
const { OrderItem, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const OrderItemController = {
  async create(req, res) {
    try {
      const orderItem = await OrderItem.create(req.body);
      res.status(201).send({ msg: "Se crea correctamente", orderItem });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getAll(req, res) {
    try {
      const ordersItems = await OrderItem.findAll({
        include: [
          {
            model: require("../models/index").Product,
            attributes: ["id", "name"],
          },
        ],
      });
      res
        .status(201)
        .send({ msg: "Busqueda realizada con exito", ordersItems });
    } catch (error) {}
  },
  async getById(req, res) {
    try {
      const order = await OrderItem.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(201).send({ msg: "Orden encontrada con exito", order });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async updateOrder(req, res) {
    try {
      const order = await OrderItem.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(201).send({ msg: "Orden modificada con exito", order });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async deleteOrder(req, res) {
    try {
      await OrderItem.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Producto eliminado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = OrderItemController;
