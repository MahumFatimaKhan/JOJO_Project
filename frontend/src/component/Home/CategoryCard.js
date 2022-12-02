import React from 'react'
import { Link } from "react-router-dom"


const CategoryCard = ({ category }) => {
  return (

    <Link className="categorycard" to={"/category/" + category._id}>
      <img src={category.categoryPicture} alt={category.name} />
      {/*  alt={category.name} */}
      <p>{category.name}</p>

    </Link>
  )
}

export default CategoryCard