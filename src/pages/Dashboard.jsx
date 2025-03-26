import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar"
import "../CSS/dashboard.css"
import { useEffect, useState } from "react";
import { LuAlignJustify } from "react-icons/lu";

function Dashboard(){
    const [showSidebar,setShowSidebar]=useState(true);

    function clickHandler(){
        setShowSidebar(!showSidebar);
    }
 
    return(<div className={`dashboard-wrap `}>
  
       {
        showSidebar &&  <Sidebar  />
       }
    
            
        
        <div className="outlet-wrap">
            <div className="sidebar-icon" onClick={clickHandler}>
            <LuAlignJustify />
            </div>
        

          <Outlet/>
        </div>
    </div>)
}

export default Dashboard;