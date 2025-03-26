import { Link, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import "../../../CSS/dashboard.css"


function SidebarLink({link}){
    const Icon=Icons[link.icon];
    const location=useLocation();


    function matchRoute(route) {
    //  console.log("Pathname:", location.pathname);
    // console.log("Route:", route);
      
        return matchPath({ path: route }, location.pathname);
      }

    
    const match=matchRoute(link?.path);

    return (
<Link to={link.path} className="no-underline">
        
        <div className={`${match?"sidebarlink-wrap active-link ":"sidebarlink-wrap inactive-link"}`} >
            <span className={`${match ?"vertical-spn span-bg-yellow ":"vertical-spn"}`}></span>
            
        
            <div className={`${match?" active-link ":" inactive-link"}`}>
            <Icon/>
        {link.name}</div>
       </div> </Link>

         );
}
export default SidebarLink;