import React, { useState } from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

  const {url, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');

  // state for storing the user login details and for 
  // accepting the user entered details
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({...data, [name]:value}));
  }

  const onLogin = async (event) => {
    // to prevent the reloading of the web page
    event.preventDefault();

    // for api calls we use axios
    // copying the url
    let newUrl = url;

    // we know the url changes based on whether the user is
    // needs to login or to register
    if(currState === 'Login'){
      newUrl += '/api/user/login'
    }
    else{
      newUrl += '/api/user/register'
    }

    // genrerating the response
    // data -> is the data entered by the user for login or to register
    const response = await axios.post(newUrl, data);

    // if is true means whether we are logged in or registered
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      // after the login we need to hide the loginpage
      setShowLogin(false);
    }
    else{
      alert(response.data.message)
    }

  }

  return (
    <LoginPopupContainer>

      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h1>{currState}</h1>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>

        <div className="login-popup-inputs">
          {/* if the currState is Login we don't need name */}
          {
            currState === 'Login' ? <></> :
              <input name='name' 
                 value={data.name} 
                 onChange={onChangeHandler} 
                 type="text" placeholder="Enter Name" required />
          }
          <input name="email" 
                value={data.email} 
                onChange={onChangeHandler} 
                type="email" placeholder="Enter Email" required />

          <input name="password" 
                 value={data.password} 
                 onChange={onChangeHandler} 
                 type="password" placeholder="Password" required />
        </div>

        {/* button name will be displayed based on the currState status that is new user or existing user */}
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {
          currState === "Login"
            ? <p>Create a New Account.. <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
            : <p>Already Have an Account.. <span onClick={() => setCurrState("Login")}>Login</span></p>
        }

      </form>

    </LoginPopupContainer>
  )
}

export default LoginPopup;

const LoginPopupContainer = styled.div`
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: #00000090;
      display: grid;

      .login-popup-container{
        place-self: center;
        width: max-content(23vw,330px);
        color: #808080;
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding: 25px 30px;
        border-radius: 8px;
        font-size: 14px;
        animation: fadeIn 0.5s;
      }

      .login-popup-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: black;
      }
      .login-popup-title img{
        width: 16px;
        cursor: pointer;
      }

      .login-popup-inputs{
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .login-popup-inputs input{
        outline: none;
        border: 1px solid #c9c9c9;
        padding: 10px;
        border-radius: 4px;
      }

      .login-popup-container button{
        border: none;
        padding: 10px;
        border-radius: 4px;
        color: white;
        background-color: tomato;
        font-size: 14px;
        cursor: pointer;
      }

      .login-popup-condition{
        display: flex;
        align-items: start;
        gap: 8px;
        margin-top: -15px;
      }
      .login-popup-condition input{
        margin-top: 3px;
      }

      span {
        color: tomato;
        font-weight: 500;
        cursor: pointer;
      }
`;