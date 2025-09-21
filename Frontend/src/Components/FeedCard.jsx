import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";

const FeedCard=({user})=>{
    const{firstName,lastName,age,gender,about,skills,college,year,branch,photoUrl,_id}=user;
    const dispatch=useDispatch();
    const handleClick=async(status,toUserId)=>{
     const res=await axios.post("http://localhost:3000/request/send/"+status+"/"+toUserId,{},{withCredentials:true})
     dispatch(removeFromFeed(_id))
    }
    return(

  <div className="border w-1/5 p-2 rounded-lg">
    <img className="h-60 w-60" src={photoUrl} />
    <h1>{firstName + " " + lastName}</h1>
    <p>{age} {gender}</p>
    <p>{about}</p>
    <p>{college}</p>
    <p>{year} {branch}</p>
    <p>{skills}</p>
    <div>
        <button className="border" onClick={()=>handleClick('interested',_id)}>Interested</button>
        <button className="border" onClick={()=>handleClick('ignored',_id)}>Ignore</button>
    </div>
  </div>


       
    )
}

export default FeedCard;