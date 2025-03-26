import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createSubSectionFunction } from "../../../../services/operations/CourseAPI";
import { useState } from "react";
import { useEffect } from "react";
import { updateSubSectionFunction } from "../../../../services/operations/CourseAPI";
import "./addcourse.css";
function ModalForNested({add,setAdd,oldsectionId, course, view, setView,setEdit,edit,subSec,viewSet}){
 
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
      } = useForm();
    function closeHandler(){
        setAdd(false); 
         setEdit(false);
        setView(false);
        
    }
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    function submitHandler(){
      const data=getValues();
       if(add){
     
        // console.log("Video url",data.videoURL);
      dispatch(createSubSectionFunction(data.title,data.videoURL[0],data.duration,data.description,oldsectionId,token,course._id));
      setAdd(false);
       }else if(edit){
        let videoFile;
       if(data.videoURL===subSec.videoURL){
        videoFile= subSec.videoURL;
        // console.log("matched",videoFile);
       }else{
        videoFile=data.videoURL[0];
        // console.log("not matched",videoFile);
       }
        // console.log("data.videoURL[0]",data.videoURL);
        // console.log("subSec.videoURL",subSec.videoURL);
        dispatch(updateSubSectionFunction(data.title,videoFile,data.duration,data.description,subSec._id,token,course._id));
        setEdit(false)
       }
    
    }
    useEffect(()=>{
      if(view || edit){
        setValue("title",subSec.title);
        setValue("description",subSec.description);
        setValue("videoURL",subSec.videoURL);
        setValue("duration",subSec.duration);
      }
    },[])
return(<div className="modal-wrapper black-text">
    <div className="modal">
  <div className="grey-bg">
  <button className="close-btn-cross" onClick={closeHandler}><RxCross2 /></button>
        
            { add && <h1>Adding Lecture</h1>}
            {view && <h1>Lecture Information</h1>}
            {edit && <h1>Edit lecture</h1>}
  </div>   <form onSubmit={ handleSubmit(submitHandler)}>
            <label htmlFor="title" className="lil-margin">Title</label>
            <input
            readOnly={view}
             className="dash-imp input-lil-margin"
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
         
            { ...register("title",{required:true})}
            />
             {!view  && errors.title && <p>Please enter Title</p>}


<label htmlFor="description" className="lil-margin">Description</label>
            <input
             className="dash-imp  input-lil-margin"
            type="description"
            id="description"
            name="description"
            placeholder="Enter description"
           
            readOnly={view}
            {...register("description",{required:true})}
            />
            {!view  && errors.description && <p>Please enter description</p>}
            {
              (view || edit) && subSec?.videoURL && <div className="fixed-size">
                <h3>Video is playing</h3>
                
                  
                    <video
                      className="fixed-size"
                      controls
                      autoPlay
                      src={subSec.videoURL}
                    >
                      Your browser does not support the video tag.
                    </video>
                  
                
              </div>
            }
            {
              !view && <div><label htmlFor="videoURL" className=" lil-margin  ">
              <div>
                Video Lecture<sup>*</sup>
              </div>
            </label>
            <input
              className="dash-imp extra-fix  input-lil-margin"
              type="file"
              name="videoURL"
              id="videoURL"
              placeholder="Upload Lecture"
              readOnly={view}
              {...register("videoURL")}
            /></div>
            }
            {!view && errors.videoURL && <span>Please Upload Lecture</span>}
          
            <label htmlFor="duration" className="lil-margin">Duration</label>
            <input
             className="dash-imp  input-lil-margin"
            type="text"
            id="duration"
            name="duration"
            placeholder="Enter duration"
            
            
            readOnly={view}
            {...register("duration",{required:true})}
            />
             { !view && errors.duration && <p>Please enter duration</p>}
             {!view &&<div className="for-width"> <button type="submit" className="save-btn-modal" > Save </button></div>}
        </form>
    </div>
    {/* <button onClick={closeHandler}>Close</button> */}

</div>)
}

export default ModalForNested;