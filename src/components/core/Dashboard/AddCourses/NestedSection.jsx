import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import ModalForNested from "./ModalForNested";
import {useDispatch,} from "react-redux"
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import {delelteSectionHander,deleteSubSectionFunction} from "../../../../services/operations/CourseAPI"
import ConfirmationModal from "../../../common/ConfirmationModal";



function NestedSection({editSection, setEditSection}){
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const [add,setAdd]=useState(false);
    const [view,setView]=useState(false);
    const [edit,setEdit]=useState(false);
   const [selSection,setSelSection]=useState(null);
   const [selSubSection,setSelSubSection]=useState(null);
   const [confirmModel,setConfirmModel]=useState(null);
 
 
   const dispatch=useDispatch();
   useEffect(()=>{
   
   },[course])
  
    // console.log("Subection",course?.courseContent);
    function addLectureHandler(sectionId){
        
        setAdd(true);
        setSelSection(sectionId);
      
    }

    function viewlectureHandler(subSec){
        setSelSubSection(subSec);
        setView(true);
     }
     function editHandler(sectionId,subSec){
            setSelSection(sectionId);
            setSelSubSection(subSec);
            setEdit(true)

    }

    function editOnHandler(section){
         setEditSection(section);
        // console.log("data",sectionId)
    }
    function viewSet(){
        setView(false);
       
    }
    function cancelHandler(){
        setConfirmModel(null);
    }
    function removeSubsecHandler(sectionId,subsectionId){
     
        dispatch(deleteSubSectionFunction(subsectionId,sectionId,token,course));
        setConfirmModel(null);
    }

    function removeSecHandler(secId){
        const courseId=course._id;

     dispatch(delelteSectionHander(secId,courseId,token));
    //  console.log("section deleted ")
     setConfirmModel(null)
    }
    return(<div >
        <div className={`${confirmModel?"blur":""}`}></div>
           {
                course.courseContent?.map((section)=>{
                 
                    return (
                        <div className="name-edit">
                            <div ><details  >
                             
                            <summary > <div className="flx-btn-gap width-200px"> {section.sectionName} 
                             <div className="flex-hr">
                             <div onClick={()=>{editOnHandler(section)}}><CiEdit />
    </div>
    <div onClick={()=>{

        setConfirmModel({
            text1:"Do you want to delete Section ?",
            text2:"This action can not be undone!",
            firstHandler:()=>(cancelHandler()),
            secondHandler: ()=>(removeSecHandler(section._id)),
        btn1:"Cancel",
    btn2:"Yes",        })
    }} ><AiOutlineDelete /></div>
                             </div></div></summary>
                             <div className="faint-line"></div>
    
                            
                             {
                                 section.subSection?.map((subSec)=>{
                                   
                                     return (
                                       
                                            <div> <div className="invisible-squre"> </div>
                                            <div className="flx-btn-gap">
                                             <summary className="flex-hr padding-left"><div  onClick={()=>(viewlectureHandler(subSec))}>{subSec.title}</div> 
                                            
                                             </summary>
                                             <div className="flex-hr">
                                                
                                                <div onClick={()=>(editHandler(section._id,subSec))}><MdOutlineModeEdit /></div> 
                                                
                                                <div onClick={()=>{

setConfirmModel({
    text1:"Do you want to delete SubSection ?",
    text2:"This action can not be undone!",
    firstHandler:()=>(cancelHandler()),
    secondHandler: ()=> (removeSubsecHandler(section._id,subSec._id)),
btn1:"Cancel",
btn2:"Yes",        })
}}><RiDeleteBin6Line /></div>
                                                </div>
                                                </div>
                                            
                                               
                  
                
                   
                   </div>
                                       
                                     )
                             
                                     
                                 })
                             }
                            
     
                           <div className="add-lecture-wrap" onClick={()=>(addLectureHandler(section._id))}>
                             <IoMdAdd />
                   <span>Add Lectures</span>
                   {/* {
                     add &&  <ModalForNested  add={add}setAdd={setAdd} oldsectionId={section._id} course={course} view={view}  setView={setView} setEdit={setEdit} edit={edit} subSec={null} viewSet={viewSet}  />  } */}
                   </div>
                  
                 
                         </details>
                                </div>
                                <div className="dark-line"></div>
                            </div>
                    )
                })
            }
                                 
                                 {
                     (add || view ||edit) && <ModalForNested  add={add}setAdd={setAdd} oldsectionId={selSection} course={course} view={view}  setView={setView} setEdit={setEdit} edit={edit} subSec={selSubSection} viewSet={viewSet}/>
               
                   }
        
             {
                confirmModel && <ConfirmationModal confirmModel={confirmModel}/>
             }  
    </div>)

}

export default NestedSection;