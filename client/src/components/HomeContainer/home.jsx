import React, { useState } from "react";
import clas from "./home.module.scss";
import video from "./../../etc/card2.mp4";
let Home = () => {
  return (
    <div className={clas.Main}>
      <div className={clas.blocktext}>
        <h1 className={clas.Title}>Shape.ru </h1>
        <p className={clas.suptitle}> найдет, раскажет, поможет</p>
        <p className={clas.Text}>
          Ищете лучший банк? Условия? Лучший продукт или процент? Тогда Вам по
          адресу.
        </p>
      </div>
      <video loop muted autoPlay className={clas.blockVideo}>
        <source src={video} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default Home;
