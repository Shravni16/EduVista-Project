import "./wishlist.css"
import RatingStars from "../../../common/RatingStars";
import GetAvgRating from "../../../../utils/avgRating";
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
function WishlistItem(props){
    const course=props.item;
    
    
    const [rat,setRat]=useState(0);
    const dispatch=useDispatch();
    
    useEffect(()=>{
       
        function calAvgRat(){
            setRat(GetAvgRating(course?.ratingAndReview));
            
        }
    
        if(course){
            calAvgRat();
        }
     
    },[])
    function removeHandler(){
     dispatch(removeFromCart(course));
    }
   
  
return(
    <div className="wishItem-wrapper">
        <div className="wishItem-1">
            <img className="wishItem-img" src={course?.thumbnail}></img>
        </div>
        <div className="wishItem-2">
            <h2 className="wishItem-head">{course?.courseName}</h2>
            <p>{course?.category?.name}</p>
            <div className="wishItem-rat-star-count"><div>{rat}</div> <RatingStars Review_Count={rat}/><p> {course?.ratingAndReview?.length} Reviews</p></div>

        </div>
        <div className="wishItem-3">
            <button onClick={removeHandler} className="wishItem-remove-btn"><RiDeleteBin6Line />
            Remove</button>
            <div className="wishItem-amount"><MdOutlineCurrencyRupee /> {course?.price}</div>

        </div>
    </div>
)
}

export default WishlistItem;