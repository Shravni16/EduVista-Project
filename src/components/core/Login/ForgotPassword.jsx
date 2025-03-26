// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../../components/common/Loader"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { forgotPassword } from "../../../services/operations/AuthAPI";




// function ForgotPassword(){

//    const {loading}=useSelector((state)=>state.auth)
// const [email,setEmail]=useState("");
// const [emailSent,setEmailSent]=useState(false);
// const dispatch=useDispatch();
// const navigate=useNavigate();


// function emailSet(event){
//     setEmail(event.target.value);
// }

// function submitHandler(event){
//     event.preventDefault();
// dispatch(forgotPassword(email,navigate));
// setEmailSent(true);


// }


//     return(
//         <div>
// {
//     loading?(<Loader/>):(
//         <form onSubmit={submitHandler}>
//             <h1>{!emailSent?"Reset your password":"Check email"}</h1>
//             <p>{!emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`}</p>

//             {!emailSent && <label> Email Address <sup>*</sup>
//                 <input required onChange={emailSet} placeholder="Enter Email Address"/>
//                 </label>}

//                 <button >{!emailSent?"Reset Password":"Resend email"}</button>
//         </form>
//     )
// }
//         </div>
//     )
// }

// export default ForgotPassword;
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/common/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/operations/AuthAPI";
import "./allLoginCss.css"

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function emailSet(event) {
    setEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(forgotPassword(email, navigate));
    setEmailSent(true);
  }

  return (
    <div className="forgot-password-container">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submitHandler} className="forgot-password-form">
          <h1 className="form-heading">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="form-text">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          {!emailSent && (
            <label className="email-label">
              Email Address <sup>*</sup>
              <input
                required
                onChange={emailSet}
                placeholder="Enter Email Address"
                className="email-input"
              />
            </label>
          )}

          <button className="submit-button">
            {!emailSent ? "Reset Password" : "Resend email"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
