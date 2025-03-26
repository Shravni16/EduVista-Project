import React, { useEffect, useState } from "react";
import eduvistaLogo from "../../assets/Logo/eduvista-LOGO.jpeg";
import "../../CSS/navbar.css";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const location = useLocation();
  function matchRoute(route) {
    // console.log("Pathname:", location.pathname);
    // console.log("Route:", route);

    return matchPath({ path: route }, location.pathname);
  }

  const [isblur,setIsblur]=useState(false);

  
useEffect(()=>{
  if(location.pathname==="/dashboard/logout"){
      setIsblur(true);
  }
  else{
      setIsblur(false);
  }
},[location.pathname])

  const [subLinks, setSubLinks] = useState([]);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Result",result);
      // console.log("Result-data",result.data.Categories)
      setSubLinks(result.data.Categories);
    } catch (error) {
      console.log("could not fetch category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (<div className={`  ${isblur ? "blurred":""} display-flex flex-col nav-wrapper `}>
    <div className="display-flex width-11-12 nav-wrap-min">
      <div className="logo">
        <img className="image " src={eduvistaLogo} />
      </div>
      <div>
        {/* Home,contactus,about,category */}
        <nav className="display-flex nav-part-2">
          { NavbarLinks.map((link, index) =>
            link.title === "Catalog" ? (
              <div className="parent " key={index}>
                <p className="child relative display-flex align-item-center">{link.title} <IoIosArrowDropdownCircle /></p>
                <div className="hover-content absolute">
                  <div className="diamond"></div>
                  <div className="cat ">
                    {
                  subLinks.map((cat,index)=>(<Link to={`/catalog/${cat.name}`} key={index}><div className="cat-child" >{cat.name}</div></Link>))
                    }</div>
                </div>
              </div>
            ) : (
              <Link
                className={`no-decoration ${
                  matchRoute(link.path) ? "yellow-nav" : "white-nav"
                }`}
                to={link?.path}
                key={index}
              >
                {link?.title}{" "}
              </Link>
            )
          )}
        </nav>
      </div>
      <div>
      <div className="display-flex gap-15">
        
        <div>
        {
          //Error can be here dont know wheather role or accounttype
          user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/wishlist" className="relative ">
              <AiOutlineShoppingCart className="cart"/>
              {totalItem > 0 && <span className="cart-total-item">{totalItem}</span>}
            </Link>
          )
        }</div>
          <div>
        {token != null && <ProfileDropDown />}</div></div>
        {/* Login/Signup */}

      
        <div className="btn-wrap">
          
        {token == null && (
          <Link to="/login">
            <button className="login-signup-btn">Log In</button>
          </Link>
        )}
        {token == null && (
          <Link to="/signup">
            <button className="login-signup-btn">Sign Up</button>
          </Link>
        )}</div>
       
        
      </div>
     
    </div>
    <div className="hr-line"></div>

   
    </div>
  );
}
export default Navbar;
