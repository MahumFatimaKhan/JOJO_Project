import React, { Fragment, useState, useEffect } from "react";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const ConfirmOrder = () => {

  const[cartItems,setCartItems]=useState([])
  const[shipInfo,setShipInfo]=useState(JSON.parse(localStorage.getItem("shipDetail")))

  const getCart=()=>{
    if(localStorage.getItem("cart")){
return JSON.parse(localStorage.getItem("cart"))
    }
    return []
   }

   
   let navigate = useNavigate();
   
const orderSubmit=async(e)=>{
  e.preventDefault();
  const info = {address : shipInfo.address , 
    city: shipInfo.city,  email : shipInfo.email,
    name :shipInfo.name ,  phone:shipInfo.phoneNo,  state :shipInfo.state};
      let array = [];
      
    for (let i =0 ; i<cartItems.length;i++){
    array[i] = {
        ...cartItems[i]
    }
  }
  
  
  const res = await fetch("http://localhost:3000/order/newOrder", {
    method: "POST",
    body: JSON.stringify({
      shippingInfo: info, orderDetails: array, subtotal, totalPrice
    }),
    headers: {
      "content-Type" : "application/json"
    },
    
  })
  
  const data = await res.json();
  console.warn(data)
  if(res.status=== 400 ||!data ){
    window.alert("Something went wrong, please try again");
    console.warn("Order not created");
  }else if(res.status===200 || res.status===201){
    window.alert("Order has been placed");
    console.log("Order has been placed");
    (localStorage.removeItem("shipDetail"))
    (localStorage.removeItem("cart"))
    navigate("/")
  

  }
  else {
    window.alert("Something went wrong, please try again");
    console.warn("Order not created");
  }
}

   const getShipInfo=()=>{
    if(localStorage.getItem("shipDetail")){
      return JSON.parse(localStorage.getItem("shipDetail"))
          }
          return []
   }

   
 
    useEffect(()=>{
      setCartItems(getCart()) 
      console.warn(cartItems)
      console.warn(shipInfo)
    },[],{})

  
   const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 10000 ? 50 : 0;

  const totalPrice = subtotal  + shippingCharges;

  return (
    <Fragment>
    <div className="confirmOrderPage">
      <div>
        <div className="confirmshippingArea">
          <h2>Shipping Info</h2>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Name:</p>
              <span>{shipInfo.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shipInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{ `${shipInfo["address"]}, ${shipInfo.city}, ${shipInfo.state}, Pakistan`}</span>
            </div>
          </div>
        </div>
        <div className="confirmCartItems">
          <h2>Your Cart Items:</h2>
          <div className="confirmCartItemsContainer">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  <span>
                    {item.quantity} X Rs. {item.price} ={" "}
                    <b>Rs. {item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <div className="orderSummary">
          <h2>Order Summery</h2>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>Rs. {subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>Rs. {shippingCharges}</span>
            </div>
            
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>Rs. {totalPrice}</span>
          </div>

          <button onClick={orderSubmit}>Confirm Order</button>
        </div>
      </div>
    </div>
  </Fragment>
  )
}

export default ConfirmOrder
