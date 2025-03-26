import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../../CSS/login-signup.css"
import { logIn } from "../../../services/operations/AuthAPI";
import { useDispatch } from "react-redux";


function LoginForm({setIsLogged}){
    const [showPass,setShowPass]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
   const [loginData,setLogindata]=useState({
    e_mail:"",
    password:""
   })

   function loginChangeHandler(event){
    setLogindata((prev)=>{
        return{
            ...prev,[event.target.name]:event.target.value
        }

    })

   }

   function loginSubmitHandler(event){
    event.preventDefault();

    const email=loginData.e_mail;
    const password=loginData.password;

    dispatch(logIn(email,password,navigate));
   
  
    
   }
    return(
        <div >
            <form onSubmit={loginSubmitHandler} className="login-form-wrapper ">
            <label className="flx-clm flex-col-gap-10"><p className="padding-5">Enter Email<sup className="star">*</sup></p>
            <input className="inputs" placeholder="Enter Email Address"
            required
            type="email"
            name="e_mail"
            value={loginData.e_mail}
            onChange={loginChangeHandler}
            ></input>
            </label>
<div>
<label className="flx-clm flex-col-gap-10">
                  <p className="padding-5">Password <sup className="star">*</sup> </p> 
                  <div className=" spn inputs padding-0 width-100 flex-hr-normal" >
                    <input className=" password-inside width-100 " placeholder="Enter Password "
                    required
                    type={showPass?("text"):("password")}
                    name="password"
                    onChange={loginChangeHandler}
                    value={loginData.password}
                    ></input><span onClick={()=>setShowPass((prev)=>!prev)} className="eye"
                    >{showPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
                    </div>
                 
                </label> 
            <Link to="/forgot-password"><p className="forgot">Forgot Password</p></Link>
            </div>
            <button className="final-btns">Log In</button>
            </form>
        </div>
    );
}
export default LoginForm;