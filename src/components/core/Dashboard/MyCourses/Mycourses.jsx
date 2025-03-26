
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader"
import { LuPlus } from "react-icons/lu";
import {  useDispatch, useSelector } from "react-redux";
import { getInstructorCourse } from "../../../../services/operations/CourseAPI";
import CoursesTable from "./CoursesTable";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import "./../../../../CSS/dashboard.css"

function Mycourses(){
    const {token}=useSelector((state)=>state.auth);
    // const [confirmModal,setConfirmModal]=useState(null)
    const [courses,setCourses]=useState([]);
   const dispatch=useDispatch();
   const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    // const {GET_INSTRUCTOR_COURSE}=courseEndpoints;

    useEffect(()=>{
      
        async function getCourse(){
            setLoading(true);
            const res=await getInstructorCourse(token);
            setCourses(res);
            // console.log(res);
            setLoading(false);
        }
        getCourse();

     
    },[])
    function addCourseHandler(){
        dispatch(setCourse(null));
        dispatch(setEditCourse(null));
        navigate("/dashboard/add-course")
    }

    return(<div className="my-course-wrap">
       {
        loading ? (<Loader/>) :(<div>
             <div className="space-betwn">
        <h1>My courses</h1>
       <button className="common-yellow-button" onClick={addCourseHandler}> Add courses  <LuPlus/></button>
        </div>
        {/* {
            courses.length===0 ? (<div>zero</div>) :(<div>{
                courses.map((course)=>{
                    return(
                        <div key={course._id}>{course.courseName}</div>
                    )
                })
            }
            </div>)
        } */}
        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
        </div>)
       }
    </div>)
}
export default Mycourses; 