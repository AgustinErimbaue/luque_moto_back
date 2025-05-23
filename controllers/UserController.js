const { where } = require("sequelize");
const { User, Sequelize, Token } = require("../models/index");
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.json")["development"];

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      req.body.role = "user";
      req.body.password = password;
      const user = await User.create(req.body);
      res.status(201).send({ msg: "Usuario creado con exito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({msg:"Error al registrarse",error});
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validación básica
      if (!email || !password) {
        return res.status(400).send({ msg: "Email y contraseña son obligatorios" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({ msg: "Usuario o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      await Token.create({ token, UserId: user.id });

      res.send({ msg: `Bienvenid@ ${user.name}`, user, token });
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
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }

      await User.destroy({ where: { id: req.params.id } });
      res.send({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al eliminar el usuario" });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }

      await User.update(req.body, { where: { id: req.params.id } });
      res.send({ msg: "Usuario actualizado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al actualizar el usuario" });
    }
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ msg: "Desconectado con exito" });
    } catch (error) {
      console.error(error)
      res.status(500).send ({msg:"Problema al desconectarse"});
    }
  },
};

module.exports = UserController;
