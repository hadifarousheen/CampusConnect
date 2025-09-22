const jwt=require('jsonwebtoken');
const User=require("../models/user")
const userAuth=async(req,res,next)=>{
   const {token}=req.cookies;
    const decodedObj=await jwt.verify(token,process.env.TOKEN_SECRET_KEY);
    const {_id}=decodedObj;
    const user=await User.findById({_id:_id});
    req.user=user;
    next();

}
module.exports={userAuth};