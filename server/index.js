const express=require("express");
const app=express();
const contactUsRoutes=require("./routes/contactUsRoutes")
const userRoutes=require("./routes/userRoutes");
const profileRoutes=require("./routes/profileRoutes");
const courseRoutes=require("./routes/courseRoutes");
const summarizerRoutes=require("./routes/summarizerRoutes");
const chatRoutes = require("./routes/chatbotRoutes");
// const paymentRoutes=require("./routes/paymentRoutes");

const database =require("./config/database");
const cookieParser =require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:["http://localhost:3000"],
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactUsRoutes);
app.use("/api/v1/summary",summarizerRoutes);
app.use("/api/v1/chatbot", chatRoutes);
// app.use("/api/v1/payment", paymentRoutes);



app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
