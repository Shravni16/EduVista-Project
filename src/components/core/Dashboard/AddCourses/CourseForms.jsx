import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import CourseBuilder from "./CourseBuilder";
import CourseInformation from "./CourseInformation";
import Publish from "./Publish";

function CourseForms(){
    const stepsData=[
        {
            id:1,
            title:"Course Information",
            comps:<CourseInformation/>
        },
        {
            id:2,
            title:"Course Builder",
            comps:<CourseBuilder/>
        },
        {
            id:3,
            title:"Publish",
            comps:<Publish/>
        }
    ];
    const {step}=useSelector((state)=>state.course);
 
    return (
        <div>
           <div className="steps-wrap">
           {
              stepsData.map((item,index)=>{
                 return (<div className="dot-and-circle" key={index}>
                 <div className={`${step>=item.id ? "yellow-border-circle":"black-border-circle"}`}>
                 {
                     step >item.id  ?(<div className="tick-tick-circle"><TiTick className="tick-tick" /></div>) :(<span>{item.id}</span>)
                 }
                
                
              </div>
               {
                 item.id!==3 && <div className={`${item.id<step ?"active-dotted-line dotted-line":"inactive-dotted-line dotted-line"}`}></div>
             }</div>
                 )
              })

             
            }
          
           </div>
           <div className="steps-wrap step-names">
           {
                 stepsData.map((item,index)=> (<div  key={item.id}>{item.title}</div>))
           
            }</div>

            <div>
                {
                  stepsData.map((item,index)=>( item.id===step && item.comps))
                }
            </div>
           
        </div>
    )
}

export default CourseForms;