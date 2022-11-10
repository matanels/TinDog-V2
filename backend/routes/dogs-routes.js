const express = require("express");
const { check } = require("express-validator");

const dogsControllers = require("../controllers/dogs-controllers");
const router = express.Router();

router.get("/:dogId", dogsControllers.getDogById);

router.get("/", dogsControllers.getAllDogs);

router.patch("/:dogId", dogsControllers.updateDog);

router.post(
  "/",
  check("name").not().isEmpty(),
  check("age").isNumeric().isLength({ min: 0, max: 20 }),
  check("from").not().isEmpty(),
  check("gender").not().isEmpty(),
  check("image").isURL(),
  dogsControllers.createDog
);

router.delete("/:dogId", dogsControllers.deleteDog);

module.exports = router;
