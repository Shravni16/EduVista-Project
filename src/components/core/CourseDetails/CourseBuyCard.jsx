import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropright } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import {addToCart} from "../../../slices/cartSlice"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal"
import { enrollStudentInCourses } from "../../../services/operations/CourseAPI";

function CourseBuyCard({course}){
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    // const {cart}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmModel,setConfirmModel]=useState(null);

    function shareHandler(){
        copy(window.location.href);
        toast.success("Copied to clipboard!")
    }
    function addCartHandler(){
        if(user && user.accountType==="Instructor"){
            toast.error("You are Instructor, can not add to cart!");
            return;
        }
        if(token){
         dispatch(addToCart(course));
         navigate("/dashboard/wishlist");
         return;

        }
        setConfirmModel({
            text1:"Login to Add to cart"
            ,text2:"Can Not Add to cart, Login First"
            ,firstHandler:()=>(navigate("/login"))
            ,secondHandler:()=>(setConfirmModel(null))
            ,btn1:"Go to Login"
            ,btn2:"Cancel"
        })
        
    }
    async function buyCourseNow(){
        let courses=[];
        courses.push(course);
       const res=await enrollStudentInCourses(courses,token);
    //    console.log("response of buy",res);
       navigate("/dashboard/enrolled-courses");
    }
    function buyHandler(){
        if(course?.studentsEnrolled?.includes(user._id)){
            navigate("/dashboard/enrolled-courses");
            return
        }else{
            setConfirmModel({
                text1:"Buy Course Now",text2:"Are you sure to buy this course?",
                firstHandler:()=>(buyCourseNow()),
                secondHandler:()=>(setConfirmModel(null)),btn1:"Yes",btn2:"No"
            })
        }
       
      
    }
    return(
        <div className="cbc-card-wrap">
            <img className="cbc-thumbnail-image" src={course?.thumbnail}></img>
            <h1 className="cbc-course-price">Rs. {course?.price}</h1>
            {/* <button disabled={confirmModel} onClick={buyHandler} className="cbc-buy-now-btn">{course?.studentsEnrolled?.includes(user._id) ? "Go To Course" : "Buy Now"}</button>
          {
            !course?.studentsEnrolled?.includes(user._id) && <button className="cbc-add-to-cart" onClick={addCartHandler}>Add to Cart</button>
          } */}
        {
            user.accountType==="Student" &&    (<div className="wrap-of-buy-cart">
                <button disabled={confirmModel} onClick={buyHandler} className="cbc-buy-now-btn">{course?.studentsEnrolled?.includes(user._id) ? "Go To Course" : "Buy Now"}</button>
            {
              !course?.studentsEnrolled?.includes(user._id) && <button className="cbc-add-to-cart" onClick={addCartHandler}>Add to Cart</button>
            }
            </div>)
        }
          
          
            
            <p className="cbc-garuntee">30-Day-Money-Back-Garuntee</p>
            <p className="cbc-this-course-para">This Course Includes : </p>
            <div className="cbc-arrow-list-wrap">
                
              
                {
                    course?.instructions?.map((req)=>{
                        return (<div className="cbc-arrow-list"><div><IoMdArrowDropright /></div><div>{req}</div></div>)
                    })
                }
            </div>
            <div className="cbc-share-icon-wrap" onClick={shareHandler}><FaRegShareFromSquare /><span>Share</span></div>
            {
                confirmModel && <ConfirmationModal confirmModel={confirmModel}/>
            }
        </div>
    )
}

export default CourseBuyCard;