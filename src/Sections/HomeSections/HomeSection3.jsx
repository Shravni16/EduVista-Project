import React from "react";
import instructor from "../../assets/Images/Instructor.png"
import Highlighter from "../../components/core/HomeComponents/Highlighter"
import YellowBlackBtn from "../../components/core/HomeComponents/YellowBlackBtn";
import { FaArrowRight } from "react-icons/fa6";
import ReviewSlider from "../../components/common/ReviewSlider";

function HomeSection3(){
    const htmlBtn1 = (
        <div className="horizontaly-center">
          Start Teaching Today <FaArrowRight />{" "}
        </div>
      );
return (
 <div>
       <div className="sec-3-wrapper">
        <div >
            <img className="img-height-545 img-2-shadow" src={instructor}></img>
        </div>
        <div className="sec-3-div-2">
            <h1 className="font-33 sec-3-div-2-head">Become an {" "} <Highlighter text="instructor" fontSize={33} fontWeight={600}/>  </h1>
            <p className="section-3-para ">Instructors from around the world teach millions of students on Eduvista. We provide the tools and skills to teach what you love.</p>
            <YellowBlackBtn content={htmlBtn1} isYellow={true} linkTo="/" />
        </div>
    </div>
    <ReviewSlider/>
 </div>
);
}

export default HomeSection3;