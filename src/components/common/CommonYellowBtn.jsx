import * as icons from "react-icons/ri";


function CommonYellowBtn({content,Child}){

    var Icon=null;
    if(Child){
        Icon=icons[Child];
        // console.log("Icon",Icon);
    }
    return(
        <button className="common-yellow-button">

{content}
{Child &&  Icon && <Icon/> }
        </button>
    );
}

export default CommonYellowBtn;