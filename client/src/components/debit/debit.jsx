import { Button } from "antd";
import React from "react";
import clas from "./debit.module.scss";
import logoalf from "./../../images/alfa.webp";
let Debit = (props) => {
  return (
    <div className={clas.Main}>
      <div className={clas.blockcards}>
        <div className={clas.card}>
          <h2 className={clas.NameCard}>card name</h2>
          <div className={clas.cardshortinfo}>
            <div className={clas.logocardbox}>
              <img src={logoalf} alt="" className={clas.logocardbox_item} />
            </div>
            <div className={clas.info}>
              <ul className={clas.smallinfo}>
                <li className={clas.smallinfo_item}>инфа</li>
                <li className={clas.smallinfo_item}>инфа</li>
                <li className={clas.smallinfo_item}>инфа</li>
                <li className={clas.smallinfo_item}>инфа</li>
              </ul>
              <Button type="primary">Подробнее</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debit;
