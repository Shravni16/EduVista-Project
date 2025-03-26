import { useEffect, useState } from "react";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars"
import "./catlog.css"
import { Link } from "react-router-dom";

function CourseCard({Course}){
    const [avg,setAvg]=useState(0);
    useEffect(()=>{
    setAvg(GetAvgRating(Course.ratingAndReview))

    },[])
    return(

    <div className="catlog-div-wrap-child">

    <Link to={`/courses/${Course._id}`}> <img className="img-size" src={Course.thumbnail}></img></Link>
    <div className="catlog-name-instructor"><p className="catlog-grid-ch-1">{Course.courseName}</p><p className="catlog-grid-ch-2">By {Course?.instructor?.firstName} {Course?.instructor?.lastName}</p></div>
   <div className="catlog-avg-star-rating"><div>{avg}</div> <RatingStars Review_Count={avg}/><p className="catlog-rating-count"> {Course.ratingAndReview.length} Ratings</p></div>
   <div className="catlog-course-price">Rs. {Course.price}</div>

    </div>
    
    );
}
export default CourseCard;