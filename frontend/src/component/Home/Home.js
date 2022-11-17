import React, { Fragment, useEffect } from 'react'
import './Home.css'
import Product from './Product.js'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import { getProduct } from "../../actions/ProductAction"



//this is temporary
const product = {
  name: "product 11233",
  images: [{ url: "https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" }],
  price: 1250.3,
  _id: "thisisid"
}


const Home = () => {

  // const dispatch = useDispatch()

  // const {loading, error, products, } = useSelector(state => state.products)

  // useEffect(() => {
  //   dispatch(getProduct())
  // }, [dispatch])

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
      <div class="banner"> </div>
      <div class="Fresh-Arrival">
        <h2>FRESH ARRIVAL</h2>
        <p>Exclusive range of fresh articles, new products are added almost every other day.</p>
        <div class="container1">
          <MdChevronLeft onClick={slideLeft} size={40} />
          <div class="slider" id="slider">

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>
      <div class="Top-Selling">
        <h2>TOP SELLING</h2>
        <p>Get your hands on top selling designs. Almost 5000+ top selling articles.</p>
        <div class="container1">
          <MdChevronLeft onClick={slideLeft} size={40} />
          <div class="slider" id="slider">

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>
      <div class="Categories">
        <h2>CATEGORIES</h2>
        <div class="slider" id="slider">

          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />


        </div>
      </div>
    </Fragment>


  )
}

export default Home