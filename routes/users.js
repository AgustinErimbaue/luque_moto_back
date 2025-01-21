const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/user/:name", UserController.getByName);
router.post("/", UserController.create);
router.post("/login",UserController.login)
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser)
module.exports = router;
