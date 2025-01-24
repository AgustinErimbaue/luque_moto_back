const { where } = require("sequelize");
const { User, Sequelize, Token } = require("../models/index");
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

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
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send({ msg: "Usuario o contraseña incorrectos" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ msg: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);

     
      await Token.create({ UserId: user.id, token });

      res.send({ msg: "Bienvenido/a " + user.name, user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error en el proceso de login", error });
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
