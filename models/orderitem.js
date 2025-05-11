"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: "OrderId" });
      OrderItem.belongsTo(models.Product, { foreignKey: "ProductId" });  // Asegúrate de que 'Product' está bien definido
    }
  }

  OrderItem.init(
    {
      OrderId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );

  return OrderItem;
};
