import React, { Fragment, useEffect, useState, Context } from "react";
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel";
import axios from "axios"
import { useParams, Link , Navigate } from "react-router-dom";
import toast, {Toaster } from "react-hot-toast"
import { addToCartHandler } from "../Cart/Cart";
import { useLocation } from 'react-router-dom';

//this is temporary
const products={
    name:"product 11233",
    images:[{url:"https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"}],
    price:1250.3,
    _id:"thisisid",
    description:"This is the Description",
    stock:120
  }



export const ProductDetails = (props) => {
  const location = useLocation()
  const products=location.state.pItems
  const id=useParams().id;
 // const[product,setProduct]=useState();
  const[navigate,setNavigate]=useState(false)

  // useEffect(()=>{
  //  fetchDetails()
  //  })

  // const fetchDetails=async ()=> {
  //   let res = await axios.get(`http://localhost:3000/product/getProductDetails/${id}`);
  //   let data = res.data;
  //   setProduct(data)
  //   // console.warn(product)

 
  // // await fetch(`http://localhost:3000/product/getProductDetails/${id}`).then(res=>{
  // //  res.json()
  // //  setProduct(res)  })
  //  console.warn(product)
  //  }

    const [quantity, setQuantity] = useState(1);
    
  const increaseQuantity = () => {
 //   if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCart=()=>{
    addToCartHandler(products,quantity
    //   ,()=> {
    //   setNavigate(true)
    // }
    )
  }

  const shouldNavigate =navigate =>{
    if(navigate) {
      return <Navigate to="/cart" />
    }
  }

    return(
      <Fragment>
<Toaster/>
  
      <div className="ProductDetails">
      

        <div>
      
         
                <img
                  className="CarouselImage"
                 
                  src={products.productPictures}
                  alt={products.name}
                />
               
        
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{products.name}</h2>
          
          </div>
         
          <div className="detailsBlock-3">
            <h2>{`Rs. ${products.price}`}</h2>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={products.stock < 1 ? true : false}
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                {products.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{products.description}</p>
          </div>

        
        </div>
      </div>

     
       
{/* 
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )} */}
    </Fragment>
    );
}

export default ProductDetails;