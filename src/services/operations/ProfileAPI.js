import { useDispatch, useSelector } from "react-redux";
import { settingsEndpoints } from "../apis";
import { setLoading, setUser } from "../../slices/profileSlice";
import {apiConnector} from "../apiconnector"
import toast from "react-hot-toast";
import {setToken} from "../../slices/authSlice";
import {setTotalItem} from "../../slices/cartSlice"
import { profileEndpoints } from "../apis";


const {UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API, CHANGE_PASSWORD_API,DELETE_PROFILE_API}=settingsEndpoints;
const {GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD_DATA}=profileEndpoints;



export function updateProfilePicture(imageFile,token){
    
     return async (dispatch)=>{
       
        dispatch(setLoading(true));
        try{
           
            
            const formData=new FormData();
            formData.append("imageFile",imageFile);
            // console.log("Image file",imageFile);
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                Authorization: `Bearer ${token}`,
               
            });
            // console.log("File Upload Response",response.data.data.image);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const userDataString = localStorage.getItem('user');
           
            const userData = JSON.parse(userDataString);
            userData.image = response.data.data.image;
            // console.log("USer image in ppapi",userDataString.image)
         
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUser(userData));
            // console.log("File Upload Response",response);
            toast.success("Profile Picture Updated");


        }catch (error){
console.log(error)
        }
        dispatch(setLoading(false));
     }

}

export function updateProfile(token,gender,dateOfBirth,about){
return async (dispatch)=>{
    dispatch(setLoading(true))
    try{
        const response=await apiConnector("PUT", UPDATE_PROFILE_API,{gender,dateOfBirth,about},{
            Authorization: `Bearer ${token}`,
           
        });
        // console.log("Response API",response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        const userDataString = localStorage.getItem('user');
           
        const userData = JSON.parse(userDataString);
        userData.additionalDetails.about = response.data.data.about;
        userData.additionalDetails.gender = response.data.data.gender;
        userData.additionalDetails.dateOfBirth = response.data.data.dateOfBirth;
        
     
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(setUser(userData));

        toast.success("Profile Updated Successfully");
    }catch(error){
        console.log(error);
        toast.error("Error in Updating Profile");
    }
    dispatch(setLoading(false))
}
}

export function changePassword(email,oldPassword,newPassword,token){
    return async(dispatch)=>{
        const confirmNewPassword=newPassword;
     dispatch( setLoading(true));
        try{
            const response=await apiConnector("POST",CHANGE_PASSWORD_API,{email,oldPassword,newPassword,confirmNewPassword},{
                Authorization: `Bearer ${token}`,
               
            });
            // console.log("Response",response);

            if(!response.data.success){
                throw new Error(response.data.error);
            }
            toast.success("Password Changed Successfully")
        }catch(error){
            toast.error("Error While Changing Password")
console.log("error in changing pass",error.message);
        }
         dispatch( setLoading(false));
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
         dispatch(setLoading(true))
        try{
            const response=await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization: `Bearer ${token}`,
               
            });

            // console.log("Account Delete response",response);
            if(!response.data.success){
                throw new Error(response.data.error);
            }
            toast.success("Account Deleted Successfully");
           
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(setTotalItem(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signup");


           
           

        }catch(error){
            toast.error("Can't delete account")
            console.log("Error in Deleting account,try again later");
            console.log(error.message);
        }
       dispatch(setLoading(false))

    }
}

export async function getUserEnrolledCourses(token){
    const toastId=toast.loading("Loading...")
let result=[];
try{

    const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
        Authorization: `Bearer ${token}`,
       
    });
    if(!response.data.success){
        throw new Error(response.data.error);
    }

    // console.log("Response of Get Enrolled Courses",response.data.data);
    result=response.data.data;

}catch(error){
console.log("Error while fetching enrolled Courses");
console.log(error.message);
toast.error("Could not fetch enrolled courses");
}
toast.dismiss(toastId);
return result;
}

export async function getInstructorDashboardData(token){
    const toastId=toast.loading("Loading...")
    let result=[];
    try{
        const response=await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_DATA,null,{
            Authorization: `Bearer ${token}`,
           
        })
        if(!response.data.success){
            throw new Error(response.data.error);
        }
    
        // console.log("Response of Get Dashboard data",response.data.data);
        result=response.data.data;
    }catch(error){
        console.log("Error while fetching Dashboard data Courses");
        console.log(error.message);
        toast.error("Could not fetch Dashboard data");
        }
        toast.dismiss(toastId);
        return result;
}