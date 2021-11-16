const { Router } = require("express");
const User = require("./../models/user"); //вызываем схему пользователя
const { check, validationResult, Result } = require("express-validator"); //достаем чекер
const bcrypt = require("bcryptjs"); //библеотека шифрования для паролей
const jwt = require("jsonwebtoken"); //библекотека для авторизации
const config = require("config");
const router = Router();

router.post(
  "/registration/",
  [
    //чекаем это емейл?
    check("Email", "Не корректный email").isEmail().normalizeEmail(),
    //чекаем пароль есть ли он
    check("Password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  //асинхронная функция которая принимает реквест(запрос) и респонс(ответ)
  async (req, res) => {
    try {
      //валидируем входящие поля
      const errors = validationResult(req);

      //если в констате  есть ошибки / если errors не пустой
      if (!errors.isEmpty()) {
        return res.status(400).json({
          //передаю на фронт erros если есть ошибка в входных данных
          // преобразую в массив
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { Email, Password } = req.body;
      // ищем есть ли такой емейл в базе
      const user = await User.findOne({ Email });

      //создание пользователя
      if (user) {
        //если пользователь уже есть
        return res
          .status(400)
          .json({ message: "Такой пользователь уже зарегистрирован" });
      } else {
        //шифруем пароль от пидоров асинхронно
        const hashPass = await bcrypt.hash(Password, 10);
        //создаем пользователя
        const user = new User({ Email: Email, Password: hashPass });
        //сохраняем пользователя
        await user.save();
        // отвечаем с серва пользователь создан
        res.status(201).json({ message: "Пользователь создан" });
      }
    } catch (err) {
      //если чето чето сра сразу ошибку

      res.status(500).json(err.message);
    }
  }
);

router.post(
  "/login/",
  [
    //чекаем это емейл?
    check("Email", "Не корректный email").isEmail().normalizeEmail(),
    //чекаем пароль есть ли он
    check("Password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      //валидируем входящие поля
      const errors = validationResult(req);

      //если в констате  есть ошибки / если errors не пустой
      if (!errors.isEmpty()) {
        return res.status(400).json({
          //передаю на фронт erros если есть ошибка в входных данных
          // преобразую в массив
          errors: errors.array(),
          message: "Некорректные данные при авторизации",
        });
      }
      //Авторизация пользователя
      const { Email, Password } = req.body;
      // ищем есть ли такой емейл в базе
      const user = await User.findOne({ Email });
      //получаю пароль с фронта, потом из базы данных
    await bcrypt.compare(
        Password,
        user.Password,
        function (err, otvet) {
          if (err) {
            console.log(err);
          }
          if (otvet === true) {
            const token = jwt.sign(
              { userId: user.id },
              config.get("jwtSecret"),
              //внутренний параметр метода
              //время жинзни авторизационнго токена
              { expiresIn: "1h" }
            );
            //если пароли не совпадают
            res.json({ token, userId: user.id });
          } else {
            return res.status(400).json({ message: "неверный пароль" });
          }
        }
      );
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);


router.post(
  "/admin/",
 
  async (req, res) => {
    try {
      //валидируем входящие поля
      const errors = validationResult(req);

      //если в констате  есть ошибки / если errors не пустой
      if (!errors.isEmpty()) {
        return res.status(400).json({
          //передаю на фронт erros если есть ошибка в входных данных
          // преобразую в массив
          errors: errors.array(),
          message: "Некорректные данные при авторизации",
        });
      }
      //Авторизация пользователя
      const { Password } = req.body;
      // ищем есть ли такой емейл в базе
      const admin = await User.findOne({ Email:"ya.vlad7788@yandex.ru" });
      //получаю пароль с фронта, потом из базы данных
      await bcrypt.compare(
        Password,
        admin.Password,
        function (err, otvet) {
          if (err) {
            console.log(err);
          }
          if (otvet === true) {
            const token = jwt.sign(
              { userId: admin.id },
              config.get("jwtSecret"),
              //внутренний параметр метода
              //время жинзни авторизационнго токена
              { expiresIn: "1h" }
            );
            //если пароли не совпадают
            res.json({ token, userId: admin.id, isADMIN:admin._doc.isADMIN });
          } else {
            return res.status(400).json({ message: "неверный пароль" });
          }
        }
      );
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);



//экспортируем файл
module.exports = router;
