const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");
const router = express.Router();

router.get("/", userControllers.getAllUsers);

router.get("/:userId", userControllers.getUserById);

router.post(
  "/register",
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
  userControllers.signup
);

router.post(
  "/login",
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
  userControllers.login
);

module.exports = router;
