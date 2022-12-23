import React, {  useEffect,useState } from 'react'
import './Header.css'
import jojo from "../../../images/jojo.png";
import { FaBars } from "react-icons/fa";
import {FiSearch,FiShoppingCart, FiUser} from "react-icons/fi"
import { itemTotal } from '../../Cart/Cart';



const Header = () => {
  let[categories,setCategories]=useState([])

useEffect(()=>{
 // getFreshArrival();
     getCategory();
     console.warn("cat "+ categories)

},[])

  const getCategory=async()=>{
    let results=await fetch("http://localhost:3000/category/getCategories")
     results=await results.json();
     
     setCategories(results)
    }

  return (
    <header id="Header">
      <div className="logo"><img src={jojo} alt="jojo" /></div> 
        <nav className="nav_links">
                <a href="/">HOME</a>
                {/* {
            categories.map((categories) => (
              <a href={"/category/"+ categories._id}>categories.name</a>
             ))
          } */}
                <a href="/category/637dcfa8bad07598575747ef">HAIR ACCESSORIES</a>
                <a href="/category/637dcff7bad07598575747f8">EARRINGS</a>
                <a href="/category/637dcfc5bad07598575747f2">RINGS</a>
                <a href="/category/636149af2cb62620317b29ce">BRACELETS</a>
                <a href="/category/637dcfdfbad07598575747f5">NECKLACES</a>
        </nav>
        <div className="icons">
                <i><FaBars id="menu-bar"/></i>
                <i><FiSearch id="search-bar"/></i>
                <a className="user" href='/login'><FiUser id="user"/></a>
                <a className="cart" href="/cart"><FiShoppingCart id="shopping-cart"/>
                <span>{itemTotal()}</span></a>

        </div>
     
       </header>
  )
}

export default Header