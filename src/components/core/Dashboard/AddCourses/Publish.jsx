import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { changeCourseStatus } from "../../../../services/operations/CourseAPI";
import CourseBtns from "../../../common/CourseBtns";




function Publish(){
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
      } = useForm();
      const dispatch=useDispatch();
    const {course,editCourse}=useSelector((state)=>state.course);
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);

      function backHandler(){
        dispatch(setStep(2));
        return;

      }
      function resetCourse(){
        dispatch(setCourse(null));
        localStorage.setItem("course",null);
        dispatch(setEditCourse(false));
        dispatch(setStep(1));
        
      }

      function saveHandler(){
        // console.log("getvalue",getValues("public"))
        // console.log("course.state",course.status)
      
        if((course.status=="Draft" && getValues("public")==false ) || (course.status=="Published" && getValues("public")==true ) ){
            toast.error("Status not changed");
            navigate("/dashboard/my-courses");
            resetCourse();
            return; 
        }
        const state= getValues("public") ? "Published": "Draft";
        
        dispatch(changeCourseStatus(course._id,state,token));
        navigate("/dashboard/my-courses");
        resetCourse();
        return; 


      }
      useEffect(()=>{
        if(course.state==="Published"){
            setValue("public",true);
        }
      },[])


    return (<div  >
    
     <div className="ci-profile-section">
     <h2 className="publish-head">Publish Setting</h2>
      <form>
        <label htmlFor="public">
            <input
           
            type="checkbox"
            name="public"
            id="public"
           
            {...register("public")}
            />
            <span className="make-course-public">Make this course as public</span>
        </label>
      </form>

      

     </div>
     <div className="flex-hr">
       <button className="no-default-btn" onClick={backHandler}><CourseBtns content="Back" isYellow={false}/></button>
       <div>    </div>
       <button className="no-default-btn" onClick={saveHandler}><CourseBtns content="Save"/></button>
   
       </div>


    </div>);
}

export default Publish;