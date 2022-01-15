const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Text: { type: String, required: true },
  Date: {
    type: String,
    required: true,
  },
  url_images: {
    type: String,
    required: true,
  },
});
//экспортируем нашу модель для использования в других файлах
module.exports = model("News", schema);
