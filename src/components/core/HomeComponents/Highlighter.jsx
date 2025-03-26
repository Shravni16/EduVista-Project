import "../../../CSS/home.css";

function Highlighter({text,fontSize,fontWeight}){
return(
    <span className="highlighter" style={{ fontSize: fontSize ,fontWeight:fontWeight }}>{text}</span>
);
}

export default Highlighter;