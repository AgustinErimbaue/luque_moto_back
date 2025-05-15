const { Order, OrderItem, Sequelize } = require("../models/index");
const { where } = require("sequelize");
const { Op } = Sequelize;

const OrderController = {
  async create(req, res) {
    const t = await Order.sequelize.transaction();
    try {
      const { UserId, totalAmount, status, items } = req.body;

      if (!items || !Array.isArray(items)) {
        return res.status(400).send({ msg: "'items' debe ser un arreglo" });
      }

      const order = await Order.create(
        { UserId, totalAmount, status },
        { transaction: t }
      );

      const orderItems = items.map((item) => ({
        OrderId: order.id,
        ProductId: item.ProductId,
        quantity: item.quantity,
        price: item.price,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction: t });

      await t.commit();

      res.status(201).send({ msg: "Orden creada", order });
    } catch (error) {
      await t.rollback();
      console.error("Error al crear la orden:", error);
      res.status(500).send({
        msg: "Error al crear la orden",
        error: error.message || error,
      });
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
  async getUserOrders(req, res) {
    try {
      const userId = req.user.id; 
  
      const orders = await Order.findAll({
        where: { UserId: userId },
        include: [{
          model: OrderItem,
          include: ['Product'],
        }],
      });
  
      res.send({ msg: "Tus órdenes", orders });
    } catch (error) {
      console.error("Error al obtener las órdenes del usuario:", error);
      res.status(500).send({ msg: "Error al obtener tus órdenes", error: error.message });
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
