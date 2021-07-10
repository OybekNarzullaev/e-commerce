import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "../headers/icon/menu.svg";
import Close from "../headers/icon/close.svg";
import Cart from "../headers/icon/cart.svg";

function Header() {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30"></img>
      </div>
      <div className="logo">
        <h1>
          <Link to="/">BISMILLAH</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Maxsulotlar</Link>
        </li>
        <li>
          <Link to="/login">Kirish yoki hisob ochish</Link>
        </li>
        <li>
          <img src={Close} alt="" className="menu" width="30"></img>
        </li>
      </ul>
      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={Cart} alt="/" width="30"></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
