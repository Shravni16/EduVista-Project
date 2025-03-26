import { catalogData, categories, courseEndpoints, courseprogressEndpoints ,ratingsEndpoints} from "../apis";
import toast from "react-hot-toast";
import { setLoading, setEditCourse, setCourse } from "../../slices/courseSlice";
import { apiConnector } from "../apiconnector";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCompletedLecture, setCourseProgress } from "../../slices/viewCourseSlice";

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  UPDATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_RATING_API,
  COURSE_STATE_CHANGE,
  GET_INSTRUCTOR_COURSE,
  DELETE_COURSE,
  ENROLL_STUDENTS_IN_COURSE
 
} = courseEndpoints;
const { CATEGORIES_API, GET_CATEGORY_BY_NAME , } = categories;
const {CATALOGPAGEDATA_API}= catalogData;
const {GET_COURSE_PROGRESS,UPDATE_COURSE_PROGRESS}=courseprogressEndpoints;
const {REVIEWS_DETAILS_API}=ratingsEndpoints;

export function createCourseFunction(formData, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log("fprmdata",formData)
    try {
      let response = await apiConnector("POST", CREATE_COURSE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("Course Created successfuly");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("response", response.data.data);
       response.data.data.instructions=JSON.parse(response.data.data.instructions);
       response.data.data.tag=JSON.parse(response.data.data.tag);
      //  response.data.data.whatYouWillLearn=JSON.parse(response.data.data.whatYouWillLearn );
      // console.log("pasred res",JSON.parse( response.data.data))
      //  console.log("non changed response",response.data.data);
      dispatch(setCourse(response.data.data));
      localStorage.setItem("course", response.data.data);
    //  console.log( localStorage.getItem("course"));
      // console.log("course normal",response.data.data)
      // console.lof("parsed instructions",JSON.parse(response.data.data.instructions))

      toast.success("course Created Successfully !");
    } catch (error) {
      console.log(error);
      toast.error("Error in Creating course");
    }
    dispatch(setLoading(false));
  };
}
export function updateCourseFunction(formData, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", UPDATE_COURSE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("Course Created successfuly");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("response", response);
      response.data.data.instructions=JSON.parse(response.data.data.instructions);
      response.data.data.tag=JSON.parse(response.data.data.tag);
      // response.data.data.whatYouWillLearn=JSON.parse(response.data.data.whatYouWillLearn );
      dispatch(setCourse(response.data.data));
       localStorage.setItem("course", response.data.data);

      toast.success("course Updated Successfully !");
    } catch (error) {
      console.log("error in updation",error);
      toast.error("Error in Updating course");
    }
    dispatch(setLoading(false));
  };
}

export async function getCategoryIdByName(categoryName,token) {
  // console.log("hello");
  let catId="";
  try {
    const response = await apiConnector("POST", GET_CATEGORY_BY_NAME,{categoryName},{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    catId=response.data.data;

// 
    // console.log("REsponse in ID", response);
  } catch (error) {
    console.log(error);
  }
  return catId;
}

export async function getCategoryPageDetails(categoryId,token){
  let res=[];
  try{
    const response=await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId},{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    res=response.data.data;

  }catch(error){
    console.log(error);
  }
  return res;
}

export function createSectionFunction(sectionName, courseID, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CREATE_SECTION_API,
        { sectionName, courseID },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      response.data.data.instructions=JSON.parse(response.data.data.instructions);
      response.data.data.tag=JSON.parse(response.data.data.tag);
      // response.data.data.whatYouWillLearn=JSON.parse(response.data.data.whatYouWillLearn );
      dispatch(setCourse(response.data.data));
      localStorage.setItem("course",response.data.data);
      // console.log("Section create", response);
      toast.success("Section Created Successfully !");
      dispatch(setLoading(false));
      return response.data.section;
    } catch (error) {
        dispatch(setLoading(false));
      console.log(error);
      toast.error("Error in Creating section");
    }
    
  };
}

export function editSectionHander(sectionName, sectionID,courseID,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",UPDATE_SECTION_API,{sectionName, sectionID,courseID},{
                Authorization: `Bearer ${token}`,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
              }
              // console.log("Section update", response);
              dispatch(setCourse(response.data.data));
              localStorage.setItem("course", JSON.stringify(response.data.data));
              dispatch(setLoading(false));
              toast.success("Section Updated Successfully !");

        }catch(error){
            dispatch(setLoading(false));
            console.log(error);
            toast.error("Error in Updating section");
        }
    }
}

export function delelteSectionHander( sectionID,courseID,token){
  return async(dispatch)=>{
      dispatch(setLoading(true));
      try{
          const response=await apiConnector("POST",DELETE_SECTION_API,{sectionID,courseID},{
              Authorization: `Bearer ${token}`,
          });
          if (!response.data.success) {
              throw new Error(response.data.message);
            }
            // console.log("Section deleted", response);
            dispatch(setCourse(response.data.data));
            localStorage.setItem("course", JSON.stringify(response.data.data));
            dispatch(setLoading(false));
            toast.success("Section deleted  Successfully !");

      }catch(error){
          dispatch(setLoading(false));
          console.log(error);
          toast.error("Error in Deleting section");
      }
  }
}

export function createSubSectionFunction(title,video,duration,description,oldsectionId,token,courseID){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
      const formData=new FormData();
      formData.append("title",title);
      formData.append("duration",duration);
      formData.append("video",video);
      formData.append("description",description);
      formData.append("oldsectionId",oldsectionId);
      formData.append("courseID",courseID);
      const response=await apiConnector("POST",CREATE_SUBSECTION_API,formData,{
        Authorization: `Bearer ${token}`,
      });

      // console.log("Subsection response",response);
      dispatch(setCourse(response.data.data));
      localStorage.setItem("course",JSON.stringify(response.data.data));
      dispatch(setLoading(false));

      toast.success("subSection created Successfully !");


    }catch(error){
dispatch(setLoading(false));
            console.log(error);
            toast.error("Error in creating subsection");
    }
  }
}



export function updateSubSectionFunction(title,video,duration,description,subsectionId,token,courseID){
  return async (dispatch)=>{
    // console.log("title,video,duration,description,subsectionId,token,courseID",title,video,duration,description,subsectionId,token,courseID)
    dispatch(setLoading(true));
    try{
      const formData=new FormData();
      formData.append("title",title);
      formData.append("duration",duration);
      formData.append("video",video);
      formData.append("description",description);
      formData.append("subsectionId",subsectionId);
      formData.append("courseID",courseID);
      const response=await apiConnector("POST", UPDATE_SUBSECTION_API,formData,{
        Authorization: `Bearer ${token}`,
      });

      // console.log("Subsection response",response);
      dispatch(setCourse(response.data.data));
      localStorage.setItem("course",JSON.stringify(response.data.data));
      dispatch(setLoading(false));

      toast.success("subSection updated Successfully !");


    }catch(error){
dispatch(setLoading(false));
            console.log(error);
            toast.error("Error in Updating subsection");
    }
  }
}


export function deleteSubSectionFunction(subsectionId,sectionId,token,course){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
     
      const response=await apiConnector("POST",DELETE_SUBSECTION_API,{subsectionId,sectionId},{
        Authorization: `Bearer ${token}`,
      });

      // console.log("Subsection response",response);
      if(response.data.data){
        const updatedSection=course.courseContent.map((section)=>section._id===sectionId ?response.data.data: section);
        const updatedCourse={...course,courseContent:updatedSection};
        dispatch(setCourse(updatedCourse));
        localStorage.setItem("course",JSON.stringify(updatedCourse));
        dispatch(setLoading(false));
      }

     

      toast.success("subSection deleted Successfully !");


    }catch(error){
dispatch(setLoading(false));
            console.log(error);
            toast.error("Error in deleting subsection");
    }
  }
}

export function changeCourseStatus(courseId,newStatus,token){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
     
      const response=await apiConnector("POST",COURSE_STATE_CHANGE,{courseId,newStatus},{
        Authorization: `Bearer ${token}`,
      });

      dispatch(setCourse(response.data.data));
      localStorage.setItem("course",JSON.stringify(response.data.data));
        dispatch(setLoading(false));

      toast.success("Status changed Successfully !");


    }catch(error){
dispatch(setLoading(false));
            console.log(error);
            toast.error("Error in Changing status");
    }
  }
}


export async function getInstructorCourse(token){
  let res={};
  
    try{
     
      const response=await apiConnector("GET",GET_INSTRUCTOR_COURSE,{},{
        Authorization: `Bearer ${token}`,
      });

    // console.log("get instruct",response);
   
      // console.log("type",typeof(res));
      // console.log("is sarray",Array.isArray(res))
      // const coursesArray = Array.isArray(res) ? res : Object.values(res);
            //  console.log("coursesArray",coursesArray);
            //  console.log("type2",typeof(coursesArray));
    res=response?.data?.data;
    

      


    }catch(error){

            console.log(error);
            
    }
    return res;
  }


export async function deleteCourseHandler(courseId,token){
try {
  const response=await apiConnector("POSt",DELETE_COURSE,{courseId},{
    Authorization: `Bearer ${token}`,
  });
  
  toast.success("Course deleted Successfully !");
}catch(error){
  console.error(error.message);
  toast.error("Error in Deleting course");
}
}

export async function getCoursePageDetail(courseId,token){
  let res=[];
  try {
    const response=await apiConnector("POST",COURSE_DETAILS_API,{courseId},{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("res res",response)
    response.data.data[0].instructions=JSON.parse(response.data.data[0].instructions);
      response.data.data[0].tag=JSON.parse(response.data.data[0].tag);
      //  response.data.data[0].whatYouWillLearn=JSON.parse(response.data.data[0].whatYouWillLearn );
      // console.log("what",JSON.parse(response.data.data[0].whatYouWillLearn[0])
      //   )
    res=response.data.data[0];


    
    // toast.success("Course  Successfully !");
  }catch(error){
    console.error(error.message);
    toast.error("Error in Fetching course");
  }
  return res;
  }

  export async function enrollStudentInCourses(courses,token){
  try{

    const response=await apiConnector("POST",ENROLL_STUDENTS_IN_COURSE,{courses},{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // console.log("Enrolled response",response);
    toast.success("Student Enrolled in courses successfully");
    return true;

  }catch(error){
    console.error(error.message);
    toast.error("Error in Enrolling courses");
    return false;
  }
  }
  


  export async function getCompletedLecture(courseId,token){
    try{
  
      const response=await apiConnector("POST",GET_COURSE_PROGRESS,{courseId},{
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      // console.log("Course progress res",response);
      return response.data.data
     
  
    }catch(error){
      console.error(error.message);
      toast.error("Error in fetching Course progress");
     
    }
    }
    
  
  
    
  export function updateCourseProgress(courseId,subsecId,completedLecture,totalLectures,token){
    return async (dispatch)=>{


 
      try{
        // let progress=(completedLecture+1/totalLectures)*100;

        let progress=((completedLecture+1)/totalLectures)*100;

        const response=await apiConnector("POST",UPDATE_COURSE_PROGRESS,{courseId,subsecId,progress},{
          Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
    
        // console.log("updated Course progress res",response);
       dispatch(setCompletedLecture(response.data.data.completedVideos.length));
        dispatch(setCourseProgress(response.data.data));
        toast.success("course Progress Updated SuccessFully");
        

       
    
      }catch(error){
        console.error(error.message);
        toast.error("Error in updating Course progress");
       
      }
  
    }
  };
    
    
  
  export async function createRatingAndReview(courseId,rating,review,token){
    try{
      const response=await apiConnector("POST",CREATE_RATING_API,{courseId,rating,review},{
        Authorization: `Bearer ${token}`,
      });
      if(response.data.data.message=="User has already given ratings and review"){
        toast.error("Rating Given already");
        return;

      }
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Rating created Successfully")
  

    }catch(error){
      toast.error("User has already given ratings and reviews");
      console.error(error.message);
    }
  }

  export async function getALLRatingsAndReviews(token){
    let res=[];
   try{
    const response=await apiConnector("GET",REVIEWS_DETAILS_API,{},{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("response of rating",response);
    res=response.data.allRatingsAndReviews;


   }catch(error){
    console.error(error);

   }
   return res;
  }