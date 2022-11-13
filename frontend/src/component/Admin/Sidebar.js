import React from "react";
import "./Sidebar.css";
import logo from "../../images/jojo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import {BiUser,BiCategory,BiPlus,BiBook} from "react-icons/bi"
import {BsBoxSeam,BsClipboard} from "react-icons/bs"
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import PeopleIcon from "@material-ui/icons/People";

//BsBoxSeam product
// BsClipboard orders
//BiUser user
//BiCategory category
// add product
//BiBook all product

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to="/">
        <img src={logo} alt="Jojo" />
      </Link>
      <Link to="/admin/category">
        <p>
          <BiCategory /> Category
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<BsBoxSeam />}
          defaultExpandIcon={<BsBoxSeam />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<BiBook />} />
            </Link>

            <Link to="/admin/addproduct">
              <TreeItem nodeId="3" label="Create" icon={<BiPlus />} />
            </Link>
          </TreeItem>
        </TreeView>
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