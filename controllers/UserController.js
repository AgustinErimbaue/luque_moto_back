const { User, Sequelize } = require("../models/index");
const { Op } = Sequelize;

const UserController = {
  async create(req, res) {
    try {
      req.body.role = "user";
      const user = await User.create(req.body);
      res.status(201).send({ msg: "Usuario creado con exito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.send({ msg: "todos los usuarios", users });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getByName(req, res) {
    try {
      const user = await User.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}`,
          },
        },
      });
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
