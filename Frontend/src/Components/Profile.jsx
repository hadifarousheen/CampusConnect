import { useState } from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";


const Profile=()=>{
        const user=useSelector(store=>store.user)

    const[firstName,setFirstName]=useState(user.firstName);
    const[lastName,setLastName]=useState(user.lastName);
    const[gender,setGender]=useState(user.gender);
    const[age,setAge]=useState(user.age);
    const[college,setCollege]=useState("");
    const[year,setYear]=useState("");
    return(
      <div>
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]  w-screen">
            <div>
                <div className="my-2">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              className="border block mt-2 px-2 py-1"
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
            />
          </div>
            
            <div className="my-2">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              className="border block mt-2 px-2 py-1"
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
            />
          </div>
          <div className="my-2">
            <label htmlFor="gender">Gender</label>
            <input
              id="lastName"
              type="text"
              className="border block mt-2 px-2 py-1"
              value={gender}
              onChange={(e)=>{setGender(e.target.value)}}
            />
          </div>
            </div>
            <UserCard user={{firstName,lastName,college,year}}/>
        </div>
        </div>
    )
}

export default Profile;