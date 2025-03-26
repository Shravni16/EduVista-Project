import { useSelector } from "react-redux";
import CommonYellowBtn from "../../common/CommonYellowBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  // console.log("Additional details", user.additionalDetails.about);
  const [openPicture,setOpenPicture]=useState(false);
  function openPicHandler(event){

    setOpenPicture(true);
  }
  function closePicHandler(event){

    setOpenPicture(false);
  }

  return (
    <div>
      <h1 className="prof-heading">My Profile</h1>
      {/* section 1 */}

      {
        openPicture && <div className="full-blur"></div>
      }
   
      <section className="profile-section">
        <div className="pic-email relative">
          <img src={user.image} className={`${openPicture ?"profile-pic opened-pic":"profile-pic"}`} onClick={openPicHandler}></img>
         {
          openPicture && ( <span className="cross-span" onClick={closePicHandler}><RxCross2 />
          </span>)
         }
          <div className="name-email">
            <h3 className="prof-name">
              {user.firstName + " " + user.lastName}
            </h3>
            <p className="prof-email">{user.email}</p>
          </div>
        </div>
        <div>
          <Link to="/dashboard/setting" className="no-underline">
            <CommonYellowBtn content="Edit" Child="RiEditBoxLine" />
          </Link>
        </div>
      </section>

      {/* section 2 */}

      <section className="profile-section">
        <div className="about-cont">
          <h3 className="prof-name">About</h3>
          {user?.additionalDetails?.about ? (
            <p className="prof-email">{user.additionalDetails.about}</p>
          ) : (
            <p className="prof-email">Write Something About Yourself</p>
          )}
        </div>
        <div>
          <Link to="/dashboard/setting" className="no-underline">
            <CommonYellowBtn content="Edit" Child="RiEditBoxLine" />
          </Link>
        </div>
      </section>

      {/* section 3 */}

      <section className="profile-section">
        <div className="about-cont">
          <h3 className="prof-name">Personal Details</h3>
          <div className="personal-detail-grid">
            <div className="labels">First Name</div>
            <div className="labels">Last Name</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div className="labels">Email</div>
            <div className="labels">Phone Number</div>
            <div>{user.email}</div>
            <div>{user.contactNumber}</div>
            <div className="labels">Gender</div>
            <div className="labels">Date of Birth</div>
            <div>
              {user.additionalDetails?.gender
                ? user.additionalDetails?.gender
                : "Add Gender"}
            </div>
            <div>
              {user.additionalDetails?.dateOfBirth
                ? user.additionalDetails?.dateOfBirth
                : "Add Date Of Birth"}
            </div>
          </div>
        </div>
        <div>
          <Link to="/dashboard/setting" className="no-underline">
            <CommonYellowBtn content="Edit" Child="RiEditBoxLine" />
          </Link>
        </div>
      </section>

      
    </div>
  );
}

export default MyProfile;
