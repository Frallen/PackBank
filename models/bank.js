const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name_bank: {
    type: String,
    required: true,
  },
  license: {
    type: Number,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  url_images: {
    type: [],
  },
  About: {
    type: String,
    required: true,
  },
});

module.exports = model("Bank", schema);
