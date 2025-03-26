import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getInstructorCourse } from "../../../../services/operations/CourseAPI";
import { useNavigate } from "react-router-dom";
import { Chart,registerables } from "chart.js";
import {Pie} from "react-chartjs-2"
import "./instructordashboard.css"
import { getInstructorDashboardData } from "../../../../services/operations/ProfileAPI";
Chart.register(...registerables)
function InstructoDashBoard(){
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [instructorCourses,setinstructorCourses]=useState([]);
    const [data,setData]=useState([]);
    const [iterator,setIterator]=useState([]);
    const [showChart,setShowChart]=useState("student")
    function getRandomColors(n){
        let colors=[];
        for(let i=0;i<n;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }
        return colors;
    }

    // create data to display students
    const chartDataForStudents={
        labels:data?.map((course)=>course.courseName),
        datasets: [
            {
                data:data.map((dt)=>dt.totalStudents),
                backgroundColor:getRandomColors(data.length)
            }
        ]
        
    }
    const chartDataForIncome={
        labels:data?.map((course)=>course.courseName),
        datasets: [
            {
                data:data.map((dt)=>dt.totalAmount),
                backgroundColor:getRandomColors(data.length)
            }
        ]
    }
    useEffect(()=>{
       async function getData(){
            const response=await getInstructorCourse(token);
            // console.log("resp",response);
            setinstructorCourses(response);

            const response2=await getInstructorDashboardData(token);
            // console.log("response 2",response2);
            setData(response2);

        }
        getData();
 
    },[]);
    const chartOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
              padding: 10,
              font:{
                size:14,
              },
              
            },
          },
        },
        layout: {
          padding: 20,
      
        },  maintainAspectRatio: false,
      };

    useEffect(()=>{
        setIterator(instructorCourses?.splice(0,3))
    },[instructorCourses])

    return(
        <div className="id-wrap">
            <h2 className="id-hi-name">Hi {user?.firstName}👋 </h2>
            <p className="id-lets-start">Let's start something new</p>
            <div className="id-sec-wrap">
            <div className="id-sec-1">
                <div className="id-visualize">Visualize</div>
                <div className="id-2-btn">
                <button className={`${showChart=="student"?"id-active-btn":"id-passive-btn"}`} onClick={()=>setShowChart("student")}>Student</button>
                <button className={`${showChart=="income"?"id-active-btn":"id-passive-btn"}`}  onClick={()=>setShowChart("income")}>Income</button>
               
                </div>
           
                <div className="id-pie-wrap">
                <Pie data={showChart=="student"? chartDataForStudents :chartDataForIncome} options={chartOptions}  />
             
                </div>
               
                 {/* pie chart */}
                   </div>
                <div className="id-sec-2">
                <h3 className="id-stc-h">Statistics</h3>
                <div className="id-name-val-wrap">
                   <p className="id-name">Total Courses</p>
                   <div className="id-val"> {data.length}</div>
                </div>
                <div className="id-name-val-wrap">
                   <p className="id-name">Total Students Enrolled</p>
                   <div className="id-val"> {data.reduce((acc,curr)=>{
                    return acc+curr.totalStudents;
                   },0)}</div>
                </div>
                <div className="id-name-val-wrap">
                   <p className="id-name">Total Income</p>
                   <div className="id-val">Rs.{data.reduce((acc,curr)=>{
                    return acc+curr.totalAmount;
                   },0)} </div>
                </div>
                </div>
                </div>
                <div className="id-sec-3">
                    {/* instructor courses */}
                   <div className="id-your-course-and-btn">
                   <div className="id-your-course">Your Courses</div>  <div className="id-view-all"onClick={()=>navigate("/dashboard/my-courses")}>View All</div>
                   </div>

                  
                    {
                        instructorCourses ? 
                        (instructorCourses?.length===0 ? 
                            (<div>No courses found. <button onClick={()=>navigate("/dashboard/add-course") }>Create course</button></div>)

                            :(   
                          <div className="id-course-wrap"> 
                            {

                                    iterator.map((course,index)=>{
                                    return (
                                        <div key={index}>
                                            <img className="id-crs-img"src={course?.thumbnail}/>
                                            <div className="id-c-name">
                                                {course?.courseName}
                                            </div>
                                            <div className="id-std-prc">
                                                {course?.studentsEnrolled?.length} students | Rs. {course?.price} 
                                            </div>
                                        </div>
                                    )
                                })
                            } 
                            </div>
                            )
                        )
                        :(<p>Loading...</p>) 
                    }
                     </div>
              

          

        </div>
    )
}
export default InstructoDashBoard;