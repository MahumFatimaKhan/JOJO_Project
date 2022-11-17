import React from 'react'
import './Footer.css'
import facebook from "../../../images/facebook.png";
import instagram from "../../../images/instagram.png";
import jojo from "../../../images/jojo.png";

const Footer = () => {
  return (
    <footer id="Footer" className="Footer">
        <div className="First">
 
        <img src={jojo} alt="JOJO" />
        </div>
        <div className="Second">
            <h4>ABOUT US</h4>
            <p>
            We are an online store that is
            loved by the mases. We started our
            work in August 2022 and now we are
            a massive family of more than 40k 
            followers on Instagram. We aim to
            provide our customers with best
            quality products.
            </p>
        </div>
        <div className="Third">
            <h4>CONTACT US</h4>
            <p>sales@jojo.com</p>
            <p>033567812333</p>
        </div>
        <div className="Fourth">
            <h4>SOCIAL</h4>
            <img src={facebook} alt="Facebook" />
        <img src={instagram} alt="Instagram" />
            {/* <a href="https://www.instagram.com/aloaofficial/?hl=en">Instagram</a>
            <a href="https://www.facebook.com/TheAloa/">Facebook</a>   */}


        </div>
    </footer>
  )
}
export default Footer