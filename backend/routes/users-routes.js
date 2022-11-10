const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userControllers = require("../controllers/users-controllers");

router.get("/:userId", userControllers.getUserById);
router.get("/", userControllers.getAllUsers);
router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);

module.exports = router;
