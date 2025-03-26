import Highlighter from "../../HomeComponents/Highlighter"
import img1 from "../../../../assets/Images/aboutus1.webp";
import img2 from "../../../../assets/Images/aboutus2.webp";
import img3 from "../../../../assets/Images/aboutus3.webp";
import GradientText from "../GradientText";
import FoundingStory from "../../../../assets/Images/FoundingStory.png";
import "../../../../CSS/about.css"
import YellowBlackBtn from "../../HomeComponents/YellowBlackBtn"
import ContactUs from "../../../common/ContactUs";

// function Section1 (){
//     const studentCount=[{
//         count:"5K",
//         label:"Active Students"
//     },
//     {
//         count:"10+",
//         label:"Mentors"
//     },{
//         count:"200+",
//         label:"Courses"
//     },{
//         count:"50+",
//         label:"Awards"
//     }];

//     const gridBox=[{
//         order:-1,
//         heading:"World-Class Learning for ",
//         highlighted:" Anyone, Anywhere",
//         desc:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//         btn:"Learn More",
//         path:"/"
//     },
// {
//     order:0,
//     heading:"Curriculum Based on Industry Needs",
//     desc:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."

// },{
//     order:1,
//     heading:"Our Learning Methods",
//     desc:"The learning process uses the namely online and offline."

// },{
//     order:2,
//     heading:"Certification",
//     desc:"You will get a certificate that can be used as a certification during job hunting."

// },{
//     order:3,
//     heading:'Rating "Auto-grading"',
//     desc:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."

// },{
//     order:4,
//     heading:"Ready to Work",
//     desc:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."

// }]
//     return (
//         <div >
//             <section>
//             <div className="section1-bg"> 
//             <p> About Us</p>
           
//             <h1>Driving Innovation in Online Education for a <Highlighter text="Brighter Future" /> </h1>
//             <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
//             </div>
//             <div>
//                 <img src={img1} alt="img1"></img>
//                 <img src={img2} alt="img2"></img>
//                 <img src={img3} alt="img3"></img>
//             </div>

//             <h1>We are passionate about revolutionizing the way we learn. Our innovative platform <Highlighter text="combines technology"/>,{" "}
//              <GradientText text="expertise" color={['#FF512F', '#F09819']}  dir="to bottom" />, and community to create an {" "}
//              <GradientText text="unparalleled educational experience." color={['#FF512F', '#F09819']}  dir="to bottom" /> </h1>

//              <div>
//                 <div>
//                     <div><h1><GradientText text="Our Founding Story " color={['#833AB4', '#FD1D1D']}  dir="to right"/> </h1>
//                     <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
//                     <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
//                    </div>
//                     <div><img src={FoundingStory}></img></div>
                    
//                 </div>
//                 <div>
//                     <div> 
//                         <h1><GradientText text="Our Vision" color={['#FF512F', '#F09819']}  dir="to bottom" /> </h1>
//                         <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
//                     </div>
//                     <div>
//                         <h1><Highlighter text="Our Mission"/></h1>
//                         <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

//                     </div>

//                 </div>
//              </div>
//              </section>

//              {/* Section 2 */}
//              <section>
//                 <div>{
//                     studentCount.map((ele)=>{
//                         return <div> 
//                             <div>{ele.count}</div>
//                             <div>{ele.label}</div>
//                         </div>
//                     })
// }</div>

//              </section>

//              {/* Section 3 */}
//              <section>
//                 <div className="gridbox">
//                     {
//                         gridBox.map((ele)=>{
//                             if(ele.order===-1){
//                                 return <div style={{ gridColumn: '1 / span 2' }}> 
//                                 <h1>{ele.heading} <Highlighter text={ele.highlighted}/> </h1>
//                                 <p>{ele.desc}</p>
//                                 <YellowBlackBtn content={ele.btn} linkTo={ele.path} isYellow="true"/>
//                                 </div>
//                             }
//                             else{
//                                 return <div  style={{ gridColumn: ele.order === 2 ? '2 / span 1' :''}} className={ele.order%2==0 ?"even":"odd"}>
//                                     <h4>{ele.heading}</h4>
//                                     <p>{ele.desc}</p>
//                                 </div>
//                             }
//                         })
//                     }
//                 </div>
//              </section>
// {/* section 4 Contact from */}
//              <section>
//                 <ContactUs/>
//              </section>

//         </div>
//     )
// }


// export default Section1;



function Section1 (){
    const studentCount=[{
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },{
        count:"200+",
        label:"Courses"
    },{
        count:"50+",
        label:"Awards"
    }];

    const gridBox=[{
        order:-1,
        heading:"World-Class Learning for ",
        highlighted:" Anyone, Anywhere",
        desc:"Eduvista partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btn:"Learn More",
        path:"/"
    },
{
    order:0,
    heading:"Curriculum Based on Industry Needs",
    desc:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."

},{
    order:1,
    heading:"Our Learning Methods",
    desc:"The learning process uses the namely online and offline."

},{
    order:2,
    heading:"Certification",
    desc:"You will get a certificate that can be used as a certification during job hunting."

},{
    order:3,
    heading:'Rating "Auto-grading"',
    desc:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."

},{
    order:4,
    heading:"Ready to Work",
    desc:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."

}]
    return (
        <div className="about-container">
            <section className="about-section">
                <div className="section1-bg"> 
                    <p className="about-heading"> About Us</p>
                    <h1 className="about-main-title">
                        Driving Innovation in Online Education for a <Highlighter text="Brighter Future" /> 
                    </h1>
                    <p className="about-desc">Eduvista is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>
                <div className="about-images">
                    <img src={img1} alt="img1" className="about-image"/>
                    <img src={img2} alt="img2" className="about-image"/>
                    <img src={img3} alt="img3" className="about-image"/>
                </div>

                <h1 className="about-passion">
                    We are passionate about revolutionizing the way we learn. Our innovative platform <Highlighter text="combines technology"/>,{" "}
                    <GradientText text="expertise" color={['#FF512F', '#F09819']}  dir="to bottom" />, and community to create an {" "}
                    <GradientText text="unparalleled educational experience." color={['#FF512F', '#F09819']}  dir="to bottom" /> 
                </h1>
{/* 
                <div className="about-story">
                    <div className="story-section">
                        <h1><GradientText text="Our Founding Story " color={['#833AB4', '#FD1D1D']}  dir="to right"/> </h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education...</p>
                    </div>
                    <div><img src={FoundingStory} className="about-founding-img"></img></div>
                </div>

                <div className="about-vision-mission">
                    <div className="vision">
                        <h1><GradientText text="Our Vision" color={['#FF512F', '#F09819']}  dir="to bottom" /> </h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform...</p>
                    </div>
                    <div className="mission">
                        <h1><Highlighter text="Our Mission"/></h1>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community...</p>
                    </div> 
                </div> */}
                <div className="about-gird-of-four">
             
                     <div className="about-grid-child"><h1><GradientText text="Our Founding Story " color={['#833AB4', '#FD1D1D']}  dir="to right"/> </h1>
                     <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                     <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                   </div>
                   <div className="about-grid-child">
                     <img src={FoundingStory}></img> 
                         
                     </div>
                     <div className="about-grid-child"><h1><GradientText text="Our Vision" color={['#FF512F', '#F09819']}  dir="to bottom" /> </h1>
                     <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p></div>
                    
                
                    
                     <div className="about-grid-child">
                         <h1><Highlighter text="Our Mission"/></h1>
                         <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

                     </div>

              
                 </div>
                
            </section>

            {/* Section 2 */}
            <section className="student-count-section">
                <div className="student-count-grid">
                    {studentCount.map((ele) => (
                        <div className="student-count-item"> 
                            <div className="student-count-number">{ele.count}</div>
                            <div className="student-count-label">{ele.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3 */}
            <section>
                <div className="gridbox">
                     {
                        gridBox.map((ele)=>{
                            if(ele.order===-1){
                                return <div className="ele-1" style={{ gridColumn: '1 / span 2' }}> 
                                <h1 className="ele-heading-1">{ele.heading} <Highlighter text={ele.highlighted}/> </h1>
                                <p className="ele-para-1">{ele.desc}</p>
                                <YellowBlackBtn content={ele.btn} linkTo={ele.path} isYellow="true"/>
                                </div>
                            }
                            else{
                                return <div  style={{ gridColumn: ele.order === 2 ? '2 / span 1' :''}} className={ele.order%2==0 ?"even ele-2":"odd ele-2"}>
                                    <h4 className="ele-head-2">{ele.heading}</h4>
                                    <p className="ele-para-2">{ele.desc}</p>
                                </div>
                            }
                        })
                    }
                </div>
             </section>

            {/* Section 4 Contact Form */}
            <section className="contact-section">
                <h1 className="ele-head-1">Get in Touch</h1>
                <p className="ele-para-2">We’d love to here for you, Please fill out this form.</p>
                <ContactUs/>
            </section>
        </div>
    );
}

export default Section1;
