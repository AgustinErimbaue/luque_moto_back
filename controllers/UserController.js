const { where } = require("sequelize");
const { User, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");

const UserController = {
  async create(req, res) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      req.body.role = "user";
      req.body.password = password;
      const user = await User.create(req.body);
      res.status(201).send({ msg: "Usuario creado con exito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ msg: "usuario o contrasena incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ msg: "Usuario o contrasena incorrectos" });
      }
      res.send(user);
    });
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

  async deleteUser(req, res) {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Usuario eliminado correctamente");
  },

  async updateUser(req, res) {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send("Usuario actualizado con exito");
  },
};

module.exports = UserController;
