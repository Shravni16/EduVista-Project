
// import { useState } from 'react';
// import OtpInput from 'react-otp-input';
// import { Link } from 'react-router-dom';
// import {signUp} from "../../../services/operations/AuthAPI"
// import { useSelector } from 'react-redux';
// import authSlice from '../../../slices/authSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { sendOtp } from '../../../services/operations/AuthAPI';

// function VerifyEmail(){
//     const dispatch=useDispatch();
//     const navigator=useNavigate();
//     const {signupData}=useSelector((state)=>state.auth);
//   const [otp,setOtp]=useState("");
//   console.log("Signup Data : ",signupData);
//   const {accountType,firstName,lastName,email,password,confirmPassword,contactNumber}=signupData;

//    function onResend(){
//     // dispatch(sendOtp(signupData.email, navigator))
//    }

//    function submitHandler(event){
//     event.preventDefault();
//     // console.log("otp:",otp);
//     // dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,contactNumber,otp,navigator));
    
//       dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,contactNumber, navigator)); // Pass navigator function here
   


//    }

//     return(
//         <div>
//             <form onSubmit={submitHandler}>

//             <h1>Verify email</h1>
//             <p>A verification code has been sent to you. Enter the code below</p>
//             <OtpInput
//       value={otp}
//       onChange={setOtp}
//       numInputs={6}
//       renderSeparator={<span>-</span>}
//       renderInput={(props) => <input {...props} />}
//     />

// <button>Verify Email</button>

// <div>
//     <Link to="/login">Back to Login</Link>
//     <div onClick={onResend}>Resend otp</div>
// </div>

// </form>
//         </div>

        
//     );
// }

// export default VerifyEmail;
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { signUp } from "../../../services/operations/AuthAPI";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css'; // Import the CSS file

function VerifyEmail() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    
    // console.log("Signup Data : ", signupData);
    const { accountType, firstName, lastName, email, password, confirmPassword, contactNumber } = signupData;

    function onResend() {
        // dispatch(sendOtp(signupData.email, navigator))
    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, contactNumber, navigator));
    }

    return (
        <div className="verify-email-container">
            <form onSubmit={submitHandler} className="verify-email-form">
                <h1 className="form-title">Verify email</h1>
                <p className="form-description">A verification code has been sent to you. Enter the code below</p>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="otp-separator">-</span>}
                    renderInput={(props) => <input {...props} className="otp-input" />}
                />
                <button className="verify-button">Verify Email</button>

                <div className="form-footer">
                    <Link to="/login" className="back-to-login-v">Back to Login</Link>
                    <div onClick={onResend} className="resend-otp">Resend OTP</div>
                </div>
            </form>
        </div>
    );
}

export default VerifyEmail;
