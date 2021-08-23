import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import PayPal from "./PayPal";
import axios from "axios";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);

    addToCart();
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);

    addToCart();
  };

  const removeProduct = (id) => {
    if (window.confirm("Bu maxsulotni olib tashlamoqchimisiz?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    }
    setCart([...cart]);

    addToCart();
  };

  const tranSuccess = async () => {
    await axios.post(
      "/api/payment",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart();
    alert("Muvafaqqiyatli.");
  };
  if (cart.length === 0) {
    return (
      <h1 style={{ textAlign: "center", fontSize: "5rem" }}>Savat bo'sh</h1>
      //<Loading></Loading>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3>{product.price * product.quantity} so'm</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button className="minus" onClick={() => decrement(product._id)}>
                {" "}
                -{" "}
              </button>
              <span>{product.quantity}</span>
              <button className="plus" onClick={() => increment(product._id)}>
                {" "}
                +{" "}
              </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Jami: {total} so'm</h3>
        <Link to="#!">
          <button onClick={tranSuccess}>Buyurtma qilish</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
