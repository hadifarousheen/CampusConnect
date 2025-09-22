import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";

const FeedCard=({user})=>{
    const{firstName,lastName,age,gender,about,skills,college,year,branch,photoUrl,_id}=user;
    const dispatch=useDispatch();
    const handleClick=async(status,toUserId)=>{
     const res=await axios.post("http://localhost:3000/request/send/"+status+"/"+toUserId,{},{withCredentials:true})
     dispatch(removeFromFeed(toUserId))
    }
    return(

  <div className="border w-2/3 md:w-1/5 p-4 rounded-lg bg-transparent  shadow-xl/30 shadow-amber-800">
    <img className="h-60 w-60" src={photoUrl} />
    <div className="my-2">
    <h1 className="my-1 font-bold text-2xl">{firstName + " " + lastName}</h1>
    <div className="text-xl">
    <p>{ age},{ gender}</p>
    <p>{about}</p>
    <p>{college}</p>
    <p>{year} {branch.toUpperCase()}</p>
    <p>{skills.map((skill)=><span className="border ">{skill}</span>)}</p>
    </div>
    </div>
    <div className="flex gap-1">
        <button className="border w-1/2" onClick={()=>handleClick('interested',_id)}>Interested</button>
        <button className="border w-1/2" onClick={()=>handleClick('ignored',_id)}>Ignore</button>
    </div>
  </div>


       
    )
}

export default FeedCard;