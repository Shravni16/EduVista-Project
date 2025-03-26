import { useEffect } from "react";
import ViewCourseSideBar from "./ViewCourseSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedLecture, getCoursePageDetail } from "../../../../services/operations/CourseAPI";
import { setCompletedLecture, setCourseDetail, setCourseProgress, setCourseSections, setTotalLectures } from "../../../../slices/viewCourseSlice";
import getNumberOfLectures from "../../../../utils/getNoOfLect";
const { Outlet, useParams } = require("react-router-dom");



function ViewCourse(){
    const {courseDetails}=useSelector((state)=>state.viewCourse);
    const {courseId,sectionId,subsectionId}=useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch()
    useEffect(()=>{
    //  console.log("courseeee detail",courseDetails);
    async function getAllData(){

        //get full course details
       const res= await getCoursePageDetail(courseId,token);
    //    console.log("course ka response",res);
       dispatch(setCourseDetail(res));

       //set sections in course
       let sections=res?.courseContent;
       dispatch(setCourseSections(sections));

       //set Total no. of lectures
       let lecNo=getNumberOfLectures(sections);
       dispatch(setTotalLectures(lecNo));
       
      
       // completed lectures
       const resp=await getCompletedLecture(courseId,token);
    //    console.log("detailllsss ",resp)
       let completedLen=resp.completedVideos.length;
       dispatch(setCourseProgress(resp));
       dispatch(setCompletedLecture(completedLen));


       
       
    }
    getAllData();


    },[courseId,sectionId,subsectionId])
    return(<div className={`dashboard-wrap `}>


        <ViewCourseSideBar />
        <div className="outlet-wrap">
            
        

          <Outlet/>
        </div>
    </div>)
}

export default ViewCourse;