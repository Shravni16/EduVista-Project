import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { matchPath, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./viewcourse.css"
import ReviewModal from "./ReviewModal";

function ViewCourseSideBar(){
    const {courseDetails,courseSections,totalLectures,completedLecture,courseProgress}=useSelector((state)=>state.viewCourse);
    const [currSection,setCurrSection]=useState("");
    const [currVideo,setCurrVideo]=useState("");
    const location=useLocation();
    const {sectionId,subsectionId}=useParams();
    const [reviewModal,setReviewModal]=useState(false);

    useEffect(()=>{
      if(sectionId){
        setCurrSection(sectionId)
      }
      if(subsectionId){
        setCurrVideo(subsectionId);
      }
    },[location.pathname]);
   

 function matchRoute(route) {
        //    console.log("Pathname:", location.pathname);
        // console.log("Route:", route);
            
return matchPath({ path: route }, location.pathname);
}
        
            

    
    return(
        <div className="vcsb-wrap">
            {
                reviewModal && <div className="vcsb-blur-div"></div>
            }
            <div className="vcsb-head">
                <p>{courseDetails?.courseName}</p>
                <span className="vcsb-green">{completedLecture}/{totalLectures}</span>
            </div>

            <button className="vc-btn" onClick={()=>setReviewModal(true)} >Add Review</button>
            <div >
                {/* Display sections */}
                {
                    courseSections?.map((section)=>{
                        return(
                        <div>
                            <div className="vcsb-section-name" onClick={()=>{setCurrSection(section?._id)}}>{section?.sectionName}
                               
                            </div>
                         {
                            currSection==section?._id &&  
                                section?.subSection.map((subsection)=>{
                                 return (
     
                                     
                                         // subsectionId===subsection._id &&  
                                          <Link className="vcsb-no-link" to={`/view-course/${courseDetails._id}/section/${section?._id}/subsection/${subsection?._id}`}>
                                          <div className={`${matchRoute(`/view-course/${courseDetails._id}/section/${section?._id}/subsection/${subsection?._id}`) ?"vcsb-active-subsec":"vcsb-inactive-subsec"}`}>
                                            <input 
                                             type="checkbox" readOnly
                                             checked={courseProgress?.completedVideos?.length>0 ?
                                                courseProgress?.completedVideos?.includes(subsection._id)?true:false :false}
                                            />
                                            {subsection?.title}
                                          </div></Link>
                                 
                                 );
                                }) 
                             
                             
                         }
                       
                        </div>
                       
                        );
                    })
                }
            </div>
            {
                reviewModal && <ReviewModal setReviewModal={setReviewModal}/>
            }
        </div>
    )
}

export default ViewCourseSideBar;