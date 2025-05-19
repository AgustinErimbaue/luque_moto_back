"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
  
    static associate(models) {
      ShippingAddress.belongsTo(models.User, { foreignKey: "userId" });
      ShippingAddress.belongsTo(models.Order, { foreignKey: "OrderId" });
    }
  }
  ShippingAddress.init(
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      OrderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShippingAddress",
    }
  );
  return ShippingAddress;
};
