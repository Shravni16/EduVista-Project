import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";
import "./wishlist.css"
import { enrollStudentInCourses } from "../../../../services/operations/CourseAPI";
import { emptyCart } from "../../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useState } from "react";


function Wishlist(){
    const {cart,totalItem,totalAmount}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmModel,setConfirmModel]=useState(null);
     async function buyAllCoursehandler(cart){
        try{
            const res=await enrollStudentInCourses(cart,token);
            // console.log("respppp",res)
            dispatch(emptyCart());
            navigate("/dashboard/enrolled-courses")
        }
        catch(error){
            console.log(error);
        }
       

    }

    function buyHandler(){
        setConfirmModel({
            text1:"Buy All Courses Now",text2:"Are you sure to buy all these courses?",
            firstHandler:()=>(buyAllCoursehandler(cart)),
            secondHandler:()=>(setConfirmModel(null)),btn1:"Yes",btn2:"No"
        })
    }


    return (
        <div className="wishIdx-wraper">
         <div className="wishIdx-part-1">
           <h1>My WishList</h1>
            <p>{totalItem} Courses in WishList</p>
            <div className="wishIdx-hr-line"></div>
             {
            totalItem===0 ?(<p>No Courses in wishlist</p>):( <div>
               <div className="wishIdx-part-1-items-wrap"> 
                {
                    cart.map((item)=>{
                        // console.log("course item",item)
                        return (<div>
                          
                            <WishlistItem item={item}/>
                        </div>)
                    })
                }
               </div>

               <div></div>
                </div>)
           }
             
           </div>
          
           <div className="wishIdx-part-2">
            <p className="wishIdx-part-2-total">Total</p>
            <h1 className="wishIdx-part-2-amount">Rs. {totalAmount}</h1>
            <button className="wishIdx-part-2-buy-now" onClick={buyHandler}>Buy Now</button>
           </div>
           {
                confirmModel && <ConfirmationModal confirmModel={confirmModel}/>
            }
        </div>
    );
}

export default Wishlist