import { useEffect, useState } from "react";
import "./addcourse.css"
import { useSelector } from "react-redux";
import "./addcourse.css"
function InstructionSet(
 { label,
  name,
  placeholder,
  register,
  errors,
  getValues,
  setValue}
){

  const [instructions,setInstructions]=useState([]);
  const [inputValue,setInputValue]=useState('');
  const {course}=useSelector((state)=>state.course);

  useEffect(() => {
    if (course) {
      
      setInstructions(course.instructions);
    }
  }, [course]);

 function keyDownHandler(e){
  // console.log(getValues());
     if(e.key==='Enter'){
        e.preventDefault();
        const instruct=inputValue.trim();
        if(instruct!==''){
           setInstructions([...instructions,instruct]);
           setInputValue(''); 
          //  console.log("Instrcutions",instructions)
        }
     }
 }

 function changeHandler(e){
   setInputValue(e.target.value);
   
 }
 function removeHandler(event,item){
event.preventDefault();
  setInstructions(instructions.filter(element=>element !==item));

 }

 useEffect(()=>{
      setValue("instructions",instructions);
      // console.log("getValues()",getValues());
 },[instructions]);




  return (<div>
    <label htmlFor="instructions" className="dash-label"><div>Requirements <sup>*</sup></div></label>
   <input
    className="dash-imp full-width"
   type="text"
   name="instructions"
   id="instructions"
   onKeyDown={keyDownHandler}
   onChange={changeHandler}
   value={inputValue}
   placeholder={placeholder}
   />
   <ol>
   {

    instructions.map((item,index)=>{
        return <li   key={index}><div className="one-instruction">{item} 
        <button className="remove-btn" onClick={(event)=>(removeHandler(event,item))}>Remove</button></div>
        </li>
    })
   }</ol>
  </div>);
}

export default InstructionSet;
