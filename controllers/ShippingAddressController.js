const { ShippingAddress } = require("../models/index");

const ShippingAddressController = {
  async create(req, res) {
    try {
      const userId = req.user.id;

      const { address, city, state, postalCode, country } = req.body;
      if (!address || !city || !state || !postalCode || !country) {
        return res.status(400).send({ msg: "Faltan campos obligatorios" });
      }

      const shippingAddress = await ShippingAddress.create({
        userId,
        address,
        city,
        state,
        postalCode,
        country,
      });

      return res
        .status(201)
        .send({ msg: "Dirección creada con éxito", shippingAddress });
    } catch (error) {
      console.error("Error interno al crear address:", error);
      return res.status(500).send({ msg: "Error interno del servidor" });
    }
  },

  async updateAddress(req, res) {
    try {
      const { address, city, state, postalCode, country } = req.body;

      if (!address || !city || !state || !postalCode || !country) {
        return res.status(400).send({ msg: "Faltan campos obligatorios" });
      }

      const [updatedRows] = await ShippingAddress.update(
        { address, city, state, postalCode, country },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (updatedRows === 0) {
        return res.status(404).send({ msg: "Direccion no encontrada" });
      }

      res.send({ msg: "Direccion modificada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error interno del servidor" });
    }
  },
};

module.exports = ShippingAddressController;
