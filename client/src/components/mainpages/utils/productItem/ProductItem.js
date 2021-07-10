import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div className="product-cart">
      <img src={product.images.url} alt="" />
      <div className="product-box">
        <h2 title={product.title}>{product.title}</h2>
        <span>{product.price} so'm</span>
        <p>{product.description}</p>
      </div>
      <div className="row_btn">
        <Link id="btn_buy" to="#!">
          xarid
        </Link>
        <Link id="btn_view" to={`/detail/${product._id}`}>
          ko'rish
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
