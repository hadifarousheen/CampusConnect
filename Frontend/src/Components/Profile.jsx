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
  const [skills, setSkills] = useState(user.skills || []);
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
  },3000)
}catch(err){
  console.log(err.message)
}
  }  
  return (
    <>
   {showToast && <div className="w-1/2 md:w-fit bg-amber-600 text-white mx-auto my-2 p-1 px-2 rounded-lg absolute top-2 left-1/2 -translate-x-1/2 ">
      <h1 className="text-center">Profile updated Successfully</h1>
    </div>
    }
    <div className="text-amber-950 md:relative  md:h-[calc(100vh-3.5rem)]    "  style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
    <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full  md:w-1/2 ">
    <h1 className="text-3xl font-bold text-center pt-2 md:mt-4">Edit Profile</h1>
    <div className="    md:flex m-auto mt-5  bg-transparent border border-amber-400 rounded-lg shadow-2xl shadow-amber-950 ">
      <div className="  w-full p-2">
      <div className="my-2 ">
        <label htmlFor="firstName" className="font-bold text-xl">First Name</label>
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
        <label htmlFor="lastName" className="font-bold text-xl">Last Name</label>
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
        <label htmlFor="gender" className="font-bold text-xl">Gender</label>
        <select
          id="gender"
          className="border block mt-2 px-2 py-1 w-full font-bold text-xl"
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
        <label htmlFor="age" className="font-bold text-xl">Age</label>
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
        <label htmlFor="about" className="font-bold text-xl">About</label>
        <textarea rows={5} cols={40} value={about} className="border block mt-2 px-2 py-1 box-border w-full  " onChange={(e)=>{
          setAbout(e.target.value)
        }}></textarea>
      </div>
      </div>
      <div className=" w-full md:p-2 px-2">
      <div className="my-2">
        <label htmlFor="college" className="font-bold text-xl">College</label>
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
        <label htmlFor="branch" className="font-bold text-xl">Branch</label>
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
        <label htmlFor="year" className="font-bold text-xl">Year</label>
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
        <label htmlFor="skills" className="font-bold text-xl">Skills</label>
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
        <label htmlFor="photo" className="font-bold text-xl">Profile Photo</label>
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
      <button className="border w-full my-1 bg-amber-500 text-white font-bold rounded-lg" onClick={()=>handleSaveProfile()}>Save Profile</button>
   <Link to="/body/viewProfile">  <button className="border w-full my-1 bg-amber-700 text-white font-bold rounded-lg">View Profile</button></Link> 
      </div>
     </div>
     </div>
    </div>
    </>
  );
};

export default Profile;
