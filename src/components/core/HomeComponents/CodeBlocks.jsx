import { TypeAnimation } from "react-type-animation";
import "../../../CSS/home.css"
import YellowBlackBtn from "./YellowBlackBtn";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Circle from "./Circle";

function CodeBlocks({heading,para,btn1,btn2,codeblock,direction,color}){
    // console.log(btn1);
    // console.log(btn2);

    return(<div className="codeblocks" style={{direction:direction}}>
        <div className="codeblok-sec-1" style={{direction:"ltr"}} >
            <div>
            <h2 className="codeblock-heading">{heading}</h2>
            <p className="codeblock-para">{para}</p>
            </div>
            <div className="two-btns top-mar">
            
            <YellowBlackBtn content={btn1.content} isYellow={btn1.colorVal} linkTo={btn1.linkTo}/>
            <YellowBlackBtn content={btn2.content} isYellow={btn2.colorVal} linkTo={btn2.linkTo}/>
            </div>
        </div>
       
        <div className="codeblok-sec-2 relative "style={{direction:"ltr"}} >
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
            </div>
            <TypeAnimation
            sequence={[codeblock,1000,""]}
            repeat={Infinity}
            cursor={true}
            style={
                {
                    whiteSpace:"pre-line",
                    display:"block"
                }
            }
            omitDeletionAnimation={true}
            >
               {/* <SyntaxHighlighter language="htmlbars" style={docco}>
      {codeblock}
    </SyntaxHighlighter> */}
          </TypeAnimation>
          <Circle 
          width= "150px"
          height="150px"
          color= {color}
          top="40px"
          left="120px"
          zIndex= "4"
          blurValue={100}
        />
        </div>
    </div>)
}
export default CodeBlocks