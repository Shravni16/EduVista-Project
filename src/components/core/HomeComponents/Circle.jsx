import "../../../CSS/home.css"

function Circle(props){
    return(
        <div className="circle " style={{
            width: props.width,
            height: props.height,
            backgroundColor: props.color,
            top: props.top,
            left: props.left,
            zIndex: props.zIndex,
            filter: `blur(${props.blurValue}px)`
          }}></div>
    )
}

export default Circle;