import React from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import frame from "../../../assets/Images/frame.png"
import "../../../CSS/login-signup.css"

function Template({title,desc1,desc2,formtype,image,setIsLogged}){
    
    return(
        <div className="tmp-wrapper">
            <div className="tmp-c1">
                <h1 className="tmp-title">{title}</h1>
                <p className="tmp-dsc-1">{desc1}</p>
                <p className="tmp-dsc-2"><i>{desc2}</i></p>
                {
                    formtype==="signup"?(<SignUpForm setIsLogged={setIsLogged}/>):(<LoginForm setIsLogged={setIsLogged}/>)
                }

            </div>
            <div className="tmp-c2">
            <img src={image} className="fr-img"alt="image"/>
                <img src={frame} className="bg-image" alt="frame"/>
              

            </div>

        </div>
    );
}
export default Template;