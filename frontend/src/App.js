import Header from './component/layout/Header/Header.js'
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import webfont from 'webfontloader'
import React from 'react';
import Footer from './component/layout/Footer/Footer.js'
import Home from "./component/Home/Home";



function App() {

  //To use fonts from google, installed webfontloader
  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Inria Sans","Roboto"]
      }
    })
  },[])


  return (
    <Router> 
      <Header/>
      <Home/>
      {/* <Route path="/" component={<Home />} /> */}
      {/* <Route exact path="/" component={Home} /> */}
      <Footer/> 
    </Router>

  );
}

export default App;
