import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
const Body=()=>{
    const dispatch=useDispatch();
    const fetchUser=async()=>{
        try{
             const user=await axios.get("http://localhost:3000/profile/view",{withCredentials:true});
             dispatch(addUser(user.data));
        }catch(err){
         console.log(err.message);
        }
    }
    useEffect(()=>{
        fetchUser();
    },[]);
    return(
        <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </div>
    )
}

export default Body;