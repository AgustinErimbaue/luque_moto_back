const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/user/:name", UserController.getByName);
router.post("/", UserController.create);
router.put("/upgrade/:id", UserController.upgradeUser);
module.exports = router;
