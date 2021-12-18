import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import clas from "./header.module.scss";
import { Button, Dropdown, Menu } from "antd";

let Header = (props) => {
  const [isActive, setActive] = useState(false);

  const isMobile = () => {
    !isActive ? setActive(true) : setActive(false);
  };

  return (
    <div className={clas.Main}>
      <h1 className={clas.Logo}>
        <NavLink to="/">Shape.ru</NavLink>
      </h1>
      <ul className={isActive ? clas.activeMobile : clas.mainMenu}>
        <NavLink to="/" className={clas.mainMenu__item}>
          <Button shape="round"> Главная</Button>
        </NavLink>
        <NavLink to="/news" className={clas.mainMenu__item}>
          <Button shape="round"> Новости</Button>
        </NavLink>
        <Dropdown overlay={menu} shape="round" className={clas.mainMenu__item}>
          <Button>Карты</Button>
        </Dropdown>
        <NavLink to="/zaim" className={clas.mainMenu__item}>
          <Button shape="round">Займы</Button>
        </NavLink>

        {props.isAuth ? (
          <AuthRoutesLinks></AuthRoutesLinks>
        ) : (
          <NavLink to="/login" className={clas.mainMenu__item}>
            <Button type="primary" shape="round">
              Войти
            </Button>
          </NavLink>
        )}
      </ul>
      <label htmlFor="toggle" onClick={isMobile} className={clas.hamburgerbox}>
        <span
          className={
            clas.hamburger + " " + (isActive ? clas.activehamburger : "")
          }
        ></span>
      </label>
    </div>
  );
};
// дропдаун меню
const menu = (
  <Menu>
    <Menu.Item key="1">
      <NavLink to="/debit">Дебетовые</NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink to="/credit-card">Кредитные</NavLink>
    </Menu.Item>
  </Menu>
);

const AuthRoutesLinks = () => {
  return (
    <div>
      <NavLink to="/settings" className={clas.mainMenu__item}>
        <Button shape="round">Настройки</Button>
      </NavLink>
      <NavLink to="/logout" className={clas.mainMenu__item}>
        <Button shape="round">Выйти</Button>
      </NavLink>
    </div>
  );
};

export default Header;
