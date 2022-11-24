import React from 'react'
import {Link} from "react-router-dom"
import { generatePublicUrl } from '../../urlConfig'

const CategoryCard = ({category}) => {
  return (
    
    <Link className="categorycard" to={category._id}>
        <img src={generatePublicUrl(category.categoryPicture)} />
        {/*  alt={category.name} */}
        <p>{category.name}</p>
        
    </Link>
  )
}


export default CategoryCard