import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import ProductCard from './ProductCard.js'
import CategoryCard from './CategoryCard.js'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

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

  let [fresh, setFresh] = useState([])
  let [categories, setCategories] = useState([])

  useEffect(() => {
    // getFreshArrival();
    getCategory();

  }, [])

  // const getFreshArrival=async()=>{
  //   let results=await fetch("http://localhost:3000/product/getfreshArrival")
  //    results=await results.json();
  //    console.log(typeof results)
  //    const n;
  //    if(results.createdAt<)


  //    setCategories(results)
  //   }

  const getCategory = async () => {
    let results = await fetch("http://localhost:3000/category/getCategories")
    results = await results.json();
    console.log(typeof results)
    console.log("this is pic " + results.categoryPicture)

    setCategories(results)
  }

  console.warn(categories)


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
            {/*         
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          */}
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
            {/*         
        <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          */}
          </div>
          <MdChevronRight onClick={slideRight} size={40} />
        </div>
      </div>
      <div class="Categories">
        <h2>CATEGORIES</h2>
        <div class="slider" id="slider">

          {
            categories.map((categories) => (
              <CategoryCard key={categories._id} category={categories} />
            ))
          }

          {/* {
  Array.from(Object.entries(categories)).map((categories) => (
    <CategoryCard key={categories._id} category={categories} />
  ))
} */}

          {/* 
        {  categories.map((element,index)=>{
            <ul key={element}>
            <li>{index+1}</li>
            </ul>
          })
        } */}


          {/* {Array.from( (Object.entries(JSON.parse(this.categories.json)))).map((element) => (
                <CategoryCard key={element._id} category={element} />
              ))} */}

          {/* {Array.isArray(categories)
        ? categories.map((element) => (
                <CategoryCard key={element._id} category={element} />
              )) :null} */}
          {/* 
              {Object.values(categories).map((element) => (
                <CategoryCard key={element._id} category={element} />
              )) } */}
          {/* {  categories.map((element) => 
<Link className="categorycard" to={element._id}>
        <img src={element.images[0].url} alt={element.name}/>
        <p>{element.name}</p>
        
    </Link>
)} */}
          {/* <CategoryCard category={category}/>
        <CategoryCard category={category}/>
        <CategoryCard category={category}/>
        <CategoryCard category={category}/>
        <CategoryCard category={category}/> */}



        </div>
      </div>
    </Fragment>


  )
}

export default Home