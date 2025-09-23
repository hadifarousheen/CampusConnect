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

  <div className="border border-amber-300 w-2/3 md:w-1/5 p-4 rounded-lg  shadow-2xl shadow-amber-950 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 bg-amber-100 opacity-80">
    <img className="h-60 w-60 rounded-lg" src={photoUrl} />
    <div className="my-2">
    <h1 className="my-2 font-bold text-2xl">{firstName + " " + lastName}</h1>
    <div className="text-lg">
    {age && gender && <p><span className="font-bold">{age}</span>,{ gender}</p>}
    <p>{about}</p>
   {college && <p><span className="font-bold">College: </span>{college}</p>}
   {year && <p><span className="font-bold">Year: </span>{year}</p>}
   {branch && <p><span className="font-bold">Branch: </span>{branch?.toUpperCase()}</p>}
   <p className="my-2"> {skills?.map((skill)=><span className=" px-2 bg-amber-600 text-white mr-1 py-0.5 rounded-lg">{skill}</span>)}</p>
    </div>
    </div>
    <div className="flex gap-1 text-white font-bold py-2">
        <button className=" bg-amber-500 w-1/2 py-1 rounded-lg hover:scale-90" onClick={()=>handleClick('interested',_id)}>Interested</button>
        <button className="w-1/2 py-1 bg-amber-800 rounded-lg hover:scale-90" onClick={()=>handleClick('ignored',_id)}>Ignore</button>
    </div>
  </div>


       
    )
}

export default FeedCard;