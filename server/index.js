const express = require("express");
const app = express();

// import all the routes (this will tell upon hitting a specific path what middlewares and controllers will be exec)
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
//import the database file
const database = require("./config/database");
// import the cloudinaryConnect func
const { cloudinaryConnect } = require("./config/cloudinary");
// import middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());//to parse json content coming from client to object 
app.use(cookieParser());//to parse cookies that is coming from client

//to let the client share resources with the server
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)

// enables handling file uploads in Express.js applications.
app.use(
	fileUpload({
		useTempFiles: true, //the middleware stores uploaded files in temporary storage during the upload process instead of RAM
		tempFileDir: "/tmp", //specifies the directory where temporary files will be stored
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


//def route

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

