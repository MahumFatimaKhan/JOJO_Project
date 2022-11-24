import React from 'react'
import './Header.css'
import jojo from "../../../images/jojo.png";
import { FaBars } from "react-icons/fa";
import {FiSearch,FiShoppingCart, FiUser} from "react-icons/fi"

// const options = {
//   ProfileIconUrl:"/login"
// }

const Header = () => {
  return (
    <header id="Header">
      <div className="logo"><img src={jojo} alt="jojo" /></div> 
        <nav className="nav_links">
                <a href="/">HOME</a>
                <a href="/products/">HAIR ACCESSORIES</a>
                <a href="/earrings">EARRINGS</a>
                <a href="/rings">RINGS</a>
                <a href="/bracelets">BRACELETS</a>
                <a href="/necklaces">NECKLACES</a>
        </nav>
        <div className="icons">
                <i><FaBars id="menu-bar"/></i>
                <i><FiSearch id="search-bar"/></i>
                <a className="user" href='/login'><FiUser id="user"/></a>
                <a className="cart" href="a"><FiShoppingCart id="shopping-cart"/></a>

        </div>
     
       
    </header>
  )
}

export default Header