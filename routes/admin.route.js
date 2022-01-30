const { Router } = require("express");
const News = require("./../models/news");
const Bank = require("./../models/bank");
const CreditCrd = require("./../models/creditcard");
const Debet = require("../models/debet");
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
      name_bank,
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
      name_bank: name_bank,
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
//удалить дебетовую карту
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
//обновить дебетовую карту
router.patch("/admin/debet/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_bank,
      name_bank,
      name_card,
      srok,
      pay_system,
      sms_pay,
      ostatok,
      cashback,
      osblug_pay,
      url_images,
    } = req.body;
    const upd = {
      id_bank,
      name_bank,
      name_card,
      srok,
      pay_system,
      sms_pay,
      ostatok,
      cashback,
      osblug_pay,
      url_images,
    };
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Такого банка не сущесвует`);
    let data = await Debet.findByIdAndUpdate(id, upd, { new: true });
    res.status(201).json(data);
  } catch (err) {
    return res.status(err.message);
  }
});

//получить кредитные карты
router.get("/admin/creditcrd/get", async (req, res) => {
  try {
    const getcredit = await CreditCrd.find();
    res.status(201).json(getcredit);
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});
// создать кредитную карту
router.post("/admin/creditcrd/create", async (req, res) => {
  try {
    const {
      id_bank,
      name_bank,
      name_card,
      About,
      srok,
      pay_system,
      sms_pay,
      cash,
      stavka,
      limit,
      dayzToPay,
      osblug_pay,
      url_images,
    } = req.body;
    const cardcrd = new CreditCrd({
      id_bank: id_bank,
      name_bank: name_bank,
      name_card: name_card,
      srok: srok,
      About: About,
      pay_system: pay_system,
      sms_pay: sms_pay,
      cash: cash,
      stavka: stavka,
      limit: limit,
      dayzToPay: dayzToPay,
      osblug_pay: osblug_pay,
      url_images: url_images,
    });

    await cardcrd.save();

    res.status(201).json({ cardcrd });
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});
//удалить кредитную карту
router.delete(
  "/admin/creditcrd/delete/:id",
  //по url id и удаляю
  async (req, res) => {
    try {
      //беру id банка из url
      const { id } = req.params;
      //чекаю сущесвует ли такой объект в бд
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`Такого банка не сущесвует`);

      await CreditCrd.findByIdAndDelete(id);

      res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);
//обновить кредитную карту
router.patch("/admin/creditcrd/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_bank,
      name_bank,
      name_card,
      About,
      srok,
      pay_system,
      sms_pay,
      cash,
      stavka,
      limit,
      dayzToPay,
      osblug_pay,
      url_images,
    } = req.body;
    const upd = {
      id_bank,
      name_bank,
      name_card,
      About,
      srok,
      pay_system,
      sms_pay,
      cash,
      stavka,
      limit,
      dayzToPay,
      osblug_pay,
      url_images,
    };
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Такого банка не сущесвует`);
    let data = await CreditCrd.findByIdAndUpdate(id, upd, { new: true });
    res.status(201).json(data);
  } catch (err) {
    return res.status(err.message);
  }
});

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
      return res.status(500).json({ message: err.message });
    }
  }
);
//обновить банк
router.patch("/admin/bank/update/:id", async (req, res) => {
  try {
    const { name_bank, license, url, phone_number, url_images, About } =
      req.body;
    const id = req.params.id;
    const upd = {
      name_bank,
      license,
      url,
      phone_number,
      url_images,
      About,
    };

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Такого банка не сущесвует`);
    let snap = await Bank.findByIdAndUpdate(id, upd, { new: true });

    res.status(201).json(snap);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
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
      await CreditCrd.findOneAndDelete(id);
      await Debet.findOneAndDelete(id);

      res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);

//получить все новости
router.get("/admin/news/get", async (req, res) => {
  try {
    const getNews = await News.find();
    res.status(201).json(getNews);
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});
// создать новость
router.post("/admin/news/create", async (req, res) => {
  try {
    const { Title, Text, Date, title_image } = req.body;
    const news = new News({
      Title: Title,
      Text: Text,
      Date: Date,
      title_image: title_image,
    });

    await news.save();

    res.status(201).json({ news });
  } catch (err) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});
//удалить новость
router.delete(
  "/admin/news/delete/:id",
  //по url id и удаляю
  async (req, res) => {
    try {
      //беру id банка из url
      const { id } = req.params;
      //чекаю сущесвует ли такой объект в бд
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`Такой новости не сущесвует`);

      await News.findByIdAndDelete(id);

      res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);
//обновить новость
router.patch("/admin/news/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Text, Date, title_image } = req.body;
    const upd = {
  
      Title,
      Text,
      Date,
      title_image,
    };
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Такого банка не сущесвует`);
    let data = await News.findByIdAndUpdate(id, upd, { new: true });
    res.status(201).json(data);
  } catch (err) {
    return res.status(err.message);
  }
});

module.exports = router;
