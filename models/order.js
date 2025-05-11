"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "UserId" }); // Asegúrate de que el 'UserId' esté bien nombrado
      Order.hasMany(models.OrderItem, { foreignKey: "OrderId" });
      Order.hasOne(models.Payment, { foreignKey: "orderId" });
    }
  }

  Order.init({
    UserId: DataTypes.INTEGER,
    totalAmount: DataTypes.FLOAT,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
