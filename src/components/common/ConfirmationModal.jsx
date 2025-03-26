import "../../CSS/home.css"
import CommonYellowBtn from "./CommonYellowBtn";
function ConfirmationModal ({ confirmModel}){
    const {text1,text2,firstHandler,secondHandler,btn1,btn2}=confirmModel;
    return (
        <div>
             <div className= "unblur-logout">
           <h3> {text1}</h3>
              <p>{text2}</p>
             <div className="flx-hor-row">
                <div  onClick={firstHandler}><CommonYellowBtn content={btn1} /></div>
             
             <button onClick={secondHandler} className="grey-btn">{btn2}</button>
             </div>
        </div>
        </div>
    )
}

export default ConfirmationModal;