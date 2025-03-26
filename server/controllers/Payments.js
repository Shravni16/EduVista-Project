const { default: mongoose } = require("mongoose");
const Course=require("../models/Course");
const User=require("../models/User")
const {instance}=require("../config/razorpay");
const mailSender=require("../utility/mailSender");



exports.capturePayment=async (req,res)=>{
   
        //fetch userId and courseId from request
        const {courseId}=req.body;
        const userId=req.user.id;

        //check if courseId is not null
        if(!id || !courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        let courseDetails;
        try{
        //validate course
         courseDetails=await Course.findById(courseId);
        if(!courseDetails){
            return res.status(401).json({
                success:false,
                message:"Enter valid course Id"
            })
        }
        //check if course is alredy purchased by user
        const uid=new mongoose.Types.ObjectId(userId);
        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(401).json({
                success:false,
                message:"Student is already enrolled"
            })
        }
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    //create order
    const amount= courseDetails.price;
    const currency="INR"

    const options={
        amount:amount*100,
        currency,
        recipt:Math.random(Date.now()).toString(),
        notes:{
            courseId,
            userId
        }
    }
    try{
        //initiate payment
    const paymentResponse=await instance.orders.create(options);
    console.log(paymentResponse);
    //return response
    return res.status(200).json({
        success:true,
        message:"Order Created Successfully",
        courseName:courseDetails.courseName,
        courseDesc:courseDetails.courseDesc,
        thumbnail:courseDetails.thumbnail,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,
        orderId:paymentResponse.id
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Could not initiate order"
        })
    }
    
}

exports.verifySignature=async (req,res)=>{
    //samaz nahi aya
    const webhookSecret="123456";
    const signature=req.headers["x-razorpay-signature"];

    const shasum=crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature===digest){
        const {userId,courseId}=req.body.payload.payment.entity.notes;

        try{
            //find course details and enroll student in it
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            );
            //if any problem
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found"
                })
            }
            console.log(enrolledCourse);
            //add course in student course array
            const enrolledStudent=await User.findByIdAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            );
            console.log(enrolledStudent);

            //send mail of conformation
            const mailResponse=await mailSender(enrolledStudent.email,
                "Congratulations , You are onboarded into new codehelp Course",
                "Congratulations from Codehelp");

                console.log(mailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature verified and course enrolled"

                })
        }catch(error){
            console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
           
        })
        }
    }
    else{
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Invalid Request"
        })
    }
}