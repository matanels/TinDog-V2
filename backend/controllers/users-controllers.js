const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

const USERS = [
  {
    id: 1,
    name: "David",
    email: "test1@gmail.com",
    password: "test123",
    dogsId: ["u1", "u8"],
  },
  {
    id: 2,
    name: "Anton",
    email: "test2@gmail.com",
    password: "test123",
    dogsId: ["u2"],
  },
];

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  const user = USERS.find((u) => {
    return JSON.stringify(u.id) === userId;
  });
  if (!user) {
    throw new HttpError("Could not find User provided id", 404);
  }
  res.json({ user });
};

const getAllUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const hasUser = USERS.find((u) => {
    return u.email === email;
  });
  if (hasUser) {
    throw new HttpError("Could not create user, email already exits.", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
    dogsId: [],
  };
  USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find((u) => {
    return u.email === email;
  });
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Wrong credentials, Could not identify User.", 401);
  }
  res.json({ message: "Logged in successfully!" });
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
