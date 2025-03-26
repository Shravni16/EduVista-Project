import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../services/operations/ProfileAPI";


function DeleteAccount(){
   const {token}=useSelector((state)=>state.auth);
   const dispatch=useDispatch();
   const navigate=useNavigate();

    function deleteHandler(){
     dispatch( deleteAccount(token,navigate));
    }
    
    return (
        <div className="delete-cont">
<div>
    <div className="delete-circle" onClick={deleteHandler}>
<RiDeleteBin6Line className="delete-icon"/></div>
</div>
<div className="delete-cont-2">
    <h3 className="delete-cont-head">
    Delete Account
    </h3>
   <div>
   <p className="delete-cont-para">Would you like to delete account?</p>
    <p className="delete-cont-para">This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
   </div>
    <p className="delete-cont-i"><i>I want to delete my account.</i></p>
</div>
        </div>
    );
}

export default DeleteAccount;