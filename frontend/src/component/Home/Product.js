import React from 'react'
import {Link} from "react-router-dom"


const Product = ({product}) => {
  return (
    <Link class="productcard" to={product._id}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <span>{"Rs. " + product.price}</span>
        
    </Link>
  )
}

  

export default Product