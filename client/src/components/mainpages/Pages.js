import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/NotFound/NotFound";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Products}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="*" exact component={NotFound}></Route>
    </Switch>
  );
}

export default Pages;
