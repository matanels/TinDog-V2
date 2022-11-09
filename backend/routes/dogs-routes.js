const express = require("express");

const dogsControllers = require("../controllers/dogs-controllers");
const router = express.Router();

router.get("/:dogId", dogsControllers.getDogById);
router.get("/", dogsControllers.getAllDogs);

router.post("/", dogsControllers.createDog);

module.exports = router;
