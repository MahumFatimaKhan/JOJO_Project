import React from 'react'
import './Header.css'
import jojo from "../../../images/jojo.png";
import { FaBars } from "react-icons/fa";
import {FiSearch,FiShoppingCart, FiUser} from "react-icons/fi"

const Header = () => {
  return (
    <header id="Header">
      <div class="logo"><img src={jojo} alt="jojo" /></div> 
        <nav class="nav_links">
                <a href="a">HOME</a>
                <a href="a">HAIR ACCESSORIES</a>
                <a href="a">EARRINGS</a>
                <a href="a">RINGS</a>
                <a href="a">BRACELETS</a>
                <a href="a">NECKLACES</a>
        </nav>
        <div class="icons">
                <i><FaBars id="menu-bar"/></i>
                <i><FiSearch id="search-bar"/></i>
                <a class="user" href='a'><FiUser id="user"/></a>
                <a class="cart" href="a"><FiShoppingCart id="shopping-cart"/></a>

        </div>
     
       
    </header>
  )
}

export default Header