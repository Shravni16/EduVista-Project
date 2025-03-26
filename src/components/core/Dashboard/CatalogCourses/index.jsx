import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCategoryIdByName, getCategoryPageDetails } from "../../../../services/operations/CourseAPI";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import "./catlog.css"
import Courseslider from "./Courseslider"

function CatalogCourses(){
    const {categoryName}=useParams();
     const [categoryId,setCategoryId]=useState(null);
     const [catData,setCatData]=useState(null);
     const {token}=useSelector((state)=>state.auth)
    useEffect(()=>{
   async  function getCatId(){
        const catId=await getCategoryIdByName(categoryName,token);
        setCategoryId(catId);
        // console.log("cat Id",catId);
    }
    getCatId();
    },[categoryName]);

    useEffect(()=>{
        if(categoryId){
        async function getCatDetails(){
            try{
                const data=await getCategoryPageDetails(categoryId,token);
            // console.log("all data",data);
            setCatData(data)
            }catch(error){
                console.log(error.message)
            }
        }
      
        getCatDetails()
      }
    },[categoryId])

    return(<div>
        <section className="catlog-sec-1">
            <p className="catlog-white-text">Home / Catlog / <span className="catlog-yellow-text">{categoryName}</span></p>
            <h2>{categoryName}</h2>
            <p className="catlog-para">{catData?.selectedCategory?.description}</p>
        </section>
        <section className="catlog-sec-2">
            <h1 className="catlog-sec-2-head">Courses to get you started</h1>
            <Courseslider courses={catData?.selectedCategory?.courses}/>
        </section>

        <section className="catlog-sec-2">
            <h1 className="catlog-sec-2-head">
                Top courses in {catData?.differentCategory?.name}  </h1>
                <Courseslider courses={catData?.differentCategory?.courses}/>
          
        </section>
        <section className="catlog-sec-2">
            <h1 className="catlog-sec-2-head">Frequently Brought</h1>
            <div className="cat-grid">
            {
                catData?.mostSellingCourses?.slice(0,4).map((course)=>{
                    return (
                        <div className="cat-grid-child"><CourseCard className="card-stretch" key={course._id} Course={course}/></div>
                    )
                })
            }
            </div>
        </section>
    </div>)
}

export default CatalogCourses