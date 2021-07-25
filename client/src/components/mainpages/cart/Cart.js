import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import Loading from "../utils/loading/Loading";

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  if (cart.length === 0) {
    return (
      // <h1 style={{ textAlign: "center", fontSize: "5rem" }}>Savat bo'sh</h1>
      <Loading></Loading>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart">
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3>{product.price * product.quantity} so'm</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button className="plus"> - </button>
              <span>{product.quantity}</span>
              <button className="minus"> + </button>
            </div>
            <div className="delete">X</div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Jami: {total} so'm</h3>
        <Link to="#!">To'lov</Link>
      </div>
    </div>
  );
}

export default Cart;
