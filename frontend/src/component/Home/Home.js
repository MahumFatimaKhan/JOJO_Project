import React, { Fragment } from 'react'
import './Home.css'
import Product from './Product.js'

//this is temporary
const product={
  name:"product 1",
  images:[{url:"https://blingspot.pk/collections/hair-accessories/products/turban-knot-headband?variant=37958368919740#6235368816828"}],
  price:1250.3,
  _id:"thisisid"
}

const Home = () => {
  return (
   
     <Fragment>
        <div class="banner"> </div>
       <div class="Fresh-Arrival">
        <h2>FRESH ARRIVAL</h2>
        <p>Exclusive range of fresh articles, new products are added almost every other day.</p>
        <div class="container" id="container">
          <Product product={product}/>
        </div>
        </div>
        <div class="Top-Selling">
        <h2>TOP SELLING</h2>
        <p>Get your hands on top selling designs. Almost 5000+ top selling articles.</p>
        </div>
        <div class="Categories">
        <h2>CATEGORIES</h2>
        </div>
        </Fragment>

    
  )
}

export default Home