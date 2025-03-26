import { toast } from "react-hot-toast"
import {setLoading,setToken} from "../../slices/authSlice";
import {setUser} from "../../slices/profileSlice";
import {apiConnector} from "../apiconnector";
import {endpoints} from "../apis";
import {setTotalItem} from "../../slices/cartSlice"


const { SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API}=endpoints;

export function sendOtp(email,navigate){
    return async(dispatch)=>{
      dispatch(setLoading(true));
      try{
        //api call 
        const response=await apiConnector("POST",SENDOTP_API,{email,
            checkUserPresent: true,});

            // console.log("Sendotp api response.....",response);

        //  console.log(response.data.success);
          
         if (!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("OTP Sent Successfully")
          navigate("/verify-email")

      }
      catch(error){
        // console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
    }
}

export function signUp( accountType,firstName,lastName,email,password,confirmPassword,otp,contactNumber,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
// console.log("OTP",otp);
      const response=await apiConnector("POST",SIGNUP_API,{
        firstName,lastName,email,contactNumber,accountType,otp,password,confirmPassword,checkUserPresent: true
      });
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("User Registered Successfully")
  
      navigate("/login");
    }catch(error){
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))

  }
}

export function logIn(email,password,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
    
      const response=await apiConnector("POST",LOGIN_API,{email,password});
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // console.log("Login Response :",response);
      toast.success("Login Successfull..");
      
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.userAlreadyExist  ));
      localStorage.setItem("token",JSON.stringify(response.data.token));
      localStorage.setItem("user",JSON.stringify(response.data.userAlreadyExist));
      navigate("/dashboard/my-profile");
    }catch(error){
       console.log("LOGIN API ERROR............", error)
    toast.error("Login Failed")
    navigate("/login")}
    dispatch(setLoading(false));
  }
}


export function forgotPassword(email,navigate){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSTOKEN_API,{
        email
      });
      // console.log("Reset password Token Response",response);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Reset Email Sent Successfully");
navigate("/forgot-password");

    }catch(error){
      console.log("RESETPASSTOKEN_API ERROR............", error)
      toast.error("Reset Email Send Fail")
      navigate("/forgot-password")
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password,confirmPassword,token,navigate){
return async (dispatch)=>{
  dispatch(setLoading(true));
  try{
  const response=await apiConnector("POST",RESETPASSWORD_API,{
    password,confirmPassword,token
  });
  // console.log("Reset password Response",response);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      navigate("/reset-complete");

  }catch(error){
    console.log("RESETPASSWORD_API ERROR............", error)
    toast.error("Reset Password Fail")
    navigate("/forgot-password")
  }
  dispatch(setLoading(false));
}
}


export function logout(navigate){
return (dispatch)=>{


    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setTotalItem(null));
      localStorage.clear();
  toast.success("Logged Out");
  navigate("/")

}
}