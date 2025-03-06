const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/", authentication, UserController.getAll);
router.get("/user/:name", authentication, UserController.getByName);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/update/:id", authentication, UserController.updateUser);
router.delete("/delete/:id", authentication, UserController.deleteUser);
router.delete("/logout", authentication, UserController.logout);
module.exports = router;