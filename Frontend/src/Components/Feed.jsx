import { useEffect } from "react";
import axios from "axios";
import {addFeed} from "../utils/feedSlice";
import {useDispatch, useSelector} from "react-redux";
import UserCard from "./UserCard";
const Feed=()=>{
    const dispatch=useDispatch();
           const feed=useSelector(store=>store.feed);

    
    const getFeed=async()=>{
        
        const res=await axios.get("http://localhost:3000/user/feed",{withCredentials:true});
 
        dispatch(addFeed(res.data))
        console.log(feed)
       
    }
    useEffect(()=>{
        getFeed();
    },[]);
    
    return(
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]  w-screen" >
        {feed.length >0 ?  <UserCard user={feed[0]}/> : <h1>Loading....</h1>}
        </div>
    )
}

export default Feed;