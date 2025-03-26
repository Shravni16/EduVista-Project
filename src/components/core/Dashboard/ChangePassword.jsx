import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonYellowBtn from "../../common/CommonYellowBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../services/operations/ProfileAPI";



function ChangePassword(){
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const [showPass,setShowPass]=useState(false);
    const [showConPass,setShowConPass]=useState(false);
    const dispatch=useDispatch();

    const [formData,setFormData]=useState({
        currPass:"",
        newPass:"",
    })

    function submitHandler(event){
        event.preventDefault();
     
       }

       function formChangeHandler(event){
      setFormData((prev)=>{
        return {
            ...prev,
            [event.target.name]:event.target.value,
        }
      })
       }
    
       function cancelHandler(){
        setFormData({
            currPass:"",
            newPass:"",
        });

       }

       function updateHandler(event){
        event.preventDefault();
        ////ye baki hai
        dispatch(changePassword(user.email,formData.currPass,formData.newPass,token));
        setFormData({currPass:"",
        newPass:""})
       }


    return(
        <form onSubmit={submitHandler} className="relative  profile-info-wrap" >
          <div className="personal-detail-grid">
       <div>
       <label htmlFor="currPass" className="dash-label relative">
           Enter Current Password
            <input
             type={showPass?("text"):("password")}
              id="currPass"
              placeholder="Enter Old Password"
              className="dash-imp bg-color"
              value={formData.currPass}
              onChange={formChangeHandler}
              name="currPass"
            />
            <span onClick={()=>setShowPass((prev)=>!prev)} className="eye abs-eye"
            >{showPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
          </label>

       </div>
          <div>
          <label htmlFor="newPass" className="dash-label relative">
           Enter New Password
            <input
            type={showConPass?("text"):("password")}
              id="newPass"
              placeholder="Enter New Password"
              className="dash-imp bg-color"
              value={formData.newPass}
              onChange={formChangeHandler}
              name="newPass"
            />
             <span onClick={()=>setShowConPass((prev)=>!prev)} className="eye abs-eye"
            >{showConPass?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
          </label>
          </div>
          </div>
          <div className="save-cancel-btn "  >
      <button className="select-img-file" onClick={cancelHandler}>Cancel</button>
      <div  onClick={updateHandler}>
      <CommonYellowBtn    content="Update"/>
      </div>
      </div>
        </form>
   );
}

export default ChangePassword;