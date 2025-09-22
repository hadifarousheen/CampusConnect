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
        <div className="mx-auto w-full md:w-1/2">
            <h1 className="text-3xl  mt-4 font-bold my-2">Pending Requests</h1>
            <div className="my-2">
   {
    requests?.map((request)=>{
     return( <div className="border flex justify-between my-2 p-1 rounded-lg">
        <div>
            <h1>{request?.fromUserId?.firstName}</h1>
            <h2>{request?.fromUserId?.college}</h2>
            </div>
            <div className="my-auto">
                <button className="border mx-1 p-1 rounded-lg" onClick={()=>handleRequestReview("accepted",request._id)}>Accept</button>
                <button className="border mx-1 p-1 rounded-lg" onClick={()=>handleRequestReview("rejected",request._id)}>Reject</button>
                </div>
        </div>
     )
    })
   }
   </div>
        </div>
    )
}

export default Requests;