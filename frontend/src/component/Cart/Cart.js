import "./Cart.css"
import CartItemCard from "./CartItemCard";
//import { Typography } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast"
import { MdOutlineRemoveShoppingCart } from "react-icons/md"
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { stepOne } from "./ShippingDetail";

export const itemTotal = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart")).length
  }
  return 0
}


export const addToCartHandler = (product, quantity) => {
  const newProduct = product;
  newProduct["quantity"] = quantity;
  const cart = localStorage.getItem('cart')
  const cartItems = cart ? JSON.parse(cart) : []
  const checkItem = cartItems.find(item => item._id === newProduct._id)
  if (!checkItem) {
    cartItems.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cartItems))
    // next();

  } else {
    toast.error(`${newProduct.name} is already in cart`)
    return;
  }
}


export const Cart = ({ cart }) => {

  // const[count,setCount]=useState(product.quantity)
  const [cartItems, setCartItems] = useState([])

  const getCart = () => {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    }
    return []
  }

  let navigate = useNavigate();


  const increaseQuantity = (product, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    //addToCartHandler(product, newQty);
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    // dispatch(addItemsToCart(id, newQty));
  };


  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const removeFromCart = async ({ productid }) => {

  }



  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdOutlineRemoveShoppingCart />

          <h1>No Product in Your Cart</h1>
          <Link to="/">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} removeFromCart={removeFromCart} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Rs. ${item.price * item.quantity
                    }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`Rs. ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button
                  onClick={() => {
                    navigate(`/shippingDetail`)
                  }}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart