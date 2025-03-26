import * as icons from "react-icons/ri";


function CourseBtns({content,Child,isYellow=true}){

    var Icon=null;
    if(Child){
        Icon=icons[Child];
        // console.log("Icon",Icon);
    }
    return(
        <button  className={`courseBtns ${isYellow ? "yellowBtn":"blackCourseBtn"} ` } >

{content}
{Child &&  Icon && <Icon/> }
        </button>
    );
}

export default CourseBtns;