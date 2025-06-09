import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoursePageDetail } from "../../../services/operations/CourseAPI";
import { useSelector } from "react-redux";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formattedDate } from "../../../utils/dateFormatter";
import { PiGlobe } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import "./coursedetail.css"
import CourseBuyCard from "./CourseBuyCard";
import { useNavigate } from "react-router-dom";

function CourseDetailPage(){
    const {courseId}=useParams();
    const [course,setCourse]=useState(null);
    const {token}=useSelector((state)=>state.auth);
    const [rat,setRat]=useState(0);
    const [isOpenArr,setIsOpenArr]=useState([]);
    const navigate=useNavigate();
   function handleOpen(sectionId){
    setIsOpenArr((prevIsOpenArr) => {
        if (prevIsOpenArr.includes(sectionId)) {
        
          return prevIsOpenArr.filter(id => id !== sectionId);
        } else {

          return [...prevIsOpenArr, sectionId];
        }
      });
   }
   function colapseHandler(){
    setIsOpenArr([])
   }

    useEffect(()=>{
        if(!token){
            navigate("/not-found")
        }
        async function courseDetail(){
            try{
                const res=await getCoursePageDetail(courseId,token);
                // console.log(res)
            setCourse(res);
            }catch(error){
                // console.log(error);
            }
        }

        function calAvgRat(){
            setRat(GetAvgRating(course.ratingAndReview));
            
        }
     if(courseId){
        courseDetail();
        if(course){
            calAvgRat();
        }
     }
    },[])

    return (
        <div className="courseDetailPage-wrapper">
           <div>
           <section className="cdp-section-1">
                <h1 className="cdp-course-heading">{course?.courseName}</h1>
                <p className="cdp-course-desc">{course?.courseDesc}</p> 
                <div className="catlog-avg-star-rating cdp-rat-star-rev"><div>{rat}</div> <RatingStars Review_Count={rat}/><p> ({course?.ratingAndReview?.length} Reviews) {course?.studentsEnrolled?.length} Students Enrolled</p></div>
                <p>Created By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <p className="cdp-createdat"><IoMdInformationCircleOutline /> Created at {formattedDate(course?.createdAt)} | <PiGlobe /></p>
                <div className="cdp-hr-line"></div>
            </section>
           

            <section className="cdp-section-2">
                <div className="cdp-what-you-learn-div">
                <h2 className="cdp-what-you-learn-heading">
                    What you'll learn
                </h2>
                <p className="cdp-what-you-learn-para">{course?.whatYouWillLearn}</p>
                </div>
                <div className="cdp-course-cont-sec">
                <h3 className="cdp-course-cont-head">Course Content</h3>
                <p className="cdp-course-cont-para-coll-btn">
                    {course?.courseContent?.length} sections <span><button className="cdp-collapse-btn" onClick={colapseHandler}>Collapse All Sections</button></span>
                </p>
                </div>
                <div className="collapse-wraper">
                    
                    {
                        course?.courseContent ?.map((section)=>{
                            return (<div key={section._id} className="cdp-section-wrapper">
                               <div onClick={()=>handleOpen(section._id)} className="cdp-section-wrap-child">
                                
                            <div className="sec-name-lec-len">
                                 <div className="cdp-arrow-secname-div"> 
                                 <div className={` icn ${isOpenArr.includes(section._id) ? "upArrow" :"downArrow"}`} > <FaChevronDown /></div>  <span>{section.sectionName}</span></div>  <span>{section.subSection.length} Lectures</span></div></div>
                                 
                                {
                                  section.subSection.map((subsec)=>{ 
                                        return(
                                            <div className={`  secblock ${isOpenArr.includes(section._id) ? "openSec" :"closeSec"}`} key={subsec._id}> {subsec.title} </div>
                                        )
                               
                                    })
                                }
                            </div>)
                    })
                }
                    
                </div>
            </section>
            <div className="cdp-author-img-name-wrap">
              <h2 className="cdp-author-head"> Author </h2>
              <div className="cdp-author-img-name">
                <img className="cdp-author-img" src={course?.instructor?.image}></img>
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
              </div>
            </div>
           </div>
           <div>
           <CourseBuyCard course={course} />
           </div>
        </div>
    )
}
export default  CourseDetailPage;
