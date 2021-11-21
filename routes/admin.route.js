const { Router } = require("express");
const Bank = require("./../models/bank");
const Debet = require("./../models/cards");
const { check, validationResult } = require("express-validator");
const router = Router();
const mongoose = require("mongoose");
//получить дебетовые карты
router.get("/admin/debet/get", async (req, res) => {
  try {
    const getdebet = await Debet.find();
    res.status(201).json(getdebet);
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});
// создать дебетовую карту
router.post("/admin/debet/create", async (req, res) => {
  try {
    const {
      id_bank,
      name_card,
      srok,
      pay_system,
      sms_pay,
      ostatok,
      cashback,
      osblug_pay,
      url_images,
    } = req.body;
    const card = new Debet({
      id_bank: id_bank,
      name_card: name_card,
      srok: srok,
      pay_system: pay_system,
      sms_pay: sms_pay,
      ostatok: ostatok,
      cashback: cashback,
      osblug_pay: osblug_pay,
      url_images: url_images,
    });

    await card.save();

    res.status(201).json({ card });
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.delete(
  "/admin/debet/delete/:id",
  //по url id и удаляю
  async (req, res) => {
    try {
      //беру id банка из url
      const { id } = req.params;
      //чекаю сущесвует ли такой объект в бд
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`Такого банка не сущесвует`);

      await Debet.findByIdAndDelete(id);

      res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);

//добавляю банк
router.post(
  "/admin/bank/create",

  async (req, res) => {
    try {
      const { name_bank, license, url, phone_number, url_images, About } =
        req.body;
      const number = await Bank.findOne({ license });
      if (number) {
        return res.status(400).json({
          message: "Банк с таким номер лицензии уже зарегистрирован.",
        });
      }
      const bank = new Bank({
        name_bank: name_bank,
        license: license,
        url: url,
        phone_number: phone_number,
        url_images: url_images,
        About: About,
      });
      await bank.save();
      //после того как добавляю новый банк отправляю его на фронтенд
      res.status(201).json({ bank });
    } catch (err) {
      //при ошибка неизвестных отсылаю 500 ошибку
      return res.status(500).json({ message: error.message });
    }
  }
);

//Беру все записи о банках
router.get("/admin/bank/get", async (req, res) => {
  try {
    const banks = await Bank.find();
    res.status(201).json(banks);
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так." });
  }
});
//удалить банк
router.delete(
  "/admin/bank/delete/:id",
  //по url id и удаляю
  async (req, res) => {
    try {
      //беру id банка из url
      const { id } = req.params;
      //чекаю сущесвует ли такой объект в бд
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`Такого банка не сущесвует`);

      await Bank.findByIdAndDelete(id);

      res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);

module.exports = router;
