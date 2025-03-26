import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonYellowBtn from "../../common/CommonYellowBtn";
import { updateProfile } from "../../../services/operations/ProfileAPI";

function SettingForm() {
  const { user } = useSelector((state) => state.profile);
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,

    contactNumber: user?.contactNumber,
    gender: user?.additionalDetails?.gender || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    about: user?.additionalDetails?.about || "",
  });


  function formChangeHandler(event) {

    if(event.target.name==="contactNumber" && (event.target.value.length>10 || event.target.value.length<8)){

        // console.log("Arrey bhai");
    }
    // console.log(event.target.value);
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event){
   event.preventDefault();

  }
  function saveHandler(){
    const gender=formData.gender;
    const dateOfBirth=formData.dateOfBirth;
    const about=formData.about;
dispatch(updateProfile(token,gender,dateOfBirth,about))
  }

  function cancelHandler(){
    
    setFormData((prev) => {
      return {
        ...prev,
        gender: user?.additionalDetails?.gender,
        dateOfBirth:user?.additionalDetails?.dateOfBirth,
        about:user?.additionalDetails?.about
      };
    });
    // console.log(formData);
  }

  return (
    <form className="relative profile-info-wrap" onSubmit={submitHandler}>
      <h3>Profile Information</h3>
      <div className="personal-detail-grid">
        <div>
          <label htmlFor="firstName" className="dash-label">
            First Name
            <input
              id="firstName"
              readOnly
              className="dash-imp"
              value={formData.firstName}
              onChange={formChangeHandler}
              name="firstName"
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName" className="dash-label">
           Last Name
            <input
              id="lastName"
              readOnly
              className="dash-imp"
              value={formData.lastName}
              onChange={formChangeHandler}
              name="lastName"
            />
          </label>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="dash-label">
            Date Of Birth{" "}
            <input
              type="date"
              className="dash-imp"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={formChangeHandler}
              name="dateOfBirth"
            />
          </label>
        </div>
        <div>
          <label htmlFor="gender" className="dash-label">
            <div>Gender</div>
            <select
              id="gender"
              className="dash-imp"
              value={formData.gender}
              onChange={formChangeHandler}
              name="gender"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
        </div>
        <div>
        <label htmlFor="contactNumber" className="dash-label">
        Contact Number
            <input
              type="number"
              className="dash-imp"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={formChangeHandler}
              name="contactNumber"
             size={10}
            />
          </label>
        </div>
        <div>
        <label htmlFor="about" className="dash-label">
        About{" "}
            <input
              type="text"
              className="dash-imp"
              id="about"
              value={formData.about}
              onChange={formChangeHandler}
              name="about"
            />
          </label>
        </div>
      </div>

      <div className="save-cancel-btn"  >
      <button className="select-img-file" onClick={cancelHandler}>Cancel</button>
      <div  onClick={saveHandler}>
      <CommonYellowBtn    content="Save"/>
      </div>
      </div>
    </form>
  );
}

export default SettingForm;
