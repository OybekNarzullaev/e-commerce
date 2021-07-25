import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "../headers/icon/menu.svg";
import Close from "../headers/icon/close.svg";
import Cart from "../headers/icon/cart.svg";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get("user/logout");
    localStorage.clear();
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Maxsulot qo'shish</Link>
        </li>
        <li>
          <Link to="category">Kategoriyalar</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">Tarix</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            chiqish
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30"></img>
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Madinabonu"}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin ? "Maxsulotlar" : "Do'kon"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Kirish yoki hisob ochish</Link>
          </li>
        )}

        <li>
          <img src={Close} alt="" className="menu" width="30"></img>
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          {cart.length === 0 ? <p></p> : <span>{cart.length}</span>}
          <Link to="/cart">
            <img src={Cart} alt="/" width="30"></img>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
