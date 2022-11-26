import React, { Fragment, useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../../AuthProvider";
import "./LoginRegister.css";
import Loader from "../layout/Loader/Loader";
import axios from 'axios'
//import { useDispatch, useSelector } from "react-redux";
//import { clearErrors, login, register } from "../../actions/userAction";
//import { useAlert } from "react-alert";

const LOGIN_URL = 'http://localhost:3000/auth/login'

export const LoginRegister = () => {

  //////
  const loginTab = useRef(null);

  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const userRef = useRef()
  const { setAuth } = useContext(AuthContext)

  //////
  const errRef = useRef()


  //login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  ///////
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //////
  // useEffect(() => {
  //   userRef.current.focus()
  // })


  useEffect(() => {
    setErrMsg('');
  }, [loginEmail, loginPassword])

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword)
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: loginEmail,
          password: loginPassword
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        console.log(response)
      // console.log(JSON.stringify(
      //   response?.data
      // ))
      const accessToken = response.data.accessToken
      const role = response.data.role
      setAuth({ loginEmail, loginPassword, role, accessToken })
      setLoginEmail('')
      setLoginPassword('')
      setSuccess(true)
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  //register
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerDataChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });

  };
  const registerSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name, email, password
      }),
      headers: {
        "content-Type": "application/json"
      },
    })
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Registeration");
      console.log("Invalid Registeration");
    } else {
      window.alert("Registeration Successful");
      console.log("Registeration Successful");
    }
  }
  // { history, location }) => {
  //   const dispatch = useDispatch();
  //   const alert = useAlert();

  //   const { error, loading, isAuthenticated } = useSelector(
  //     (state) => state.user
  //   );

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
          {success ? (
            <section>
              <h1> You are logged in </h1>
            </section>) : (
            <>
              <p ref={errRef}> {errMsg} </p>
              <>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                  <div className="loginEmail">
                    <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  </div>
                  <div className="loginPassword">
                    <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </div>
                  <input type="submit" value="LOGIN" className="loginButton" />
                </form><form className="registerForm" method="POST" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                  <div className="registerName">
                    <input type="text" placeholder="Username" required name="name" value={name} onChange={registerDataChange} />
                  </div>
                  <div className="registerEmail">
                    <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                  </div>
                  <div className="registerPassword">
                    <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
                  </div>
                  <input type="submit" value="REGISTER" className="registerButton" />
                </form></></>)}
        </div>
      </div>
    </Fragment>
    //   )}
    // </Fragment>
  );
};

export default LoginRegister;