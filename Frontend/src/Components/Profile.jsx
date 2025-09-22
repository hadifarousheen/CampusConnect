import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age || "");
  const [college, setCollege] = useState(user.college || "");
  const [year, setYear] = useState(user.year || "");
  const [about, setAbout] = useState(user.about || "");
  const [branch, setBranch] = useState(user.branch || "");
  const [skills, setSkills] = useState(user.skills || "");
  const[photoUrl,setPhotoUrl]=useState(user.photoUrl || "");
  const[showToast,setShowToast]=useState(false);
  const dispatch=useDispatch();
  const handleSaveProfile=async()=>{
try{
  const user=await axios.patch("http://localhost:3000/profile/edit",{firstName,lastName,gender,age,college,year,about,branch,skills,photoUrl},{withCredentials:true});
  console.log(user)
  dispatch(addUser(user.data));
  setShowToast(true)
  setTimeout(()=>{
   setShowToast(false)
  },5000)
}catch(err){
  console.log(err.message)
}
  }  
  return (
    <>
   {showToast && <div className="border w-fit bg-amber-300 mx-auto my-2 p-1 rounded-lg ">
      <h1 className="text-center">Profile updated Successfully</h1>
    </div>
    }
    <h1 className="text-3xl font-bold text-center mt-4">Edit Profile</h1>
    <div className=" w-2/3 md:w-1/2  md:flex m-auto mt-5 border  ">
      <div className="border border-r-0 w-full p-2">
      <div className="my-2 ">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          className="border block mt-2 px-2 py-1 w-full"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          className="border block mt-2 px-2 py-1 w-full"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          className="border block mt-2 px-2 py-1 w-full"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="my-2">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="Number"
          className="border block mt-2 px-2 py-1 w-full"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>
       <div className="my-2">
        <label htmlFor="about">About</label>
        <textarea  value={about} className="border block mt-2 px-2 py-1 w-full" onChange={(e)=>{
          setAbout(e.target.value)
        }}></textarea>
      </div>
      </div>
      <div className="border border-l-0 w-full p-2">
      <div className="my-2">
        <label htmlFor="college">College</label>
        <input
          id="college"
          type="text"
          className="border block mt-2 px-2 py-1 w-full"
          value={college}
          onChange={(e) => {
            setCollege(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label htmlFor="branch">Branch</label>
        <input
          id="branch"
          type="text"
          className="border block mt-2 px-2 py-1 w-full"
          value={branch}
          onChange={(e) => {
            setBranch(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="Number"
          className="border block mt-2 px-2 py-1 w-full"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
      </div>
     
      <div className="my-2">
        <label htmlFor="skills">Skills</label>
        <input
          id="skills"
          type="text"
          className="border block mt-2 px-2 py-1 w-full"
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        />
     
      </div>
       <div className="my-2">
        <label htmlFor="photo">Profile Photo</label>
        {/* <input
          id="photo"
          type="file"
          accept="image/*"
          className="border block mt-2 px-2 py-1 w-full"
        
          onChange={(e) => {
            console.log(e.target.files[0])
            setPhotoUrl(e.target.files[0]);
           
          }}
        /> */}
        <input
          id="photo"
          type="text"
         value={photoUrl}
          className="border block mt-2 px-2 py-1 w-full"
        
          onChange={(e) => {
           
            setPhotoUrl(e.target.value);
           
          }}
        /> 
        
     
      </div>
      <button className="border w-full my-1" onClick={()=>handleSaveProfile()}>Save Profile</button>
   <Link to="/body/viewProfile">  <button className="border w-full my-1">View Profile</button></Link> 
      </div>
     </div>
    
    </>
  );
};

export default Profile;
