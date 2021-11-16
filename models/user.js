//достаем схему(чтобы делать данные)
const { Schema, model, Types } = require("mongoose");
//создаем схему
const schema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true, //униальная?
  },
  Password: { type: String, required: true },
  //создаем ссылки для каждого пользователя, напр ссылка на профиль
  links: [{ type: Types.ObjectId, ref: "Link" }],
});


//экспортируем нашу модель для использования в других файлах
module.exports = model("User", schema);
