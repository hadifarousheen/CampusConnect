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

    const handleRequestReview=async(status,requestId)=>{

  const res=await axios.post("http://localhost:3000/request/review/"+status+"/"+requestId,{},{withCredentials:true});
  dispatch(removeRequest(requestId))
    }
    
    
    useEffect(()=>{
     fetchRequests();
    },[])
    return(
        <div>
            <h1>Pending Requests</h1>
   {
    requests?.map((request)=>{
     return( <div>
            <h1>{request?.fromUserId?.firstName}</h1>
            <div>
                <button onClick={()=>handleRequestReview("accepted",request.fromUserId._id)}>Accept</button>
                <button onClick={()=>handleRequestReview("rejected",request.fromUserId._id)}>Reject</button>
                </div>
        </div>
     )
    })
   }
        </div>
    )
}

export default Requests;