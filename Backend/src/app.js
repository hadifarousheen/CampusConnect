const express=require("express");
const app=express();
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const authRouter=require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cors=require('cors');

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    console.log("Database Connected");
    app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
});
}).catch(err=>{
    console.log("cannot connect to database");
})

