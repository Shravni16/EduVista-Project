import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { IoMdTime } from "react-icons/io";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import "./mycourses.css"
import { setAddCourse, setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../common/Loader";
import { deleteCourseHandler ,getInstructorCourse} from "../../../../services/operations/CourseAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { formattedDate } from "../../../../utils/dateFormatter";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


function CoursesTable({courses,setCourses}){
    const [loading,setLoading]=useState(false);
    const [confirmModel,setConfirmModel]=useState(null);
    const { course, editCourse,addCourse } = useSelector((state) => state.course);
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const {token}=useSelector((state)=>state.auth)
    function editNavigateHnadler(course){
        // console.log("edit navigate handler data",course);
        course.instructions=JSON.parse(course.instructions);
        course.tag=JSON.parse(course.tag);
        // console.log("after edit navigate handler data",course);
         dispatch(setCourse(course));
         dispatch(setEditCourse(true));
         const id=course._id;
          dispatch(setAddCourse(false));
         navigate(`/dashboard/edit-course/${id}`);
    }
    function cancelHandler(){
        setConfirmModel(null);
    }
   

    async function removeCourseHandler(courseId){
        setLoading(true);
        try{
            await deleteCourseHandler(courseId,token);
            const res=await getInstructorCourse(token);
            setCourses(res);
        }catch(error){
            console.log(error)
        }
        setLoading(false)
        setConfirmModel(null);
    }

return (<div> {
    
    loading ? (<Loader/>):(
        <div>{
            courses.length===0 ? (<div>No course Found</div>) :(<div>
                <Table>
                    <Thead >
                        <Tr className="start" >
                            <Th className="self-align-th"></Th>
                            
                            
                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            courses.map((course)=>{
                            return (
                              
                                <Tr key={course._id} className="t-body">
                               
                                <Td>
                                    <div className="flex-horizontal">
                                   
                                        <img src={course.thumbnail} className="image-sizee"/>
                                        <div className="small-prt">
                                           <p> {course.courseName}</p>
                                           <p>{course.courseDesc}</p>
                                           <p><span className="price"> Rs. {course.price}</span>Created at { formattedDate(course.createdAt)}
                                          
                                           </p>
                                           
                                           {/* <p>{course.status}</p> */}
                                          <div className={course.status=="Draft" ? "red-text" :"yellow-text"}>
                                          <span>{
                                             course.status=="Draft" ? (<IoMdTime />) :(<MdOutlinePublishedWithChanges />)
                                            }</span>
                                            
                                            {course.status}
                                          </div>
    
                                        </div>
                                    </div>
                                    {
        confirmModel && <ConfirmationModal confirmModel={confirmModel} setConfirmModel={setConfirmModel}/>
    }
                                </Td>
                               
                                
                                <Td>
                                    <div className="two-edit-delete-btn">
                                        <button className="edit-btn-table" disabled={loading} onClick={()=>{editNavigateHnadler(course)}}>Edit <MdEdit /></button>
                                        <button className="delete-btn-table" disabled={loading} onClick={()=>{setConfirmModel({
                text1:"Do you want to delete Course?",
                text2:"This action can not be undone!",
                firstHandler:loading?()=>{}:()=>(cancelHandler()),
                secondHandler:loading?()=>{} : ()=>( removeCourseHandler(course._id)),
            btn1:"Cancel",
        btn2:"Delete",        })}}>Delete <MdDeleteOutline /></button>
                                       
                                    </div>
                                   
                                </Td>
                                </Tr>
                            )
                           
                            })
                        }
                    </Tbody>
                </Table>
            </div>)
        }</div>
    )}
   
    
   
</div>)
}

export default CoursesTable;