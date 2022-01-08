import React from "react";
import clas from "./home.module.scss";
import { NavLink } from "react-router-dom";
let Home = () => {
  return (
    <div className={clas.home}>
      <h1 className={clas.home_title}>Подберем и найдем лучшее предложение</h1>
      <div className={clas.home_first}>
        <div className={clas.home_first_item}>
          <h3 className={clas.home_first_item_title}>Побор кредита</h3>
          <p className={clas.home_first_item_text}>
            Подберём банки с высокой вероятностью одобрения
          </p>
          <NavLink to="/credit" className={clas.home_first_item_link}>Подобрать</NavLink>
        </div>
        <div className={clas.home_first_item}>
          <h3 className={clas.home_first_item_title}>Подбор карты</h3>
          <p className={clas.home_first_item_text}>
            Подберём дебетову или кредитную карту
          </p>
          <div className={clas.home_first_item_spec}>
            <NavLink to="/debit" className={clas.home_first_item_link}>Дебетовые</NavLink>
            <NavLink to="/credit-card" className={clas.home_first_item_link}>Кредитные</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
