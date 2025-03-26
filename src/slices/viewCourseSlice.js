import { createSlice } from "@reduxjs/toolkit";


const initialState = {
courseDetails:localStorage.getItem("courseDetails")? localStorage.getItem("courseDetails"): null,
courseSections:[],
totalLectures:0,
completedLecture:0,
courseProgress:null,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState: initialState,
  reducers: {
    
    setCourseDetail(state, value) {
      state.courseDetails = value.payload;
    },
    setCourseSections(state, value) {
      state.courseSections = value.payload;
    },
    setTotalLectures(state, value){
      state.totalLectures = value.payload;
    },
    setCompletedLecture(state, value){
      state.completedLecture = value.payload;
    },
    setCourseProgress(state, value){
      state.courseProgress = value.payload;
    },
 

  },
});

export const {setCourseDetail,setCourseSections,setTotalLectures,setCompletedLecture,setCourseProgress } = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
