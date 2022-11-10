const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let DOGS = [
  {
    id: "u1",
    name: "Thomas",
    age: "1.9",
    breed: "American akita",
    from: "Karmiel",
    image:
      "https://i.pinimg.com/736x/94/ba/ce/94bace114138c471a1a48905dd2ee949.jpg",
    gender: "male",
  },
  {
    id: "u2",
    name: "John",
    age: "3",
    breed: "Pitbull",
    from: "London",
    image:
      "https://geniusvets.s3.amazonaws.com/gv-dog-breeds/american-pitbull-1.jpg",
    gender: "male",
  },
  {
    id: "u8",
    name: "Loei",
    age: "3",
    breed: "yorkshire-terrier",
    from: "Karmiel",
    image:
      "https://dogs-train.co.il/wp-content/uploads/2019/09/yorkshire-terrier-cover.jpg",
    gender: "male",
  },
];

const getDogById = (req, res, next) => {
  const dogId = req.params.dogId;
  const dog = DOGS.find((d) => {
    return d.id === dogId;
  });
  if (!dog) {
    throw new HttpError("Could not find a dog for the provided id.", 404);
  }
  res.json({ dog });
};
const getAllDogs = (req, res, next) => {
  res.json({ dogs: DOGS });
};
const createDog = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
  }

  const { name, age, breed, from, image, gender } = req.body;
  const createdDog = {
    id: uuidv4(),
    name,
    age,
    breed,
    from,
    image,
    gender,
  };
  DOGS.push(createdDog);
  res.status(201).json({ dog: createdDog });
};
const updateDog = (req, res, next) => {
  const { name, age, breed, from, image, gender } = req.body;
  const dogId = req.params.dogId;
  const dogToUpdate = {
    ...DOGS.find((d) => {
      d.id === dogId;
    }),
  };
  if (!dogToUpdate) {
    throw new HttpError("Could not find a dog for the provided id.", 404);
  }
  const dogToUpdateIndex = DOGS.findIndex((d) => d.id === dogId);
  dogToUpdate.name = name;
  dogToUpdate.age = age;
  dogToUpdate.breed = breed;
  dogToUpdate.from = from;
  dogToUpdate.image = image;
  dogToUpdate.gender = gender;
  DOGS[dogToUpdateIndex] = dogToUpdate;
  console.log(dogToUpdateIndex);
  console.log(dogToUpdate);
  res.status(200).json({ dog: dogToUpdate });
};
const deleteDog = (req, res, next) => {
  const dogId = req.params.dogId;
  DOGS = DOGS.filter((d) => d.id !== dogId);
  res.status(200).json({ message: "Dog deleted." });
};

exports.getDogById = getDogById;
exports.getAllDogs = getAllDogs;
exports.createDog = createDog;
exports.updateDog = updateDog;
exports.deleteDog = deleteDog;
