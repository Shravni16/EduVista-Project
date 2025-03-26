const Category = require("../models/Category");
const Course = require("../models/Course");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
  try {
    //fetching
    const { name, description } = req.body;

    //validation
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    //create db entry for Category
    const categoryCreated = await Category.create({ name, description });

    // console.log("Category Created : ", categoryCreated);

    //return response
    res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while creating Category",
      });
  }
};

exports.getCategoriesByName=async (req,res)=>{
  try{
    // console.log("wofooo")
     const {categoryName}=req.body;
    //  console.log("cat name *******************",categoryName);
     const catData= await Category.findOne({name:categoryName});
    //  console.log("Cat data".catData);
     res.status(200).json({
      success:true,
      data:catData._id,
      message:"Category id fetched"
     })

  }catch(error){
    console.log(error),
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while Fetching Category",
    });
  }
}

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      Categories: allCategories,
      message: "All Categories returend successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while displaying Category",
      });
  }
};

//category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    //fetch category id from request body
    const { categoryId } = req.body;

    //get all courses of that category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReview",
      populate: {
        path: "instructor",
    },
    })
      .exec();

    //validation if there do not exist course for any category
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    
    //get courses for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
   
  

      let differentCategory = await Category.findOne(
        differentCategories[getRandomInt(differentCategories.length)]
          ._id
      )  .populate({
        path: "courses",
       match: { status: "Published" },
        populate: "ratingAndReview",
        populate: {
          path: "instructor",
      },
      })
        .exec();
      // console.log("dii",differentCategory);
       

    //get top 10 selling courses
    const allCategories = await Category.find().populate({
      path: "courses",
     match: { status: "Published" },
      populate: "ratingAndReview",
      populate: {
        path: "instructor",
    },
    })
      .exec();
        

        const allCourses = allCategories.flatMap((category) => category.courses)
        // console.log("all courses",allCourses);
        const mostSellingCourses = allCourses
        .sort((a, b) =>b.studentsEnrolled.length - a.studentsEnrolled.length)
        .slice(0, 10)
    
    // //output will be array which will contain course id and students enrolled in that courses so we need to fetch top 10 courses from it
  
   
    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory:selectedCategory,
        differentCategory:differentCategory,
        mostSellingCourses:mostSellingCourses,
      },
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while fetching category page",
      error: error.message,
    });
  }
};
