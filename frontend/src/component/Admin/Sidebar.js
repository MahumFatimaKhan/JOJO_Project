import React from "react";
import "./Sidebar.css";
import logo from "../../images/jojo.png";
import { Link } from "react-router-dom";
import TreeView from 'react-treeview/react-treeview.css'
import "react-treeview"
import { BiUser, BiCategory, BiPlus, BiBook } from "react-icons/bi"
import { BsBoxSeam, BsClipboard } from "react-icons/bs"


const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to="/admin/main">
        <img src={logo} alt="Jojo" />
      </Link>

      <Link to="/admin/category">
        <p>
          <BiCategory /> Category
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <BiBook />
          All Products
        </p>
      </Link>
      <Link to="/admin/addproducts">
        <p>
          <BiPlus />
          Create Products
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <BsClipboard />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <BiUser /> Users
        </p>
      </Link>

    </div>
  );
};

export default Sidebar;