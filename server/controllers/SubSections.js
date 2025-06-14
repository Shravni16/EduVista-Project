const { default: mongoose } = require("mongoose");
const Section =require("../models/Section"); 
const SubSection=require("../models/SubSection");
const Course=require("../models/Course");
const { uploadImageToCloudinary } = require("../utility/imageUploader");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();
exports.createSubSection=async (req,res)=>{
    try{
      //fetch data from body and file 
      const {title,duration,description,oldsectionId,courseID}=req.body;
      const videoFile=req.files.video;
      const sectionId=new mongoose.Types.ObjectId(oldsectionId);
      

      //validate
      if(!title || !duration || !description || !sectionId || !videoFile || !courseID){
        return res.status(401).json({
            success: false,
            message: "All Fields are required",
          });
      }

      //check if section exists
      const sectionExists = await Section.findById(sectionId);
    if (!sectionExists) {
      return res.status(401).json({
        success: false,
        message: "Section for given Id dont exists",
      });
    }

    // upload video to cloudinary
    const videoUploaded =await uploadImageToCloudinary(videoFile,process.env.FOLDER);

    //create entry in database of subsection in subsection scehma
    const newSubsection=await SubSection.create({title,duration,description,videoURL:videoUploaded.secure_url});

    //update section by pushing subsection id in array
    await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:newSubsection._id}},{new:true});
      
    const newCourse=await Course.findById(
      { _id: courseID }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    }).exec();
    
    //updste totalLectures in courseProgress schema
  //   const updatedProg=await CourseProgress.findOneAndUpdate({courseId:courseID},{totalLectures:totalLectures+1},{new:true});
  // console.log("updatedProg",updatedProg);

    //return response
    res.status(200).json({
        success: true,
        message: "Subsection created successfully",
        data:newCourse
      });

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "Error while creating subsection",
          
        });
    }
}

exports.updateSubsection=async (req,res)=>{
    try{
     //fetch data from reqest body
     const {title,duration,description,subsectionId,courseID}=req.body;
     const videoFile= req.body.video ?req.body.video : req.files.video;
     const isVideoUpdated=req.body.video?false :true;

     //validate
     if(!title || !duration || !description || !subsectionId || !videoFile){
        return res.status(401).json({
            success: false,
            message: "All Fields are required",
          });
      }
         //check if section exists
         const subsectionExists = await SubSection.findById(subsectionId);
         if (!subsectionExists) {
           return res.status(401).json({
             success: false,
             message: "Section for given Id dont exists",
           });
         }
          //delete previous file from cloudinary 
         // upload video to cloudinary
         let  videoUploaded;
         if(isVideoUpdated){
           videoUploaded =await uploadImageToCloudinary(videoFile,process.env.FOLDER);
         }
       

         //update in database
        const updatedSubsection=await SubSection.findByIdAndUpdate({_id:subsectionId},
            {title,duration,description,videoURL:isVideoUpdated?videoUploaded.secure_url:videoFile},{new:true}
        );
        const newCourse=await Course.findById(
          { _id: courseID }
        ).populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        }).exec();

        res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data:newCourse

          });

     
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "Error while updating subsection",
        });
    }
}

exports.deleteSubsection =async (req,res)=>{
try{
//fetch data from body
const {subsectionId,sectionId}=req.body;
//validate id
if(!subsectionId || !sectionId){
    return res.status(401).json({
        success: false,
        message: "All Fields are required",
      }); 
}
//check if subsection and section exists
const sectionExists = await Section.findById(sectionId);
if (!sectionExists) {
  return res.status(401).json({
    success: false,
    message: "Section for given Id dont exists",
  });
}

const subsectionExists = await SubSection.findById(subsectionId);
if (!subsectionExists) {
  return res.status(401).json({
    success: false,
    message: "Subsection for given Id dont exists",
  });
}


//delete from subsection schema
await SubSection.findByIdAndDelete(subsectionId);

//delete from section schema subsection array
const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subsectionId}},{new:true});
//return response
res.status(200).json({
    success: true,
    message: "subsection deleted successfully",
    data:updatedSection
  });
}catch(error){
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while Deleting subsection",
    });
}
}