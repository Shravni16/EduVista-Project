import { useNavigate } from "react-router-dom";
import CommonYellowBtn from "../../common/CommonYellowBtn";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/operations/AuthAPI";
import "./profiledropdown.css"
import "./../../../CSS/dashboard.css"



function Logout(){
    const navigate=useNavigate();
const dispatch=useDispatch();
    function logoutHandler(){
        dispatch(logout(navigate));
    }
    function cancelHander(){
        navigate(-1);
    }
    return (
        <div className= "unblur-logout size-of-logout">
             <h2 className="logout-head"> Are you Sure ?</h2>
              <p>You will be Logged out of Your Account</p>
             <div className="two-btns-y-b">
                <div  onClick={logoutHandler}><CommonYellowBtn content="Logout" /></div>
             
             <button className="cancel-button-logout" onClick={cancelHander} >Cancel</button>
             </div>
        </div>
    );
}

export default Logout;