import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, removeFromCart }) => {
  return (
    <div className="CartItemCard">
      <img src={item.productPicture} alt="item image" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs. ${item.price}`}</span>
        <p onClick={() => removeFromCart(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;