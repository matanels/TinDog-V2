const express = require("express");
const { check } = require("express-validator");

const dogsControllers = require("../controllers/dogs-controllers");
const router = express.Router();

router.get("/:dogId", dogsControllers.getDogById);

router.get("/user/:userId", dogsControllers.getDogsByUserId);

router.get("/", dogsControllers.getAllDogs);

router.patch(
  "/:dogId",
  check("name").not().isEmpty(),
  check("age").isNumeric().isLength({ min: 1, max: 2 }),
  check("from").not().isEmpty(),
  check("gender").not().isEmpty(),
  check("image").isURL(),
  check("breed").not().isEmpty(),
  dogsControllers.updateDog
);

router.post(
  "/",
  check("name").not().isEmpty(),
  check("age").isNumeric().isLength({ min: 1, max: 2 }),
  check("from").not().isEmpty(),
  check("gender").not().isEmpty(),
  check("image").isURL(),
  check("breed").not().isEmpty(),
  check("creator").not().isEmpty(),
  dogsControllers.createDog
);

router.delete("/:dogId", dogsControllers.deleteDog);

module.exports = router;
