import React from "react";
import Template from "../components/core/Login/Template";
import signupImg from "../assets/Images/signup.jpeg"
import "../CSS/login-signup.css"
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";

function SignUp( {setIsLogged}){
    const { loading } = useSelector((state) => state.auth);
    return(
        <div>
    {
loading ?(<Loader/>):(<div>
    <Template
  title="Join the millions learning to code with Eduvista for free"
  desc1="Build skills for today, tomorrow, and beyond."
  desc2="Education to future-proof your career."
  image={signupImg}
  formtype="signup"
  setIsLogged={setIsLogged}
/>
</div> )
}</div>
        
    );
}
export default SignUp;