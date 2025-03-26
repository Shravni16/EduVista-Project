import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "../../CSS/home.css";
import Highlighter from "../../components/core/HomeComponents/Highlighter";
import YellowBlackBtn from "../../components/core/HomeComponents/YellowBlackBtn";
import Banner from "../../assets/Images/banner.mp4";
import Circle from "../../components/core/HomeComponents/Circle";
import CodeBlocks from "../../components/core/HomeComponents/CodeBlocks";
import { HomePageExplore } from "../../data/homepage-explore";
import PowerOfCode from "../../components/core/HomeComponents/PowerOfCode";

function HomeSection1() {
  const [tagName,setTagName]=useState("Free");
  const [course,setCourse]=useState(HomePageExplore[0].courses);
  

  const htmlBtn1 = (
    <div className="horizontaly-center">
      Try it Yourself <FaArrowRight />{" "}
    </div>
  );
  const htmlBtn2 = (
    <div className="horizontaly-center">
      Continue Lesson <FaArrowRight />{" "}
    </div>
  );

  function tagChangeHandler(event){
    // console.log("tagNmae:",tagName);
    setTagName(event.target.getAttribute('name'));
    // console.log("event.target.name",event.target.getAttribute('name'))
    
     const obj=HomePageExplore.filter((item)=>item.tag===event.target.getAttribute('name'));
    //  console.log("object Courses",obj[0].courses);
  setCourse(obj[0].courses);

  }

  course[0].clas="yellow single-explorer-block";
  course[1].clas="black single-explorer-block"; 
  course[2].clas="black single-explorer-block";

  return (
    <div className="section1">
      
      <Link to="/signup" className="no-underline">
        <div className="InstructorButton">
          <div>Become an Instructor</div>
          <FaArrowRight />
        </div>
      </Link>
      <h2 className="empower-heading">
        Empower Your Future with{" "}
        <Highlighter text="Coding Skills" fontWeight={600}></Highlighter>
      </h2>
      <p className="empower-para">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.{" "}
      </p>
      <div className="two-btns">
        <YellowBlackBtn
          content="Learn More"
          isYellow={true}
          linkTo="/"
        ></YellowBlackBtn>
        <YellowBlackBtn
          content="Book a Demo"
          isYellow={false}
          linkTo="/signup"
        ></YellowBlackBtn>
      </div>

      <div className="relative">
        <Circle
          width="400px"
          height="400px"
          color="#46e5eaba"
          top="50px"
          left="35px"
          zIndex="1"
          blurValue={50}
        />
        <video className="video" muted loop autoPlay>
          <source src={Banner} type="video/mp4"></source>
        </video>
      </div>

      <div>
        <CodeBlocks
          heading={
            <div>
              Unlock your{" "}
              <Highlighter
                text="coding potential"
                fontSize={28}
                fontWeight={600}
              />{" "}
              with our online courses.
            </div>
          }
          para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          btn1={{
            content: htmlBtn1,
            colorVal: true,
            linkTo: "/signup",
          }}
          btn2={{
            content: "Learn More",
            colorVal: false,
            linkTo: "/signup",
          }}
          codeblock={`<!DOCTYPE html> \n <html> \n <head><title>Example</title><link rel="stylesheet" href="styles.css"/> \n </head> \n <body> \n <h1><a href="/">Header</a> \n </h1> \n <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> \n </nav>  `}
          direction={"ltr"}
          color="#FFA500"
          // codeblock={`<!DOCTYPE html>
          // <html>
          // <head>
          //   <title>Example</title>
          //   <link rel="stylesheet" href="styles.css">
          // </head>
          // <body>
          //   <h1><a href="/">Header</a></h1>
          //   <nav>
          //     <a href="one/">One</a>
          //     <a href="two/">Two</a>
          //     <a href="three/">Three</a>
          //   </nav>
          // </body>
          // </html>`}
        />
      </div>
      <div >
        <CodeBlocks
          heading={
            <div>
              Start{" "}
              <Highlighter
                text="coding 
              in seconds"
                fontSize={28}
                fontWeight={600}
              />{" "}
            </div>
          }
          para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          btn1={{
            content: htmlBtn2,
            colorVal: true,
            linkTo: "/signup",
          }}
          btn2={{
            content: "Learn More",
            colorVal: false,
            linkTo: "/signup",
          }}
          codeblock={`<!DOCTYPE html> \n <html> \n <head><title>Example</title><link rel="stylesheet" href="styles.css"/> \n </head> \n <body> \n <h1><a href="/">Header</a> \n </h1> \n <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> \n </nav>  `}
          direction={"rtl"}
          color="#46e5ea"
        />
      </div>
      {/* Explorer block */}
      <div className="white-font relative section-1-end explorer-block-wrap">
        <div className="part-4-white-bg">
          <h1 className="font-33">Unlock the {" "} <Highlighter text="Power of Code" fontSize={33} fontWeight={600}/> </h1>
          <p className="codeblock-para">Learn to Build Anything You Can Imagine</p>
        
        <div className="filter-btn">
          <div name={"Free"} className={tagName==='Free'?"active":"inactive"} onClick={tagChangeHandler}>Free</div>
          <div name={"New to coding"} className={tagName==='New to coding'?"active":"inactive"} onClick={tagChangeHandler}>New to coding</div>
          <div name={"Most popular"} className={tagName==='Most popular'?"active":"inactive"} onClick={tagChangeHandler}>Most popular</div>
          <div name={"Skills paths"} className={tagName==='Skills paths'?"active":"inactive"} onClick={tagChangeHandler}>Skills paths</div>
          <div name={"Career paths"} className={tagName==='Career paths'?"active":"inactive"} onClick={tagChangeHandler}>Career paths</div>
        </div>
        </div>
        <div className="power-of-code-wrapper">
          {
            course.map((item,index)=>(
              <PowerOfCode key={index} title={item.heading} desc={item.description} level={item.level} lesson={item.lessionNumber} clas={item.clas}
              />
            ))
          }
         
        </div>
      </div>
    </div>
  );
}

export default HomeSection1;
