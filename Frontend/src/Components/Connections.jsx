import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections=()=>{
    const dispatch=useDispatch();
    const connections=useSelector(store=>store.connections)
    const fetchConnections=async()=>{
    try{
     const res=await axios.get("http://localhost:3000/user/connections",{withCredentials:true});
      dispatch(addConnections(res.data));
    }catch(err){
        console.log(err.message)
    }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    return (
        <div className="mx-auto  w-1/2 mt-4">
            <h1 className="text-3xl">Friends</h1>
            <div>
            {
                connections?.map((connection)=>
                <div className="border flex justify-between">
                    <div>
                    <h1>{connection.firstName}{connection.lastName}</h1>
                    </div>
                    <button>Chat</button>
                </div>)
            }
            </div>
        </div>
    )
}

export default Connections;