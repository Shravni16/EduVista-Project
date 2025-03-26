import { useDispatch, useSelector } from "react-redux";
import CommonYellowBtn from "../../common/CommonYellowBtn";
import { useState } from "react";
import { updateProfilePicture } from "../../../services/operations/ProfileAPI";
import SettingForm from "./SettingForm";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import Loader from "../../common/Loader";

function Settings() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [choosefile, setChoosefile] = useState(false);
  function fileChangeHandler(event) {
    setChoosefile(false);
    setSelectedFile(event.target.files[0]);
  }
  // console.log("Loading", loading);

  function uploadHandler() {
    if (selectedFile) {
      // console.log("File ", selectedFile);
      // console.log("File uploaded successfullyy");

      dispatch(updateProfilePicture(selectedFile, token));
      setChoosefile(false);
      setSelectedFile(false);
    } else {
      setChoosefile(true);
    }
  }
  return (
    <div>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="setting-wrap">
          <h1 className="prof-heading">Settings </h1>
          {/* section 1 */}
          <section className="profile-section">
            <div className="setting-sec-1">
              <img
                src={user?.image}
                alt="User img"
                className="profile-pic"
              ></img>
              <div className="change-prof-btns">
                <p>Change Profile Picture</p>
                <div className="select-upload relative">
                  <button className="select-img-file">
                    {selectedFile ? "Selected" : "Select"}
                  </button>

                  <input
                    type="file"
                    onChange={fileChangeHandler}
                    className="file-input"
                  />
                  <div onClick={uploadHandler}>
                    <CommonYellowBtn content="Upload" Child="RiUpload2Line" />
                    {choosefile && (
                      <span className="spn-settingn">
                        <span className="spn-triangle"></span>First Choose File
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="profile-section ">
            <SettingForm />
          </section>

          <section className="profile-section change-pass-sec">
            <ChangePassword />
          </section>
          <section className="profile-section change-pass-sec delete-wrap">
            <DeleteAccount />
          </section>
        </div>
      )}
    </div>
  );
}

export default Settings;
