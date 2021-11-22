const { Schema, model, Types } = require("mongoose");

const debit_schema = new Schema({
  id_bank: {
    required: true,
    type: String,
  },
  name_bank: {
    type: String,
    required: true,
  },
  name_card: {
    required: true,
    type: String,
  },
  srok: {
    required: true,
    type: String,
  },
  pay_system: {
    required: true,
    type: String,
  },
  sms_pay: {
    required: true,
    type: String,
  },
  ostatok: {
    required: true,
    type: String,
  },
  cashback: {
    required: true,
    type: String,
  },
  osblug_pay: {
    required: true,
    type: String,
  },
  url_images: {
   required: true,
    type: String,
  },
});

module.exports = model("Debet", debit_schema);
