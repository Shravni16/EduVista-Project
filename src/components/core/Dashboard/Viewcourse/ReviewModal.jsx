import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { createRatingAndReview } from "../../../../services/operations/CourseAPI";
function ReviewModal({setReviewModal}){
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
      } = useForm();
      const {courseDetails}=useSelector((state)=>state.viewCourse);
      const {user}=useSelector((state)=>state.profile);
      const {token}=useSelector((state)=>state.auth)

      useEffect(()=>{
          setValue("customerRating",0);
          setValue("customerReview",null);
      },[]);
      function ratingChanged(newRating){
        setValue("customerRating",newRating);
      }
      function cancelHander(){
        setReviewModal(false);
      }

       function submitHandler(data){
        // console.log("rating review courseId",data.customerRating,data.customerReview,courseDetails._id);
        createRatingAndReview(courseDetails._id,data.customerRating,data.customerReview,token)
        setReviewModal(false)
       }
    return(<div className="rm-wrap">
        <div className="rm-heading-div">
            <p>Add review</p>
            <div onClick={cancelHander}><RxCross2 /></div>
        </div>
        <div className="rm-img-name-div">
           
                <img src={user?.image} className="rm-profile-img"></img>
                <div className="rm-name-public">
                <span className="rm-name">{user?.firstName}{" "}{user?.lastName}</span>
                <p className="rm-public">Posting Publicaly</p>
            </div>

            
        </div>

        <div >
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="rm-form-wrap">
            <ReactStars
            required
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />  </div>
  <div className="rm-label-inp">
  <label className="rm-label">Add your Review *</label>
  <textarea
className="rm-inp"
    type="text"
    cols="30"
              rows="7"
    {...register("customerReview",{required:true})}
    placeholder="Share Details of your own experience for this course"
  />
  {
    errors.customerReview && 
    (  <span>Please Give review for course</span>)
  }
  </div>
 <div className="rm-2-btn">
 <button className="rm-btn rm-cancel-btn" onClick={cancelHander}>Cancel</button>
 <button className="rm-btn rm-submit-btn ">Submit</button>
 </div>
  
           
        
        </form>
        </div>

    </div>)
}

export default ReviewModal;