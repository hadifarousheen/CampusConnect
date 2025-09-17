const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter=express.Router();
const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
      
        const toUser=await User.findById(toUserId);
        if(!toUser){
            throw new Error("User not found")
        }

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status type")
        }

        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},{
                    fromUserId:toUserId,toUserId:fromUserId
                }
            ]
        })
        if(existingConnectionRequest){
            throw new Error("Connection Request already exist")
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,toUserId,status
        })
        await connectionRequest.save();

        res.send("Connection request send")
    }catch(err){
        res.status(401).send(err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const allowedStatus=["accepted","rejected"];
        const{status,requestId}=req.params;
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status type");
        }
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
        if(!connectionRequest){
            throw new Error("Connection request not found")
        }
        connectionRequest.status=status;
        await connectionRequest.save();
        res.send("Connection request"+status);
    }catch(err){
        res.send(err.message)
    }
})

module.exports=requestRouter;