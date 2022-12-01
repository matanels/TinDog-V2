const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Dog = require("../models/dog");
const User = require("../models/user");
const user = require("../models/user");
const dog = require("../models/dog");

const getDogById = async (req, res, next) => {
  const dogId = req.params.dogId;
  let dog;
  try {
    dog = await Dog.findById(dogId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a dog.",
      500
    );
    return next(error);
  }

  if (!dog) {
    const error = new HttpError(
      "Could not find a dog for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ dog: dog.toObject({ getters: true }) });
};
const getDogsByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let dogs;
  try {
    dogs = await Dog.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching dogs failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!dogs || dogs.length === 0) {
    const error = new HttpError(
      "Could not find a dog for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ dogs: dogs.map((dog) => dog.toObject({ getters: true })) });
};
const getAllDogs = async (req, res, next) => {
  let dogs;
  try {
    dogs = await Dog.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a dog.",
      500
    );
    return next(error);
  }
  if (!dogs || dogs.length === 0) {
    const error = new HttpError(
      "Could not find a dog for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ dogs: dogs.map((dog) => dog.toObject({ getters: true })) });
};
const createDog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, age, breed, from, image, gender, creator } = req.body;
  const createdDog = new Dog({
    name,
    age,
    breed,
    from,
    image,
    gender,
    creator,
  });
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating dog failed, please try again.",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdDog.save({ session: sess });
    user.dogsId.push(createdDog);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating dog failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ dog: createdDog.toObject({ getters: true }) });
};
const updateDog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, age, breed, from, image, gender } = req.body;
  const dogId = req.params.dogId;
  let dogToUpdate;
  try {
    dogToUpdate = await Dog.findById(dogId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update dog.",
      500
    );
    return next(error);
  }
  dogToUpdate.name = name;
  dogToUpdate.age = age;
  dogToUpdate.from = from;
  dogToUpdate.breed = breed;
  dogToUpdate.gender = gender;
  dogToUpdate.image = image;

  try {
    await dogToUpdate.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update dog.",
      500
    );
    return next(error);
  }

  res.status(200).json({ dog: dogToUpdate.toObject({ getters: true }) });
};
const deleteDog = async (req, res, next) => {
  const dogId = req.params.dogId;
  let dogToDelete;
  try {
    dogToDelete = await Dog.findById(dogId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete dog.",
      500
    );
    return next(error);
  }
  if (!dogToDelete) {
    const error = new HttpError("Could not find a dog for this id.", 404);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await dogToDelete.deleteOne({ session: sess });
    dogToDelete.creator.dogsId.pull(dogToDelete);
    await dogToDelete.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete dog with that id", 404);
    return next(error);
  }
  res.status(200).json({ message: "Dog deleted." });
};

exports.getDogById = getDogById;
exports.getDogsByUserId = getDogsByUserId;
exports.getAllDogs = getAllDogs;
exports.createDog = createDog;
exports.updateDog = updateDog;
exports.deleteDog = deleteDog;
