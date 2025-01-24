const { where } = require("sequelize");
const { ShippinAddress } = require("../models/index");

const ShippingAddressController = {
  async create(req, res) {
    try {
      const shippingAddress = await ShippinAddress.create(req.body);
      res
        .status(201)
        .send({ msg: "Direccion creada con exito", shippingAddress });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async updateAddres(req, res) {
    try {
      await ShippinAddress.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Direccion modificada correctamente" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ShippingAddressController;
