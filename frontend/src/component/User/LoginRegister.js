import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginRegister.css";
import Loader from "../layout/Loader/Loader";
//import { useDispatch, useSelector } from "react-redux";
//import { clearErrors, login, register } from "../../actions/userAction";
//import { useAlert } from "react-alert";

export const LoginRegister = ()=>{
// { history, location }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.user
//   );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

 
  const loginSubmit = (e) => {
    console.log("Login Form Submitted")
    //e.preventDefault();
   // dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
   // e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
   // dispatch(register(myForm));
    console.log("Register Form Submitted")

  };

  const registerDataChange = (e) => {
   
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };

  //const redirect = location.search ? location.search.split("=")[1] : "/account";

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (isAuthenticated) {
//       history.push(redirect);
//     }
//   }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftNeutral");
      switcherTab.current.classList.remove("shiftRight");

      registerTab.current.classList.remove("shiftNeutralForm");
      loginTab.current.classList.remove("shiftLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftRight");
      switcherTab.current.classList.remove("shiftNeutral");

      registerTab.current.classList.add("shiftNeutralForm");
      loginTab.current.classList.add("shiftLeft");
    }
  };

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
        <Fragment>
          <div className="LoginRegisterContainer">
            <div className="LoginRegisterBox">
              <div>
                <div className="Login_Register_Toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <input type="email" placeholder="Email"   value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="loginPassword">
                  <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <input type="submit" value="LOGIN" className="loginButton" />
              </form>
              <form className="registerForm"  ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit} >
                <div className="registerName">
                  <input type="text"  placeholder="Username" required name="name"  value={name}  onChange={registerDataChange}   />
                </div>
                <div className="registerEmail">
                  <input type="email" placeholder="Email" required name="email" value={email}  onChange={registerDataChange} />
                </div>
                <div className="registerPassword">
                  <input  type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange}  />
                </div>
                 <input type="submit" value="REGISTER" className="registerButton" />
              </form>
            </div>
          </div>
        </Fragment>
    //   )}
    // </Fragment>
  );
};

export default LoginRegister;