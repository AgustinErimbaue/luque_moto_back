const { where } = require("sequelize");
const { OrderItem, Order, Product, ShippingAddress, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const OrderItemController = {
  async create(req, res) {
    try {
      const { OrderId, ProductId, quantity, price } = req.body;
      if (!OrderId || !ProductId || !quantity || !price) {
        return res.status(400).send({ msg: "Faltan datos obligatorios" });
      }
      const orderItem = await OrderItem.create({
        OrderId,
        ProductId,
        quantity,
        price,
      });
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
            model: Product,
            attributes: ["id", "name"],
          },
          {
            model: Order,
            attributes: ["id", "UserId", "totalAmount", "status"],
            include: [
              {
                model: ShippingAddress,
                attributes: ["address", "city", "state", "postalCode", "country"],
              },
            ],
          },
        ],
      });
      res
        .status(200)
        .send({ msg: "Busqueda realizada con exito", ordersItems });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const orderItem = await OrderItem.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name"],
          },
          {
            model: Order,
            attributes: ["id", "UserId", "totalAmount", "status"],
            include: [
              {
                model: ShippingAddress,
                attributes: ["address", "city", "state", "postalCode", "country"],
              },
            ],
          },
        ],
      });
      res.status(200).send({ msg: "Orden encontrada con exito", orderItem });
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
      res.status(200).send({ msg: "Orden modificada con exito", order });
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
