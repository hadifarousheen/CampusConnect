const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const validateEditProfileData = require('../utils/validation');

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    res.send(req.user)
})


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
    if(!validateEditProfileData(req)){
        throw new Error("Invalid edit request");
    }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
    await loggedInUser.save();
    res.send("Profile Updated Successfully")
    }catch(err){
        res.status(401).send(err.message);
    }
})

module.exports=profileRouter;