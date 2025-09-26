const validator = require("validator");
const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "college",
    "skills",
    "year",
    "branch",
    "photoUrl",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
const validateSignUpData = (user) => {
  const { firstName, lastName, emailId, password, gender } = user;

  if (!firstName || firstName.trim().length === 0) {
    return "First Name is Required";
  }
  if (!lastName || lastName.trim().length === 0) {
    return "Last Name is Required";
  }
  if (!gender || gender.trim().length === 0) {
    return "Gender is Required";
  }
  if (!emailId || emailId.trim().length === 0) {
    return "Email is Required";
  }
  if (!password || password.trim().length === 0) {
    return "Password is Required";
  }


  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrong) {
    return "Password is not Strong!";
  }

  return null; 
};
module.exports = { validateEditProfileData, validateSignUpData };
