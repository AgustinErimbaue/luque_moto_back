const { Order, Sequelize } = require("../models/index");
const { where } = require("sequelize");
const { Op } = Sequelize;

const OrderController = {
  async create(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).send({ msg: "Orden creada", order });
    } catch (error) {
      res.status(500).send({ msg: "Error al crear la orden", error });
    }
  },
  async getAll(req, res) {
    try {
      const orders = await Order.findAll();
      res.send({ msg: "Todas las ordenes", orders });
    } catch (error) {
      res.status(500).send({ msg: "Error al obtener las órdenes", error });
    }
  },
  async getById(req, res) {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Orden encontrada:", order });
    } catch (error) {
      res.status(500).send({ msg: "Error al buscar la orden", error });
    }
  },
  async updateOrder(req, res) {
    try {
      await Order.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Orden modificada con exito" });
    } catch (error) {
      res.status(500).send({ msg: "Error al modificar la orden", error });
    }
  },
};

module.exports = OrderController;
