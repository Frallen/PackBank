import React, { useState } from "react";
import clas from "./admin.module.scss";
import { Menu } from "antd";
import { BankOutlined, CreditCardOutlined } from "@ant-design/icons";
import BankForm from "./miniforms/bank.form";
import { NavLink } from "react-router-dom";
import DebetCardForm from "./miniforms/debetcard.form";
import CreditCardForm from "./miniforms/creditcard.form";

//хз зачем хуйня антд
const { SubMenu } = Menu;

let Admin = (props) => {
  const [isShow, setShow] = useState(null);

  //Добавляю в useState число по которому определяю что рендерить
  let ShowsAPP = () => {
    switch (isShow) {
      case 1:
        return <BankForm {...props}></BankForm>;
      case 2:
        return <DebetCardForm {...props}></DebetCardForm>;
      case 3:
        return <CreditCardForm {...props}></CreditCardForm>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className={clas.Main}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className={clas.block_Menu}
      >
        <Menu.ItemGroup key="b1">
          <Menu.Item key="1">
            <NavLink to="/logout" className={clas.mainMenu__item}>
              Выйти
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>

        <SubMenu key="z1" icon={<BankOutlined />} title="Банки">
          <Menu.ItemGroup key="b1">
            <Menu.Item key="b1" onClick={() => setShow(1)}>
              Список банков
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="z2" icon={<CreditCardOutlined />} title="Карты">
          <Menu.ItemGroup key="c1" title="Дебетовые">
            <Menu.Item key="c1" onClick={() => setShow(2)}>
              Список дебетовых
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="c2" title="Кредитные">
            <Menu.Item key="c3" onClick={() => setShow(3)}>
              Список кредитных
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>

      <div className={clas.tableBlock}>{ShowsAPP()}</div>
    </div>
  );
};

export default Admin;
