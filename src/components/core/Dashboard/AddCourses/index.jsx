import CourseForms from "./CourseForms";
import "./addcourse.css";


function AddCourses(){
   
    return (<div className="add-course-wrap">
        <div className="add-course-div-1"><h1 className="add-course-head">
        Add Course 
        </h1>
        <CourseForms/>
        </div>

       <div className="add-course-list">
        <div className="course-upload-tips">⚡Course Upload Tips</div>
       <ul>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>

        </ul>
       </div>
    </div>)
}

export default AddCourses;