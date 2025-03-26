import { createSlice } from "@reduxjs/toolkit";


const initialState = {
 step:1,
 editCourse:false,
 addCourse:true,
 loading:false,
 course:localStorage.getItem("course")
 ? localStorage.getItem("course")
 : null
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    
    setStep(state, value) {
      state.step = value.payload;
    },
    setEditCourse(state, value) {
      state.editCourse = value.payload;
    },
    setLoading(state, value){
      state.loading = value.payload;
    },
    setCourse(state, value){
      state.course = value.payload;
    },
    setAddCourse(state, value){
      state.addCourse = value.payload;
    }

  },
});

export const {setStep,setEditCourse,setLoading,setCourse ,setAddCourse} = courseSlice.actions;
export default courseSlice.reducer;
