import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../../services/operations/ProfileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./enrolledcourse.css"
import {setCourseDetail} from "../../../../slices/viewCourseSlice"
import { useNavigate } from "react-router-dom";
import { getCompletedLecture } from "../../../../services/operations/CourseAPI";
function EnrolledCourses(){

    const [enrolledCourse,setEnrolledCourse]=useState(null);
    const [prog,setProg]=useState([]);
const {token}=useSelector((state)=>state.auth);
const {user}=useSelector((state)=>state.profile);
const navigate=useNavigate();
const {courseDetails}=useSelector((state)=>state.viewCourse);
const dispatch=useDispatch();


///ye galat hai
//  const progressPercent=user?.courseProgress?. progressPercentage;

async function fetchEnrolledCourse(){
    try{
        const response=await getUserEnrolledCourses(token);
        // console.log("enrolled course response",response)
        setEnrolledCourse(response.courses);
        setProg(response.courseProgress);
    }catch(error){
        console.log("Error in Fetching Enrolled Courses")
    }
}



useEffect(() => {
    fetchEnrolledCourse();
    // fetchProgress();
}, []);





function clickHandler(course){
    dispatch(setCourseDetail(course));
    // console.log("course detail",courseDetails);
    localStorage.setItem("courseDetails",courseDetails)
    navigate(`/view-course/${course._id}/section/${course.courseContent[0]._id}/subsection/${course.courseContent[0].subSection[0]._id}`)
}


    return (<div>
        <h2>Enrolled Courses</h2>

        <div>
           
            {
              !enrolledCourse ?(<div>Loading</div>):(
                enrolledCourse.length===0 ? (<p>You Have Not Enrolled in Any Courses</p>):(<div > <div className="ec-e-names">
                    <p>Course Name</p>
                    <p className="ec-duration">Durations</p>
                    <p className="ec-progress">Progress</p>
                </div>
                <div  className="ec-card-outer">
                { enrolledCourse.map((course,index)=>{

                  const progressOfCourse=prog?.find((prog)=>(prog?.courseId==course?._id))?.progressPercentage;
                //    console.log("Progress of course",progressOfCourse)

                    return(<div onClick={()=>clickHandler(course)} className="ec-card-wrapper" >
                        
                        <img className="ec-img ec-card-1" src={course.thumbnail}/>
                         <div className="ec-card-2">
                             <p>{course.courseName}</p>
                             <p className="ec-card-desc">{course.courseDesc}</p>
                         
                        </div>
                        <div className="ec-card-3">
                        2 hr 30 min
                        </div>
                        <div className="ec-card-4">
                     
                          <p>Progress {Math.round(progressOfCourse)} % </p> {/* pending */ }
                          <p><ProgressBar
                             completed={progressOfCourse}
                             height="8px"
                             width="220px"
                             isLabelVisible={false}
                          /></p>
                         
                          
                        </div> 
                        <div className="ec-card-5"><HiOutlineDotsVertical /></div>
                        
                      </div>)
              })}</div>
              </div>)
              )
            }
        </div>
    </div>);
}

export default EnrolledCourses;