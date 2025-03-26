
import { Link } from "react-router-dom";
import "../../../CSS/home.css"

function YellowBlackBtn(props){
    let content=props.content;
    let isYellow=props.isYellow;
    let linkTo=props.linkTo;
    // console.log(linkTo);
    return (
        <Link to={linkTo} className="no-underline">
        <div className={`yellowBlackBtn ${isYellow ? "yellowBtn":"blackBtn"}`}>
            {content}
        </div>
        </Link>
    );
}

export default YellowBlackBtn;