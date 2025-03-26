import { sidebarLinks } from "../../../data/dashboard-links";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import "../../../CSS/dashboard.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { VscSignOut } from "react-icons/vsc";
import { useEffect, useState } from "react";

function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  const [isblur,setIsblur]=useState(false);
  const location=useLocation();
  
useEffect(()=>{
  if(location.pathname==="/dashboard/logout"){
      setIsblur(true);
  }
  else{
      setIsblur(false);
  }
},[location.pathname])
  
  const seting={
   
    name: "Settings",
    path: "/dashboard/setting",
    icon: "VscSettingsGear",
  };

  const lgout={
    name: "Logout",
    path: "/dashboard/logout",
    icon: "VscSignOut",
  };
  

  return (
    <div className={`sidebar-wrap ${isblur ? "blurred":""}`} >
      {sidebarLinks.map((linK) => {
        if (linK.type && user?.accountType !== linK.type) {
          return null;
        }
        return <SidebarLink key={linK.id} link={linK}/>;
      })}

      <div className="hr-line-dashboard"></div>

      <SidebarLink link={seting} />
      <SidebarLink link={lgout} />
      {/* <Link to={lgout.path} className="no-underline">
      <div className={`${match?"sidebarlink-wrap active-link ":"sidebarlink-wrap inactive-link"}`} onClick={()=>(setMatch(true))} >
            <span className={`${match ?"vertical-spn span-bg-yellow ":"vertical-spn"}`}></span>
            
        
            <div className={`${match?" active-link ":" inactive-link"}`}>
            <VscSignOut/> 
        {lgout.name}</div>
       </div> </Link> */}




    
     
    </div>
  );
}

export default Sidebar;
