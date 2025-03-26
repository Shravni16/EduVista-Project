import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { useDispatch } from "react-redux";
import { createSectionFunction ,editSectionHander} from "../../../../services/operations/CourseAPI";
import CourseBtns from "../../../common/CourseBtns";
import { setEditCourse, setStep } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";
import NestedSection from "./NestedSection";
import LoaderForCI from "./LoaderForCI";


function CourseBuilder() {
  const { course, loading } = useSelector((state) => state.course);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSection, setEditSection] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  async function submitHandler() {
    const data = getValues();
    if (editSection) {
    //    setValue("sectionName",editSection.sectionName);
     const result = await dispatch(editSectionHander(data.sectionName,editSection._id, course._id,token));
     setEditSection(null);
     setValue("sectionName","");

    } else {
      const result=await dispatch(createSectionFunction(data.sectionName, course._id, token));
      setValue("sectionName","");
    //   setEditSection(section);
    //   console.log("edit section",section);
    }
  }
  function backClick(){
    // dispatch(setEditCourse(true));
   dispatch(setStep(1));
  }

  function nextClick(){
   if(course.courseContent.length ===0){
    toast.error("Please Create atleast one section ");
    // 
    return;
   }
   if(course.courseContent.some((section)=>section.subSection.length===0)){
    toast.error("Please add atleast 1 lecture in each section");
    return;
   }
   
   dispatch(setStep(3));
  }

  useEffect(()=>{
  if(editSection){
    setValue("sectionName",editSection.sectionName);
  }
  },[editSection])
  return (
    <div   >
      {loading ? (
          <LoaderForCI />
       
      ) : (
        <>
          <div className="course-builder-wrap ci-profile-section">
          <h1>Course Builder</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <input
              className="ci-dash-imp thodi-width"
              id="sectionName"
              name="sectionName"
              type="text"
              placeholder="Enter Section Name"
              {...register("sectionName", { required: true })}
            />
            {errors.sectionName && <p>Please enter Section Name</p>}

            <button type="submit" className="btn-cover">
              <IoMdAddCircleOutline />
              <span>{!editSection ? "Create Section" : "Edit Section"}</span>
            </button>
          </form>
          <NestedSection editSection={editSection} setEditSection={setEditSection} />
         </div>
         
       <div className="flex-hr">
       <button className="no-default-btn" onClick={backClick}><CourseBtns content="Back" isYellow={false}/></button>
       <div>    </div>
       <button className="no-default-btn" onClick={nextClick}><CourseBtns content="Next"/></button>
   
       </div>
        </>
      )}
    </div>
  );
}

export default CourseBuilder;
