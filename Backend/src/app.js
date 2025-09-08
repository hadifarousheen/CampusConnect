const express=require("express");

const app=express();


// app.use("/user",(req,res)=>{
//     res.send("Hahahahaha")
// })

app.get("/user/:userID/:name",(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
res.send({firstname:"Hadifa",lastname:"Rousheen"});
})

app.post("/user",(req,res)=>{
    res.send("Data Saved to Database")
})

app.delete("/user",(req,res)=>{
    res.send("Data Deleted")
})

// app.use("/user",(req,res)=>{
//     res.send("Hahahahaha")
// })

app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
});