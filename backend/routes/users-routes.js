const express = require("express");
const router = express.Router();

const USERS = [
  {
    id: 1,
    email: "test1@gmail.com",
    password: "test123",
    dogsId: ["u1", "u8"],
  },
  {
    id: 2,
    email: "test2@gmail.com",
    password: "test123",
    dogsId: ["u2"],
  },
];

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const user = USERS.find((u) => {
    return u.id === userId;
  });
  if (!user) {
    res
      .status(404)
      .json({ message: "Could not find a user for the provider id." });
  }
  res.json({ user });
});

module.exports = router;
