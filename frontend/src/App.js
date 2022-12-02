import Header from './component/layout/Header/Header.js'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import webfont from 'webfontloader'
import React from 'react'
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home"
import { LoginRegister } from './component/User/LoginRegister.js'
import RequireAuth from './Context/RequireAuth.js'
import Main from './component/Admin/Main'
import ProductList from './component/Admin/ProductList'
import CreateProduct from './component/Admin/CreateProduct.js'



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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route element={<RequireAuth />} >
          <Route path="/admin/main" element={<Main />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/addproducts" element={<CreateProduct />} />
        </Route>
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;
