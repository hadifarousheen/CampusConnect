const validateEditProfileData=(req)=>{
     const allowedEditFields=["firstName","lastName","gender","about","college","skills","year","branch","photoUrl","age"];
    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    return isEditAllowed;
}

 module.exports=validateEditProfileData;