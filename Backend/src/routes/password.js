const express=require('express');
const passwordRouter=express.Router();
const User=require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const validator = require("validator");

passwordRouter.post("/forgetpassword/verifyemail",async(req,res)=>{
    const emailId=req.body.emailId;
    const user=await User.findOne({emailId:emailId})
    if(!user){
        return res.status(400).json({message:"Email not Found!"})
    }

 const actualOtp= `${Math.floor(Math.random() * 9000)}`.padStart(4,0);
 let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: '21.574hadifa@gmail.com',
                pass: process.env.AUTH_PASS
            }
        }
    );

let mailDetails = {
    from: '21.574hadifa@gmail.com',
    to: emailId,
    subject: 'OTP to Change Password',
    text: `Your OTP is ${actualOtp}`
};

mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });

        
   res.json({otp:actualOtp,user:user})
   

})


passwordRouter.post("/forgetpassword/changepassword",async(req,res)=>{
    const newPassword=req.body.password;
    const emailId=req.body.emailId;
    
    if (newPassword?.length == 0) {
      return res.status(400).json({ message: "Password is Required" });
    }
     if (
          !validator.isStrongPassword(newPassword, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          return res.status(400).json({ message: "Password is not Strong!" });
        }
   const passwordHash = await bcrypt.hash(newPassword, 10);
    
        const user=await User.findOne({emailId:emailId});
        user.password=passwordHash;
        await user.save();
        res.json({message:"Password updated"})

})


module.exports=passwordRouter;