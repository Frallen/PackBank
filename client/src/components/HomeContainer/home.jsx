import React from "react";
import clas from "./home.module.less";
import card from "./img/card.svg"

let Home = () => {
  return (
    <div className={clas.home}>
    <div className={clas.home__heading}>
      <div className={clas.home__heading_item}><img src={card} alt="" /></div>
      <div className={clas.home__heading_item}>
        <h1>Получие имеено ту карту которая вам нужна</h1>
        <p>Поможем найти лучшее прежложение от банка</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
