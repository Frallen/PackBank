const { Router } = require("express");
const Bank = require("./../models/bank");
const Debet = require("./../models/cards");
const { check, validationResult } = require("express-validator");
const router = Router();
//получить дебетовые карты
router.get("/admin/debet/", async(req,res)=>{
  try{
    const getdebet=await Debet.find()
    res.status(201).json(getdebet)
  }catch(err){
    res.status(500).json({message:"Что-то пошло не так"})
  }
})
// создать дебетовую карту
router.post("/admin/debet/", async (req, res) => {
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

    res.status(201).json({ message: "Карта успешно создана" });
  } catch (err) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

//добавляю банк
router.post(
  "/admin/bank/",

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

      res.status(201).json({ message: "Банк успешно создан." });
    } catch (err) {
      //при ошибка неизвестных отсылаю 500 ошибку
      return res.status(500).json(err.message);
    }
  }
);

//Беру все записи о банках
router.get("/admin/bank/", async (req, res) => {
  try {
    const banks = await Bank.find();
    res.status(201).json(banks);
  } catch (err) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
});
//удалить банк
router.delete(
  "/admin/bank/",

  async (req, res) => {
    try {
      const { id } = req.body;

      let snap = await Bank.findOneAndDelete({ id });

      if (!snap) {
        res.status(204).json({ message: "Запись не была найдена" });
      }
      const banks = await Bank.find();
      res.status(200).json({ message: "Запись о банке успешно удалена" });
    } catch (err) {
      res.status(500).json({ message: "Что-то пошло не так." });
    }
  }
);

module.exports = router;
