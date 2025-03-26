import React from "react";
import YellowBlackBtn from "../../components/core/HomeComponents/YellowBlackBtn";
import { FaArrowRight } from "react-icons/fa6";
import Highlighter from "../../components/core/HomeComponents/Highlighter";
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import CompanyQuality from "../../components/core/HomeComponents/CompanyQuality";
import TimelineImg from "../../assets/Images/TimelineImage.png";
import Circle from "../../components/core/HomeComponents/Circle";
import know_your_progress from "../../assets/Images/Know_your_progress.png"
import plan_your_lessons from "../../assets/Images/Plan_your_lessons.png"
import compare_with_others from "../../assets/Images/Compare_with_others.png"

function HomeSection2() {
  const htmlBtn1 = (
    <div className="horizontaly-center">
      Explore Full Catalog <FaArrowRight />{" "}
    </div>
  );

  const qualities = [
    {
      image: logo1,
      title: "Leadership",
      desc: "Fully committed to the success company",
    },
    {
      image: logo2,
      title: "Responsibility",
      desc: "Students will always be our top priority",
    },
    {
      image: logo3,
      title: "Flexibility",
      desc: "The ability to switch is an important skills",
    },
    {
      image: logo4,
      title: "Solve the problem",
      desc: "Code your way to a solution",
    },
  ];

  return (
    <div>
      {/* Part 1 */}
      <div className="white-bg lined-bg-block">
        <div className="two-btns">
          <YellowBlackBtn content={htmlBtn1} isYellow={true} linkTo="/" />
          <YellowBlackBtn content="Learn More" isYellow={false} linkTo="/" />
        </div>

        {/* Part 2 */}
      </div>
      <div className="white-bg">
        <div className=" part-2-white-bg">
          <div>
            <h1 className="font-33">
              Get the skills you need for a{" "}
              <Highlighter
                text="job that is in demand."
                fontWeight={600}
                fontSize={33}
              />{" "}
            </h1>
          </div>
          <div className="part-2-para-flex">
            <p className="common-para">
              The modern Eduvista is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <YellowBlackBtn content="Learn More" isYellow={true} />
          </div>
        </div>
      </div>

      {/* Part 3 */}
      <div className="white-bg part-3-white-bg">
        <div>
          {qualities.map((quality, index) => {
            return (
              <CompanyQuality
                image={quality.image}
                heading={quality.title}
                para={quality.desc}
                key={index}
              />
            );
          })}
        </div>
        <div className="relative ">
          
          <div className="overlaped-on-img zindex-5">
            <div className="num-para">
                <div className="number-font">10</div>
                <div className="number-para">YEARS EXPERIENCES</div>
            </div>
            <div className="line"> </div>
            <div className="num-para">
            <div className="number-font">250</div>
                <div className="number-para">TYPES OF COURSES</div>
            </div>
          </div>
          <img className="zindex-3" src={TimelineImg}></img>
          <Circle 
          width= "600px"
          height="500px"
          color= "#46e5ea"
          top="10px"
          left="10px"
          zIndex="1"
          blurValue={50}
        />
        </div>
      </div>

      {/* Part 4 */}
      <div className="white-bg part-4-white-bg">
        <h1 className="font-33">Your swiss knife for{" "}
            <Highlighter text="learning any language" fontSize={33} fontWeight={600}/>
        </h1>
        <p className="common-para part4-para">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
       
      </div>

      {/* part 5 */}
      <div className="white-bg ">
      <div className="part-5-white-bg">
        <img className="img1" src={know_your_progress} alt="know_your_progress"/>
        <img className="img2" src={compare_with_others} alt="compare_with_others" />
        <img className="img3" src={plan_your_lessons} alt="plan_your_lessons"/>
        </div>
        <div className="part-5-learn-more">
        <YellowBlackBtn  content="Learn More" isYellow={true} linkTo="/" />
        </div>
        </div>
    </div>
  );
}
export default HomeSection2;
