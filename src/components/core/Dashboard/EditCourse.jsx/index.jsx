import { useDispatch } from "react-redux";
import CourseForms from "../AddCourses/CourseForms";
import "../AddCourses/addcourse.css";
import { useNavigate } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { LuPlus } from "react-icons/lu";

function EditCourse(){
//    console.log("edddit")
   const dispatch=useDispatch();
   const navigate=useNavigate()
   function cancelEdit(){
    dispatch(setCourse(null));
    dispatch(setEditCourse(false));
    navigate("/dashboard/my-courses")

   }
    return (<div className="add-course-wrap">
        <div className="add-course-div-1"><h1>
        Edit course
        </h1>
        <button className="common-yellow-button" onClick={cancelEdit}> Cancel edit  <LuPlus/></button>
        <CourseForms/>
        </div>

        <ul>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>

        </ul>
    </div>)
}

export default EditCourse;