import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  getValues,
  setValue,
})
 {

  const [tags, setTags] = useState([]);
  const {course}=useSelector((state)=>state.course);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (course) {
  //  console.log("course.tag",course.tag);
      // const parsedTags = course.tag.split(',');
      setTags( course.tag);
    
    }
  }, [course]);

   function keyDownHandler(e){
    // console.log(getValues());
    if (e.key === 'Enter') {
      e.preventDefault();
      // console.log("Inside Enter")
      const newTag = inputValue.trim();
      // console.log("Input value",inputValue);
      if (newTag !== '') {
        setTags([...tags, newTag]);
       
        setInputValue('');
       
        // console.log("tags",tags);
      }
    }
   }

   useEffect(()=>{
    setValue("tag",tags);
    // console.log("getValues()",getValues());
   },[tags]);

   function handleChange(e){
    setInputValue(e.target.value);
   }
  function removeTag(item){
    
    // console.log(tags.filter(element => element !== item));
    setTags(tags.filter(element => element !== item));
   
   
  }




  return (<div>
    <label htmlFor={name} className="dash-label">Choose Tags</label>
    {
      tags.map((item,index)=>{
          return <span className="tag" key={index} onClick={()=>{removeTag(item)}} value={item}>{item}</span>
      })
    }
    <input
     className="dash-imp full-width"
    type="text"
    id={name}
    name="tag"
    onKeyDown={keyDownHandler}
    onChange={handleChange}
    placeholder={placeholder}
   value={inputValue}
    
    />
    
  </div>);
}
export default ChipInput;
