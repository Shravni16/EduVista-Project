import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import "./profiledropdown.css"

function ProfileDropDown(){
    const [showDropDown,setShowDropDown]=useState(false);
    const {user}=useSelector((state)=>state.profile);
    // console.log("User in Profile :",user);
    const userImg=user.image;
    // console.log("User Image",userImg);
    const ddItems=[{
        name:user.firstName+" "+user.lastName,
        Icon:<VscAccount/>,
        path:"/dashboard/my-profile"

    },
{
    name:"Dashboard",
    Icon:<MdDashboardCustomize/>,
    path:"/dashboard/instructor"
},
{
    name:"Log Out",
    Icon:<IoIosLogOut/>,
    path:"/dashboard/logout"
}];
const handleLinkClick = () => {
    setTimeout(() => {
        setShowDropDown(false);
    }, 100); // Adjust delay as needed
};

function blurHandler(e){
   
    setShowDropDown(false); 
    // console.log("show drop down blur",showDropDown); 
}

useEffect(()=>{
// console.log("UseEffect Show drop down",showDropDown);
},[showDropDown]);

    return(<div  className="relative">

 {/* Add onBlur event handler */}

            <div onClick={() => {setShowDropDown(!showDropDown); 
                    // console.log("show drop down change",showDropDown);
                    } }  > 
                <img className="dropdown-img" src={userImg} alt="User Profile"/> 
                <MdArrowDropDown className="down-arrow" />
            </div>
            


{
    showDropDown && (<div className="dropdown-box pdd-design" >
    {
        ddItems.map((item, index)=>{
            if(item.name=="Dashboard" && user.accountType=="Student"){
             return ;
            }
            return (<Link key={index} to={item.path} onClick={handleLinkClick} className="no-udline">
    
                <div className="pdd-icon-name" >
                    <span>
                        {item.Icon}
                    </span>
                    <span className="pdd-name">
                        {item.name}
                    </span>
                </div>
                    </Link>);
           
        })
    }
</div>)

}





</div>);
}

export default ProfileDropDown;