import Header from './component/layout/Header/Header.js'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import webfont from 'webfontloader'
import React from 'react';
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home";
import { LoginRegister } from './component/User/LoginRegister.js';
import Main from "./component/Admin/Main.js"
import Product from './component/Product/Product.js';



function App() {

  //To use fonts from google, installed webfontloader
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Inria Sans", "Roboto"]
      }
    })
  }, [])


  return (

    <Router>
      <Header/>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        {/* <Route path="/hairaccessories" element={<Product/>} /> */}
        <Route path="/products/" element={<Product/>}/>
      
        {/* will have to change route of admin/main to ProtectedRoute later */}
        <Route path="/admin/main" element={<Main />} />
      </Routes>
      <Footer />
    </Router>



  );
}

export default App;
