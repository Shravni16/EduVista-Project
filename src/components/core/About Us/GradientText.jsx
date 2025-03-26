import "../../../CSS/about.css";

function GradientText ({text,dir,color,fontSize}){
    
    const gradientStyle = {
        fontSize: fontSize,
        backgroundImage: `linear-gradient(${dir}, ${color.join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };
    return (
        <span style={gradientStyle}  className="gradient-text">
            {text}
        </span>
    )
}

export default GradientText;