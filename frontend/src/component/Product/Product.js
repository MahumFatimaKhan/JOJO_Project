
import React, { Fragment, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import './Product.css'

//this is temporary
const product={
    name:"product 11233",
    images:[{url:"https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"}],
    price:1250.3,
    _id:"thisisid"
  }


export const Product = () => {

   const {keyword} = useParams();
   const[products,setProducts]=useState([])

   useEffect(()=>{
        getProductbyCategory();
   },[])

   const getProductbyCategory=async()=>{
   // let results=await fetch("http://localhost:3000/product/getProductByCategory/?categoryID=${category}")
   let results=await fetch("http://localhost:3000/product/getProductByCategory/637dcfa8bad07598575747ef")
    results=await results.json();
    setProducts(results)
   }
   
   console.warn(products)

  // if(props.location.query)


    return(
<Fragment>
    <div className="AllProducts">
        <div className="cards" id="cards">
        {Array.isArray(products)
        ? products.map((element) => (
                <ProductCard key={element._id} product={element} />
              )) :null}
              
           <ProductCard product={product}/> 
           <ProductCard product={product}/> 
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/>
          <ProductCard product={product}/> 
        </div>
    </div>
    {/* {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )} */}
</Fragment>
    );
}

export default Product;