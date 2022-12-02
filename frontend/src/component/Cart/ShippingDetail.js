import React, {Fragment,useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { City, Country, State } from "country-state-city";
import "./ShippingDetail.css"
import {BsHouseDoor, BsTelephone, BsSignpost2, BsPinMap, BsPerson} from "react-icons/bs"
import {FaCity} from "react-icons/fa"
import {AiOutlineMail} from "react-icons/ai"


const ShippingDetail = () => {

     
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address:"",
    city:"",
    state:"",
    phoneNo:""
});

  const { name, email, address, city, state, phoneNo } = shippingInfo;

  const DataChange = (e) => {
   
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  
};
    // const { shippingInfo } = useSelector((state) => state.cart);
    // const shippingInfo={
    //     address:"This is address",
    //     city:"This is city",
    //     state:"This is state",
    //     phoneNo:"3434535",
    //     email:"Mahum@gdfg.com",
    //     name:"Mahum"
    //   }
    // const[name,setName]=useState()
    // const[email,setEmail]=useState()  
    // const [address, setAddress] = useState();
    // const [city, setCity] = useState();
    // const [state, setState] = useState();
    // const [phoneNo, setPhoneNo] = useState();

    let navigate = useNavigate();

    const addShipDetail=(shippingInfo)=>{
      
            localStorage.setItem("shipDetail", JSON.stringify(shippingInfo))
    }

    const shippingSubmit = (e) => {
        e.preventDefault();
         if (phoneNo.length < 11 || phoneNo.length > 11) {
          console.warn("Please enter a valid phone number");
          return;
        }
        console.warn("ship submit info ")
        console.warn(shippingInfo)
        
       //store shipping info in local storage 
       addShipDetail(shippingInfo)
       //this is setting shipping info in const of variable of ShippingDetail.js 
     //  getShipInfo({shippingInfo})


        navigate("/ConfirmOrder")

      };
  
  return (
    <Fragment>
  

    <div className="shippingContainer">
      <div className="shippingBox">
        <h2 className="shippingHeading">Shipping Details</h2>

        <form
          className="shippingForm"
        //   encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
            
          <div>
            <BsPerson />
            <input
              type="text"
              placeholder="Full Name"
              required
              name="name"
              value={name}
              onChange={DataChange}

            />
          </div>
          <div>
            <AiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={DataChange}
            />
          </div>
          <div>
            <BsHouseDoor />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              name="address"
              onChange={DataChange}
            />
          </div>

        

          {/* <div> */}
            {/* <PinDropIcon /> */}
            {/* <input
              type="number"
              placeholder="Postal Code"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div> */}

          <div>
            <BsTelephone />
            <input
              type="text"
              placeholder="Phone Number"
              required
              
              value={phoneNo}
              name="phoneNo"
              onChange={DataChange}
              size="11"
            />
          </div>

            <div>
              <BsSignpost2 />

              <select
                required
                value={state}
                name="state"
                onChange={DataChange}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("PK").map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  )
                  )}
              </select>
            </div>
         {/* )} */}
{state && (
            <div>
              <FaCity />

              <select
                required
                value={city}
                name="city"
                onChange={DataChange}
              >
                <option value="">City</option>
                {City &&
                  City.getCitiesOfState("PK",state).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <input
            type="submit"
            value="Continue"
            className="shippingBtn"
            // disabled={state ? false : true}
          />
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default ShippingDetail