// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { resetPassword } from "../../../services/operations/AuthAPI";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../common/Loader";
// import toast from "react-hot-toast";


// function UpdatePassword(){

//     const {loading}=useSelector((state)=>state.auth);
//     const location=useLocation();
//     const token=location.pathname.split("/").at(-1);
//     const [newPass,setNewPass]=useState("");
//     const [confirmNewPass,setConfirmNewPass]=useState("");
//     const [showPass,setShowPass]=useState(false);
//     const [showConPass,setShowConPass]=useState(false);
//     const dispatch=useDispatch();
// const navigate=useNavigate();

//     function submitHandler(event){

        
// event.preventDefault();
// if(newPass!==confirmNewPass){
//     toast.error("Passwords do not match");
//     setTimeout(4000);
//     return; 
// }
// dispatch(resetPassword(newPass,confirmNewPass,token,navigate))


//     }

    
//     return(<div>
//         {loading ?(<Loader/>) :( <form onSubmit={submitHandler}>
//             <h1>Choose  new password</h1>
//             <p>Almost done. Enter your new password and youre all set.</p>

//             <label>New Password <sup>*</sup>
//             <input 
//             required 
//             onChange={(event)=>{setNewPass(event.target.value)}}
//             type={showPass?("text"):("password")}
//             value={newPass} />
//             <span onClick={()=>setShowPass((prev)=>!prev)} className="eye"
//                 >{showPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
//             </label>
           
//             <label>Confirm Password <sup>*</sup>
//             <input 
//             required 
//             onChange={(event)=>{setConfirmNewPass(event.target.value)}}
//             type={!showConPass?("text"):("password")}
//             value={confirmNewPass} />
//             <span onClick={()=>setShowConPass((prev)=>!prev)} className="eye"
//                 >{!showConPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
//             </label>
//             <button>Reset Password</button>
//             <Link to="/login">Back To Login</Link>


//         </form>) }
       
//     </div>)
// }

// export default UpdatePassword;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../../../services/operations/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import "./updatePass.css"

function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const token = location.pathname.split("/").at(-1);
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    if (newPass !== confirmNewPass) {
      toast.error("Passwords do not match");
      setTimeout(4000);
      return;
    }
    dispatch(resetPassword(newPass, confirmNewPass, token, navigate));
  }

  return (
    <div className="update-password-container">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submitHandler} className="update-password-form">
          <h1 className="form-heading">Choose a new password</h1>
          <p className="form-text">
            Almost done. Enter your new password and you're all set.
          </p>

          <label className="password-label">
            New Password <sup>*</sup>
            <input
              required
              onChange={(event) => {
                setNewPass(event.target.value);
              }}
              type={showPass ? "text" : "password"}
              value={newPass}
              className="password-input"
            />
            <span onClick={() => setShowPass((prev) => !prev)} className="eye-up">
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="password-label">
            Confirm Password <sup>*</sup>
            <input
              required
              onChange={(event) => {
                setConfirmNewPass(event.target.value);
              }}
              type={showConPass ? "text" : "password"}
              value={confirmNewPass}
              className="password-input"
            />
            <span
              onClick={() => setShowConPass((prev) => !prev)}
              className="eye-up"
            >
              {showConPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <button className="submit-button">Reset Password</button>
          <Link to="/login" className="back-to-login">
            Back To Login
          </Link>
        </form>
      )}
    </div>
  );
}

export default UpdatePassword;
