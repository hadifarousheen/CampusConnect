import axios from "axios";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {addRequest, removeRequest} from "../utils/requestSlice";

const Requests=()=>{
    const dispatch=useDispatch();
    const requests=useSelector(store=>store.requests)
    const fetchRequests=async()=>{
    const res=await axios.get("http://localhost:3000/user/request/received",{withCredentials:true})
    console.log(res.data)
     dispatch(addRequest(res.data));
    }

    const handleRequestReview=async(status,_id)=>{

  const res=await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,{},{withCredentials:true});
  console.log(res)
  dispatch(removeRequest(_id))
    }
    
    
    useEffect(()=>{
     fetchRequests();
    },[])
    return(
        <div className="flex  justify-center h-[calc(100vh-4rem)]   overflow-hidden"  style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
        <div className="mx-auto w-full md:w-1/2">
            <h1 className="text-3xl  font-bold my-4 text-amber-950 shadow-2xl ">Pending Requests</h1>
            <div className="my-2 ">
   {
    requests?.map((request)=>{
     return( <div className=" flex justify-between my-2 p-1 px-2 rounded-lg bg-amber-100 shadow-2xl shadow-amber-950">
        <div>
            <h1 className="text-xl font-bold">{request?.fromUserId?.firstName} {request?.fromUserId?.lastName}</h1>
            <h2 className="text-lg">{request?.fromUserId?.college}</h2>
            </div>
            <div className="my-auto text-white font-bold">
                <button className=" mx-1 p-1 px-2 rounded-lg bg-amber-500" onClick={()=>handleRequestReview("accepted",request._id)}>Accept</button>
                <button className=" mx-1 p-1 px-2 rounded-lg bg-amber-800" onClick={()=>handleRequestReview("rejected",request._id)}>Reject</button>
                </div>
        </div>
     )
    })
   }
   </div>
        </div>
        </div>
    )
}

export default Requests;