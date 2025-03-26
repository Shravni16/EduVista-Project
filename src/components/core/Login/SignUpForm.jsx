import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../CSS/login-signup.css"
import { useDispatch} from "react-redux";
import {setSignupData } from "../../../slices/authSlice"

import { sendOtp } from "../../../services/operations/AuthAPI";


function SignUpForm({setIsLogged}){
    
    const dispatch=useDispatch();
    const navigator=useNavigate();
    const [signData,setSignData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        contactNumber:""
        });
        const [showPass,setShowPass]=useState(false);
        const [showConPass,setShowConPass]=useState(false);
        const [accountType,setAccountType]=useState("Student");

        // const [showPass,setShowPass]=useState({
        //     first:false,
        //     second:false
        // });

        function showhandler(event){
            let name=event.target.name;
            setShowPass((prev)=>{
                return{
                    ...prev,[name]: !prev[name]
                }
            })
        }

        function signupChangeHandler(event){
            
            setSignData((prev)=>{
                return{
                    ...prev,[event.target.name]: event.target.value
                }
            })
        }

        function SubmitHandler(event){

            if(signData.password !=signData.confirmPassword){
                toast.error("Passwords do not match");
                setTimeout(4000);
                return;
            }
       event.preventDefault();


       const signupData = {
        ...signData,
        accountType,
      }
    //   console.log("SignUp data ",signupData)
      dispatch(setSignupData(signupData))
      dispatch(sendOtp(signData.email, navigator))
        }
    return(
<div>

    <div className="student-instructor-wrapper-signup">
        <button onClick={()=>{setAccountType("Student");
        // console.log("Student");
    }}
        className={accountType==="Student"?"active-signup":"inactive-signup"}
        >Student</button>

        <button onClick={()=>{setAccountType("Instructor");
        // console.log("Instructor");
    }}
        className={accountType==="Instructor"?"active-signup":"inactive-signup"}>Instructor</button>
    </div>
        <form className="signin-form-wrapper" onSubmit={SubmitHandler}>
            <div className="flx-hr">
            <label className="flx-clm flex-col-gap-10 ">
              <p className="padding-5"> First Name<sup className="star">*</sup> </p> 
                <input className="inputs"placeholder="Enter First Name"
                required
                type="text"
                name="firstName"
                onChange={signupChangeHandler}
                value={signData.firstName}
                ></input>
            </label>

            <label className="flx-clm flex-col-gap-10">
            <p className="padding-5">Last Name<sup className="star">*</sup> </p> 
                <input className="inputs" placeholder="Enter Last Name"
                required
                type="text"
                name="lastName"
                onChange={signupChangeHandler}
                value={signData.lastName}
                ></input>
            </label>
            </div>
            <label className="flx-clm flex-col-gap-10">
             <p className="padding-5">Email Address<sup className="star">*</sup> </p> 
                <input className="inputs" placeholder="Enter Email Address"
                required
                type="email"
                name="email"
                onChange={signupChangeHandler}
                value={signData.email}
                ></input>
            </label>


            <label className="flx-clm flex-col-gap-10">
             <p className="padding-5">Contact Number<sup className="star">*</sup> </p> 
                <input className="inputs" placeholder="Enter Contact"
                required
                type="text"
                name="contactNumber"
                onChange={signupChangeHandler}
                value={signData.contactNumber}
                ></input>
            </label>

           
            <div className="flx-hr">
            <label className="flx-clm flex-col-gap-10">
              <p className="padding-5">Password <sup className="star">*</sup> </p> 
              <div className="flx-hr spn inputs padding-0">
                <input className=" password-inside" placeholder="Enter Password"
                required
                type={showPass?("text"):("password")}
                name="password"
                onChange={signupChangeHandler}
                value={signData.password}
                ></input><span onClick={()=>setShowPass((prev)=>!prev)} className="eye"
                >{showPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
                </div>
             
            </label> 

            <label className="flx-clm flex-col-gap-10">
              <p className="padding-5">Confirm Password <sup className="star">*</sup> </p> 
              <div className="flx-hr spn inputs padding-0">
                <input className="password-inside" placeholder=" Confirm Password"
                required
                type={showConPass?("text"):("password")}
                name="confirmPassword"
                onChange={signupChangeHandler}
                value={signData.confirmPassword}
                ></input>
                <span onClick={()=>setShowConPass((prev)=>!prev)} className="eye"
                >{showConPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span></div>
            </label>
            </div>

            <button className="final-btns">Create Account</button>
        </form>

    </div>



        
    );
}
export default SignUpForm;