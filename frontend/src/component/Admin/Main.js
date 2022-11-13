import React from 'react'
import Sidebar from './Sidebar.js'
import "./Main.css"
import logo from "../../images/logo-transparent.png";

const Main = () => {
  return (
    <div className='main'>
        <Sidebar/>
        <div className='mainContainer'>
            <img src={logo} alt="jojo"/>
            <h6>Welcome back to Admin Panel!</h6>
        </div>
    </div>
  )
}

export default Main