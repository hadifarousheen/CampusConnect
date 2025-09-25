const express=require("express");
const app=express();
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const authRouter=require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const passwordRouter=require("./routes/password")
const paymentRouter=require("./routes/payment")
const cors=require('cors');
const http=require('http');
const initializeSocket=require("./utils/socket");
const chatRouter=require("./routes/chat")

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
app.use("/",passwordRouter);
app.use("/",paymentRouter)
app.use("/",chatRouter)

const server=http.createServer(app)
initializeSocket(server)
connectDB().then(()=>{
    console.log("Database Connected");
    server.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
});
}).catch(err=>{
    console.log("cannot connect to database");
})

