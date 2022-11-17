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
                <a href="a">HOME</a>
                <a href="a">HAIR ACCESSORIES</a>
                <a href="a">EARRINGS</a>
                <a href="a">RINGS</a>
                <a href="a">BRACELETS</a>
                <a href="a">NECKLACES</a>
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