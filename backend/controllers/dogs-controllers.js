const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

const DOGS = [
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
  res.json({ DOGS });
};

const createDog = (req, res, next) => {
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

exports.getDogById = getDogById;
exports.getAllDogs = getAllDogs;
exports.createDog = createDog;
