import React from 'react'
import { Link } from "react-router-dom"

import details from '../Product/ProductDetails'


const ProductCard = ({ pItems }) => {
  return (
    <Link className="productcard" to={"/category/products/" + pItems._id} state={{ pItems }} >
      {/* <img src={generatePublicUrl(product.productPictures.img)} alt={product.name}/>  */}
      <img src={pItems.productPictures} alt={pItems.name} />
      <p>{pItems.name}</p>
      <span>{"Rs. " + pItems.price}</span>

    </Link>
  )
}

export default ProductCard