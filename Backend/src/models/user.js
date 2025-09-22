const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require("bcrypt");
const { default: isURL } = require('validator/lib/isURL');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        reauired:true,
        trim:true
    },
    emailId:{
        type:String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
   password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is Not Strong")
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
              throw new Error("Gender data is not valid")
            }
        },
        required:true
    },
     college:{
        type:String,
    },
    year:{
        type:Number,
    },
    branch:{
        type:String,
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        maxLength:150
    },
    photoUrl:{
        type:String,
        default:"https://thefinancemd.com/wp-content/uploads/2015/08/facebook-default-no-profile-pic.jpg"
    },
    age:{
        type:Number
    }

},{timestamps:true})

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user.id},process.env.TOKEN_SECRET_KEY)
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
const user=this;
const passwordHash=user.password;
 const ispasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
 return ispasswordValid;
}
const User=mongoose.model("User",userSchema);

module.exports=User;