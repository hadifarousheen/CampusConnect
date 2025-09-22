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
        <div className="flex  justify-center h-[calc(100vh-4rem)]   overflow-hidden"  style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
        <div className="mx-auto w-full  md:w-1/2 mt-4" >
            <h1 className="text-3xl font-bold">Friends</h1>
            <div className="my-2"> 
            {
                connections?.map((connection)=>
                <div className="border flex justify-between my-2 p-1 rounded-lg">
                    <div>
                    <h1 className="text-2xl">{connection.firstName}{connection.lastName}</h1>
                    </div>
                    <button className="text-xl border mx-1 px-1 rounded-lg">Chat</button>
                </div>)
            }
            </div>
        </div>
        </div>
    )
}

export default Connections;