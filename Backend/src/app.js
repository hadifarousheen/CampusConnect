const express=require("express");

const app=express();

// app.use((req,res)=>{
//     res.send("Hello Server");
// })

// app.use("/",(req,res)=>{
//     res.send("Home Page");
// })

app.use("/test",(req,res)=>{
    res.send("Testing...");
})
app.use("/",(req,res)=>{
    res.send("Home Page");
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
});