// import { Link } from "react-router-dom";

// function ResetComplete (){
//     return (
//         <form>
//             <h1>Reset complete!</h1>
//             <p>All done! We have sent an email to ***********@gmail.com to confirm</p>
//             <button>Return to Login</button>
//             <Link to="/login"><span>Back to login</span></Link>
            
//         </form>
//     );
// }

// export default ResetComplete;
import { Link } from "react-router-dom";
import "./resetComplete.css"; 

function ResetComplete() {
  return (
    <div className="reset-complete-container">
      <form className="reset-complete-form">
        <h1 className="form-heading">Reset complete!</h1>
        <p className="form-text">
          All done! We have sent an email to ***********@gmail.com to confirm.
        </p>
        
        <Link to="/login" className="back-to-login">
        <button className="submit-button">Return to Login</button>
        </Link>
      </form>
    </div>
  );
}

export default ResetComplete;
