"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "UserId" }); 
      Order.hasMany(models.OrderItem, { foreignKey: "OrderId" });
      Order.hasOne(models.Payment, { foreignKey: "orderId" });
      Order.hasOne(models.ShippingAddress, { foreignKey: "OrderId" });
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
