const User = require("../models/User");
const Category = require("../models/Category");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utility/imageUploader");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const mongoose=require("mongoose");

//create courses
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    // console.log("hello");
    const { courseName, courseDesc, whatYouWillLearn, price, tag, category ,instructions} =
      req.body;
    const thumbnail = req.files.thumbnail;
    //  console.log( courseName, courseDesc, whatYouWillLearn, price, tag, category,thumbnail )
    //validate
    if (
      !courseName ||
      !courseDesc ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category ||
      !instructions
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    //*****check if user is instructor (what is need)
    const userID = req.user.id;
    const instructorDetails = await User.findById(userID);

    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor detaills not found",
      });
    }
    // console.log("Instructor details : ", instructorDetails);

    //******check if tag is valid (why id)
    const categorydetails = await Category.findById(category);
    if (!categorydetails) {
      return res.status(401).json({
        success: false,
        message: "TCategory detaills not found",
      });
    }
    // console.log("Category details : ", categorydetails);

    //upload image to cloudinary
    const thumbnail_uploaded = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER
    );

    //create entry in database
    const new_course_created = await Course.create({
      courseName,
      courseDesc,
      whatYouWillLearn,
      price,
      tag,
      category: categorydetails._id,
      thumbnail: thumbnail_uploaded.secure_url,
      instructor: instructorDetails._id,
      instructions:instructions,
      status:"Draft"
    });

    //add entry in instructor user cources
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: new_course_created._id } },
      { new: true }
    );

    //add course in tag schema
    await Category.findByIdAndUpdate(
      { _id: categorydetails._id },
      { $push: { courses: new_course_created._id } },
      { new: true }
    );
    // console.log("courseId",new_course_created._id);
  
   
//  }catch(err){
//   console.log("err",err)
//  }


    res.status(200).json({
      success: true,
      data:new_course_created,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while creating course",
      });
  }
};

// Update course
exports.updateCourse=async(req,res)=>{
  try{
    const { courseId,courseName, courseDesc, whatYouWillLearn, price, tag, category,instructions } =
    req.body;
  const thumbnail = req.body.thumbnail ||req.files.thumbnail;
  // 
  // console.log("thumbnail in backend",thumbnail);
   //validate
   if (!courseId||
    !courseName ||
    !courseDesc ||
    !whatYouWillLearn ||
    !price ||
    !tag ||
    !thumbnail ||
    !category
    || !instructions
  ) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }

    //******check if tag is valid (why id)
    const categorydetails = await Category.findById(category);
    if (!categorydetails) {
      return res.status(401).json({
        success: false,
        message: "TCategory detaills not found",
      });
    }
    // console.log("Category details : ", categorydetails);
     //upload image to cloudinary
     let thumbnail_uploaded;
     if(!req.body.thumbnail){
      thumbnail_uploaded = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER
      );
     }else{
      thumbnail_uploaded=thumbnail;
     }
    
      

    const old_course=await Course.findById({_id:courseId});
    // console.log("Old course",old_course);
    //remove from prev catgory
    await Category.findByIdAndUpdate(
      { _id: old_course.category._id },
      { $pull: { courses: old_course._id } },
      { new: true }
    )
    

  


    const new_course_created = await Course.findByIdAndUpdate({_id:courseId},{
      courseName,
      courseDesc,
      whatYouWillLearn,
      price,
      tag,
      category: categorydetails._id,
      thumbnail: thumbnail_uploaded.secure_url,
      instructions
      // instructor: instructorDetails._id,
    },{new:true}).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    }).exec();
      //add course in tag schema
      await Category.findByIdAndUpdate(
        { _id: categorydetails._id },
        { $push: { courses: new_course_created._id } },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        data:new_course_created,
        message: "Course Updated successfully",
      });


  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while updating course",
    });
  }

}

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
        category: true,
      }
    );
    res.status(200).json({
      success: true,
      courses: allCourses,
      message: "All courses returend successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while displaying courses",
      });
  }
};

//getCourseDetail
exports.getCourseDetail = async (req, res) => {
  try {
    //fetch courseId from request body
    const { courseId } = req.body;
    //fetch data and populate
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReview")
      .populate("category")
      .exec();

      // console.log("course cont",courseDetails.courseName)

      if(!courseDetails){
        return res.status(400).json({
          success:false,
          message:`Could not find the course with ${courseId}`
        })
      }
 

      //calculate total no of lectures and completed lecture
      // let totalLectures=0;
      // for(let sec of courseDetails.courseContent){
      //      for(let subSec of sec.subSection){
      //       totalLectures++;
      //      }
      // }

      // let completedLectures=0;
      const courseProgressData= await CourseProgress.findById(courseId);
      // completedLectures=courseProgressData?.completedVideos.length;

         
      return res.status(200).json({
        success:true,
        message:`Course details fetched successfully`,
        data:courseDetails,
        // totalLectures:totalLectures,
        courseProgress:courseProgressData,

      })

  } catch (error) {
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching course details",
    });
  }
};


exports.courseStatusChange = async (req,res )=>{
  try{
    const {courseId,newStatus} =req.body;
 
   //validate
   if (!courseId) {
    return res.status(401).json({
      success: false,
      message: "Please enter valid course id",
    });
  }

    // const old_course=await Course.findById({_id:courseId});

    // console.log("Old course",old_course);

    const new_course_created = await Course.findByIdAndUpdate({_id:courseId},{
      status:newStatus
    },{new:true});
   
      res.status(200).json({
        success: true,
        data:new_course_created,
        message: "Course State changed successfully",
      });


  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while changing state of course",
    });
  }

}

exports.getInstructorCourses =async (req,res)=>{
  try{
    const userId =req.user.id;

    const instructorCourses = await Course.find({instructor:userId}).sort({createdAt:-1}).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    }).exec();
   
      res.status(200).json({
        success: true,
        data:instructorCourses,
        message: "Instructor Course Fetched successfully",
      });


  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching instructor courses",
    });
  }

}

exports.getInstructorDashBoardDetails=async (req,res)=>{
  try{
    const userId =req.user.id;

    const instructorCourses = await Course.find({instructor:userId});
    const courseData=instructorCourses.map((course)=>{
      const totalAmount=course.studentsEnrolled.length * course.price;
      const courseKaData={
        _id:course._id,
        courseName:course.courseName,
        courseDesc:course.courseDesc,
        totalStudents:course.studentsEnrolled.length,
        totalAmount,
      }
      return courseKaData;
    });
    res.status(200).json({
      success: true,
      data:courseData,
      message: "Instructor Dashboard data Fetched successfully",
    });


  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching instructor Dashboard details",
    });
  }
}



exports.deleteCourse =async (req,res)=>{
  try{
    const userId =req.user.id;
    const {courseId}=req.body;

    const courseExist=await Course.findById(courseId);
    if(!courseExist){
      res.status(404).json({
        success: false,
     
        message: "Course not found",
      });
    }

    //update user schema..remove course from instructor's courses
    const updatedInstructor=await User.findByIdAndUpdate({_id:userId},{
       $pull:{courses:courseId}
    },{new:true});

    //update student's enrolled courses
    const students=courseExist.studentsEnrolled;
    for(const studentId of students){
      await User.findByIdAndUpdate({_id:studentId},{
        $pull :{ courses: courseId}
      });

    }

    //delete sections and subsections
    const sections=courseExist.courseContent;
    for(const secId of sections){
      const Sec=await Section.findById(secId);
      if(Sec){
        const subSections=Sec.subSection;
        for( const subSecId of subSections){
          await SubSection.findByIdAndDelete(subSecId);
        }
      
      }
        
      await Section.findByIdAndDelete(secId);
    }

    //delete course
    await Course.findByIdAndDelete(courseId);

res.status(200).json({
      success: true,
      
      message: "Course Deleted successfully!",
    });


   

  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching instructor courses",
    });
  }

}


exports.enrollStudentInCourse=async (req,res)=>{
  try{
    const userId =req.user.id;
    const {courses}=req.body;

    // console.log("courses",courses)
    const user=await User.findById(userId);

   for (let course of courses){
    let courseId=course._id;
    
    if(user.courses.includes(courseId)){
      return res.json({
        success:false,
        message:"Student already enrolled in course"
      })
    }

    const courseFound=await Course.findByIdAndUpdate({_id:courseId},{
      $push:{studentsEnrolled:userId}
   },{new:true});

   const castToObjId= new mongoose.Types.ObjectId(courseId);
  //  console.log("casted ",castToObjId)
   const courseProg=await CourseProgress.create({
    courseId:castToObjId,
    completedVideos:[],
    progressPercentage:0,
    totalLectures:0,

  });

   const userChanged=await User.findByIdAndUpdate({_id:userId},{
    $push:{courses:courseId,courseProgress:courseProg}
   },{new:true});
   }
   res.status(200).json({
    success: true,
      // data:{courseFound,userChanged},
      message: "Student Enrolled successfully!",
   })
  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while Enrolling courses",
    });
  }
}

