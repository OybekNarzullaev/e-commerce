import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/NotFound/NotFound";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <Switch>
      <Route path="/" exact component={Products}></Route>
      <Route path="/detail/:id" exact component={DetailProduct}></Route>
      <Route
        path="/login"
        exact
        component={isLogged ? NotFound : Login}
      ></Route>
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      ></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="*" exact component={NotFound}></Route>
    </Switch>
  );
}

export default Pages;
