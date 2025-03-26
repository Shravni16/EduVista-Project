import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { apiConnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";
import ChipInput from "./ChipInput";
import { useDispatch } from "react-redux";
import InstructionSet from "./InstructionSet";
import { useLocation } from "react-router-dom";
import CourseBtns from "../../../common/CourseBtns";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";
import {
  createCourseFunction,
  getCategoryIdByName,
} from "../../../../services/operations/CourseAPI";
import { updateCourseFunction } from "../../../../services/operations/CourseAPI";
import { setLoading } from "../../../../slices/courseSlice";
import Loader from "../../../common/Loader";

function CourseInformation() {
  const { course, editCourse ,addCourse} = useSelector((state) => state.course);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.course);

  const [allCategories, setAllCategories] = useState([]);
  // const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    dispatch(setLoading(true));
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Form Result",result);
      // console.log("result.data.Categories",result.data.Categories)
      if (result.data.Categories.length > 0) {
        setAllCategories(result.data.Categories);
        // console.log("result.data.Categories",result.data.Categories)
      }
    } catch (error) {
      // console.log("could not fetch category list");
    }
    dispatch(setLoading(false));
  };
  const location=useLocation();
 
  useEffect(() => {
    // console.log("In Course info");
    fetchSubLinks();
    //location.pathname=="/dashboard/add-course" ? (editCourse && addCourse) :(editCourse)

    if ( editCourse) {
      // console.log("coursedata",course);
      
        setValue("courseName", course.courseName);
        setValue("courseDesc", course.courseDesc);
        setValue("price", course.price);
        // console.log("parsed",JSON.parse(course.tag));
        // const tagsArray = course.tag.split(',');
        // console.log("parsed", tagsArray);
        setValue("tag", course.tag);
        setValue("thumbnail", course.thumbnail);
        setValue("whatYouWillLearn", course.whatYouWillLearn);
        setValue("category", course.category);
        setValue("instructions", course.instructions);
      }
   
    
    // console.log("All categories", allCategories);
  }, []);

  function isFormChanged() {
    const data = getValues();
    if (course.courseName !== data.courseName) {
    }
  }
  // console.log("course", course);
  useEffect(() => {
    if (!editCourse) {
      dispatch(setCourse(null));
    }
  }, []);

  async function submitHandler(e) {
    //  e.preventDefault();
    const data = getValues();
    // console.log(data);
    // console.log("submitted");

    if (editCourse) {
      // console.log("course in info", course);
      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append("courseName", data.courseName);
      formData.append("courseDesc", data.courseDesc);
      formData.append("price", data.price);
      //  console.log("cstegory",data.category);
      //  const cat=await getCategoryIdByName(data.category);

      formData.append("category", data.category);
      formData.append("tag",JSON.stringify( data.tag));
      let thumb;
      if (data.thumbnail != course.thumbnail) {
        thumb = data.thumbnail[0];
        // console.log("thumb in data", data.thumbnail[0]);
      } else {
        thumb = course.thumbnail;
        // console.log("thumb in course", thumb);
      }

      formData.append("thumbnail", thumb);
      formData.append("totalDuration", "2hr");
      formData.append("whatYouWillLearn", data.whatYouWillLearn);
      formData.append("instructions",JSON.stringify(data.instructions));
      dispatch(updateCourseFunction(formData, token));
      dispatch(setStep(2));
    } else {
      // console.log("TOken", token);
      const formData = new FormData();
      formData.append("courseName", data.courseName);
      formData.append("courseDesc", data.courseDesc);
      formData.append("price", data.price);
      //  console.log("cstegory",data.category);
      //  const cat=await getCategoryIdByName(data.category);

      formData.append("category", data.category);
      formData.append("tag", JSON.stringify(data.tag));
      // formData.append("tag", data.tag);
      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("totalDuration", "2hr");
      formData.append("whatYouWillLearn",data.whatYouWillLearn);
      formData.append("instructions",JSON.stringify(data.instructions) );
      // console.log("Non stringified",data.instructions)
      // console.log("stringified instruction",JSON.stringify(data.instructions))
      // console.log("Form data")
    //   for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }
      dispatch(createCourseFunction(formData, token));

      dispatch(setStep(2));
      dispatch(setEditCourse(true));
      //  for (const entry of formData.entries()) {
      //   console.log(entry[0], entry[1]);

      // }

      // console.log(formData.entries());
    }
  }

  // useEffect(() => {
  //   if (course) {
  //     // Split the tag string into an array of tags
  //     const parsedTags = course.tag.split(',');
  //     setTags(parsedTags);
  //   }
  // }, [course]);
  return (
    <div className="ci-profile-section">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="courseName" className="dash-label">
              <div>
                Course Title<sup>*</sup>
              </div>
            </label>
            <input
              className="ci-dash-imp "
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter Course Title"
              {...register("courseName", { required: true })}
            />
            {errors.courseName && <p>Please enter Course Title</p>}
          </div>

          <div>
            <label htmlFor="courseDesc" className="dash-label">
              <div>
                Course Description<sup>*</sup>
              </div>
            </label>
            <textarea
              className="ci-dash-imp"
              type="text"
              name="courseDesc"
              id="courseDesc"
              placeholder="Enter Course Description"
              cols="30"
              rows="7"
              {...register("courseDesc", { required: true })}
            />
            {errors.courseDesc && <span>Please enter Course Description</span>}
          </div>

          <div>
            <label htmlFor="price" className="dash-label">
              <div>
                {" "}
                Course Price <sup>*</sup>
              </div>
            </label>
            <HiOutlineCurrencyRupee />
            <input
              className="ci-dash-imp"
              type="text"
              name="price"
              id="price"
              
              placeholder="Enter Course Price"
              {...register("price", { required: true, valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.price && <span>Please enter Course Price</span>}
          </div>

          <div>
            <label htmlFor="category" className="dash-label">
              Category
            </label>
            <select
              className="ci-dash-imp"
              id="category"
              name="category"
              defaultValue=""
              {...register("category", { required: true })}
            >
              <option value="" disabled>
                Choose an Category
              </option>
              {allCategories.map((item, index) => {
                return (
                  <option key={index} value={item?._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <ChipInput
            label="Tags"
            name="tag"
            placeholder="Enter Tags and Press enter"
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
          />
          <div>
            <label htmlFor="thumbnail" className="dash-label">
              <div>
                Course Thumbnail<sup>*</sup>
              </div>
            </label>
            <input
              className="ci-dash-imp"
              type="file"
              name="thumbnail"
              id="thumbnail"
              placeholder="Upload Image"
              {...register("thumbnail")}
            />
            {errors.thumbnail && <span>Please enter Course Thumnail</span>}
          </div>

          <div>
            <label htmlFor="whatYouWillLearn" className="dash-label">
              <div>
                Course Benefits<sup>*</sup>
              </div>
            </label>
            <textarea
              className="ci-dash-imp"
              type="text"
              name="whatYouWillLearn"
              id="whatYouWillLearn"
              placeholder="Enter Course Benifits"
              cols="30" 
              rows="7"
              {...register("whatYouWillLearn", { required: true })}
            />
            {errors.whatYouWillLearn && (
              <span>Please enter Course Benefits</span>
            )}
          </div>

          <InstructionSet
            label="Instructions"
            name="instructions"
            placeholder="Enter Instructions and Press enter"
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
          />

          {editCourse && (
             <button className="no-default-btn" onClick={() => dispatch(setStep(2))}><CourseBtns content="  Continue Without saving" isYellow={false}/></button>
   
        
          )}

          <button type="submit" className="next-btn-add-course">{editCourse ? "Save Changes" : "Next"}</button>
        </form>
      )}
    </div>
  );
}

export default CourseInformation;
