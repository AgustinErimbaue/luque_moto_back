const { ShippingAddress } = require("../models/index");
const Joi = require("joi");

const ShippingAddressController = {
  async create(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).send({ msg: "Usuario no autenticado" });
      }

      const schema = Joi.object({
        address: Joi.string().min(3).required(),
        city: Joi.string().min(2).required(),
        state: Joi.string().min(2).required(),
        postalCode: Joi.string().pattern(/^\d{5}$/).required(),
        country: Joi.string().min(2).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ msg: error.details[0].message });
      }

      const { address, city, state, postalCode, country } = req.body;
      const userId = req.user.id;

      const shippingAddress = await ShippingAddress.create(
        { userId, address, city, state, postalCode, country },
        { fields: ["userId", "address", "city", "state", "postalCode", "country"] }
      );

      return res
        .status(201)
        .send({ msg: "Dirección creada con éxito", shippingAddress });
    } catch (error) {
      console.error("Error al crear la dirección de envío:", error);
      return res.status(500).send({ msg: "Error interno al crear la dirección de envío" });
    }
  },

  async updateAddress(req, res) {
    try {
      const schema = Joi.object({
        address: Joi.string().min(3).required(),
        city: Joi.string().min(2).required(),
        state: Joi.string().min(2).required(),
        postalCode: Joi.string().pattern(/^\d{5}$/).required(),
        country: Joi.string().min(2).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ msg: error.details[0].message });
      }

      const { address, city, state, postalCode, country } = req.body;

      const [updatedRows] = await ShippingAddress.update(
        { address, city, state, postalCode, country },
        {
          fields: ["address", "city", "state", "postalCode", "country"],
          where: { id: req.params.id },
        }
      );

      if (updatedRows === 0) {
        return res.status(404).send({ msg: "Dirección no encontrada" });
      }

      res.status(200).send({ msg: "Dirección modificada correctamente" });
    } catch (error) {
      console.error("Error al actualizar la dirección de envío:", error);
      res.status(500).send({ msg: "Error interno al actualizar la dirección de envío" });
    }
  },
};

module.exports = ShippingAddressController;
