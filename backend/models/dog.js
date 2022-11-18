const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dogSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  from: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  breed: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Dog", dogSchema);
