const mongoose=require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const User= require("../models/User");


exports.getCourseProgress = async (req, res) => {
 try{
    const {courseId}=req.body;
    // console.log("course id",courseId)
    const userId=req.user.id;
    if(!courseId || !userId){
        return res.status(401).json({
            success: false,
            message: "CourseId required",
          });
    }
    const castToObjId= new mongoose.Types.ObjectId(courseId);
    // console.log("casted ",castToObjId)
    const userDetails=await User.findById(userId).populate("courseProgress").exec();
    const result=  userDetails.courseProgress.find((prog)=>(prog.courseId==courseId));
      //  console.log("userDetails",userDetails)
      //  console.log("result",result)


    // const courseProg= await CourseProgress.findOne({courseId:courseId});
    // if (!courseProg) {
    //     return res.status(401).json({
    //       success: false,
    //       message: "courseProgress detaills not found",
    //     });
    //   }
      res.status(200).json({
        success: true,
        data:result,
        message: "Course Progress fectched successfullly",
      });

 }catch(error){
    console.log(error),
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while fetching course progress",
      });
 }
}


exports.updateCourseProgress = async (req, res) => {
    try{
       const {courseId,subsecId,progress}=req.body;
       const userId=req.user.id;

       if(!courseId || !userId) {
           return res.status(401).json({
               success: false,
               message: "CourseId required",
             });
       }

       const userDetails=await User.findById(userId).populate("courseProgress").exec();
       const courseProgExist=  userDetails.courseProgress.find((prog)=>(prog.courseId==courseId));

      //  let courseProgExist = await CourseProgress.findOne({ courseId: courseId });

if (!courseProgExist) {
    // Handle case when no course progress is found
    return res.status(404).send({ message: "Course progress not found" });
}

const completedVideos = courseProgExist.completedVideos;
const isAlreadyCompleted = completedVideos.includes(subsecId);

if (!isAlreadyCompleted) {
    completedVideos.push(subsecId);
}




       const courseProg= await CourseProgress.findByIdAndUpdate(
        {_id:courseProgExist._id},
        {
      completedVideos:completedVideos,
        progressPercentage:progress
       },
       {new:true});

       if (!courseProg) {
           return res.status(401).json({
             success: false,
             message: "courseProgress detaills not found",
           });
         }
         res.status(200).json({
           success: true,
           data:courseProg,
           message: "Completed videos updated successfullly",
         });
   
    }catch(error){
       console.log(error),
         res.status(500).json({
           success: false,
           error: error.message,
           message: "Error while updating course progress completed videos",
         });
    }
   }

  //  exports.updateCourseProgress = async (req, res) => {
  //   try{
  //      const {courseId,progress}=req.body;
  //      if(!courseId){
  //          return res.status(401).json({
  //              success: false,
  //              message: "CourseId required",
  //            });
  //      }
  //      const courseProg= await CourseProgress.findOneAndUpdate(
  //       {courseId:courseId},
  //       {
  //           progressPercentage:progress
  //      },
  //      {new:true});

  //      if (!courseProg) {
  //          return res.status(401).json({
  //            success: false,
  //            message: "courseProgress detaills not found",
  //          });
  //        }
  //        res.status(200).json({
  //          success: true,
  //          data:courseProg,
  //          message: "Course progress % updated",
  //        });
   
  //   }catch(error){
  //      console.log(error),
  //        res.status(500).json({
  //          success: false,
  //          error: error.message,
  //          message: "Error while updating progress%",
  //        });
  //   }
  //  }

   