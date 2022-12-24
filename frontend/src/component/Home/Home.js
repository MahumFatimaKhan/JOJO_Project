import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import ProductCard from './ProductCard.js'
import CategoryCard from './CategoryCard.js'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import { getCategories } from '../../Actions/CategoryAction'

//this is temporary
const product = {
  name: "product 11233",
  images: [{ url: "https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" }],
  price: 1250.3,
  _id: "thisisid"
}

// const category={
//   name:"category 11233",
//   images:[{url:"https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"}],
//   _id:"thisisid"
// }




const Home = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categories)

  // let [categories, setCategories] = useState([])

  useEffect(() => {
    //  getCategory();
    dispatch(getCategories())
  }, [dispatch])

  // const getCategory = async () => {
  //   let results = await fetch("http://localhost:3000/category/getCategories")
  //   results = await results.json();
  //   setCategories(results)
  // }

  // console.log("HOME")
  // console.log(categories)


  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 300
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 300
  };

  return (

    <Fragment>
      <div className="banner"> </div>
      <div className="Fresh-Arrival">
        <h2>FRESH ARRIVAL</h2>
        <p>Exclusive range of fresh articles, new products are added almost every other day.</p>
        <div className="container1">
          <MdChevronLeft onClick={slideLeft} size={40} />
          <div className="slider" id="slider">
          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>
      <div className="Top-Selling">
        <h2>TOP SELLING</h2>
        <p>Get your hands on top selling designs. Almost 5000+ top selling articles.</p>
        <div className="container1">
          <MdChevronLeft onClick={slideLeft} size={40} />
          <div className="slider" id="slider">
          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>
      <div className="Categories">
        <h2>CATEGORIES</h2>
        <div className="slider" id="slider">
          {
            categories.map((categories) => (
              <CategoryCard key={categories._id} category={categories} />
            ))
          }
        </div>
      </div>
    </Fragment>


  )
}

export default Home