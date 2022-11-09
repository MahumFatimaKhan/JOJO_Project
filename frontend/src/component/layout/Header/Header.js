import React from 'react'
import './Header.css'
import cart from "../../../images/cart.png";
import profile from "../../../images/profile.png";
import search from "../../../images/search.png";
import jojo from "../../../images/jojo.png";

const Header = () => {
  return (
    <header id="Header">
      <div class="logo"><img src={jojo} alt="jojo" /></div> 
        <ul class="nav_links">
        <li><a href="a">HOME</a></li>
                <li><a href="a">HAIR ACCESSORIES</a></li>
                <li><a href="a">EARRINGS</a></li>
                <li><a href="a">RINGS</a></li>
                <li><a href="a">BRACELETS</a></li>
                <li><a href="a">NECKLACES</a></li>
        </ul>
     
        <a class="search" href="a"><img src={search} alt="search" /></a>
        <a class="profile" href="a"><img src={profile} alt="profile" /></a> 
        <a class="cart" href='a'><img src={cart} alt="cart" /></a> 
      
        {/* <div class="search"><a href="a"><img src={search} alt="search" /></a></div> 
        <div class="profile"><a href="a"><img src={profile} alt="profile" /></a></div> 
        <div class="cart"><a href='a'><img src={cart} alt="cart" /></a></div> 
         */}
     {/* <div class="logo">LOGO</div> */}
               {/* <div class="logo"><img src={jojo} alt="JOJO" /></div> */}
       {/* <div class="nav_links">
        <nav>
            <ul >
             
            </ul>
            <img class="search" src={search} alt="search"/>
            <img class="profile" src={profile} alt="profile"/>
            <img class="cart" src={cart} alt="cart"/>
        </nav>
        </div> */}
    </header>
  )
}

export default Header