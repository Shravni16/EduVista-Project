// const BASE_URL=process.env.REACT_APP_BASE_URL;
const BASE_URL=process.env.REACT_APP_BASE_URL;

//Auth Endpoints
export const endpoints={
    SENDOTP_API:BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL +"/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}


//Profile Endpoints
export const profileEndpoints={
    GET_USER_DETAILS_API: BASE_URL + "/profile/get-all-user-details",
    GET_USER_ENROLLED_COURSES_API: BASE_URL +"/profile/get-enrolled-courses",
    GET_INSTRUCTOR_DASHBOARD_DATA:BASE_URL+"/course/get-instructor-dashboard-details",
  
}


//Courses Endpoints
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL +"/course/get-all-courses",
    COURSE_DETAILS_API: BASE_URL +  "/course/get-course-detail",
    COURSE_CATEGORIES_API: BASE_URL + "/course/show-all-categories",
    CREATE_COURSE_API: BASE_URL +  "/course/create-course",
    UPDATE_COURSE_API:BASE_URL+"/course/update-courses",
    CREATE_SECTION_API: BASE_URL + "/course/create-section",
    CREATE_SUBSECTION_API: BASE_URL + "/course/create-subSection",
    UPDATE_SECTION_API: BASE_URL + "/course/update-section",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/update-subsection",

    DELETE_SECTION_API: BASE_URL + "/course/delete-section",
    DELETE_SUBSECTION_API: BASE_URL + "/course/delete-subsection",
   
    CREATE_RATING_API: BASE_URL + "/course/create-rating-and-review",
    COURSE_STATE_CHANGE : BASE_URL+"/course/course-state-change",
    GET_INSTRUCTOR_COURSE:BASE_URL + "/course/get-instructor-course",
    DELETE_COURSE:BASE_URL +"/course/delete-course",
    ENROLL_STUDENTS_IN_COURSE:BASE_URL +"/course/enroll-student-in-course"
}


//Ratings and reviews
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/get-all-rating",
   
  }


//Show all Categories
export const categories={
    CATEGORIES_API:BASE_URL+"/course/show-all-categories",
    GET_CATEGORY_BY_NAME:BASE_URL +"/course/get-category-id",
    // CATAGORY_PAGE_DETAILS:BASE_URL + "/course/category-page-details"

}

//Catalog Page data
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/category-page-details",
  }

  // SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-display-picture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
    DELETE_PROFILE_API: BASE_URL + "/profile/delete-account",
  }


  //contact us endpoints
  export const contactusEndpoints={
    CONTACT_US_API: BASE_URL+ "/reach/contact",
  }

  // course progress
  export const courseprogressEndpoints={
    GET_COURSE_PROGRESS : BASE_URL + "/course/get-course-progress",
    UPDATE_COURSE_PROGRESS : BASE_URL + "/course/update-course-progress"
  }