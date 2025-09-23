import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router";
import {addUser} from "../utils/userSlice";

const Login = () => {
    const[emailId,setEmail]=useState("tom@gmail.com");
    const[password,setPassword]=useState("Tom@123");
    const[error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin=async()=>{
    try{
        const res=await axios.post("http://localhost:3000/login",{emailId,password},{withCredentials:true});
        setError("")
        dispatch(addUser(res.data));
        navigate("/body");
    }catch(err){
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message)
    }
    }

  return (
    <div 
  className="h-screen w-screen bg-cover bg-center" 
  style={{ backgroundImage: "url('https://i.pinimg.com/1200x/85/cf/7b/85cf7b4993b6519887effa15951ca46b.jpg')" }}
>
    <div className="flex items-center justify-center min-h-screen bg-black opacity-70 text-white">
      <div className="border w-fit p-6 rounded-lg shadow-xl/30 shadow-white">
        <h1 className="text-3xl font-bold my-4 ">Login</h1>
        <div className="text-2xl">
          <div className="my-2">
            <label htmlFor="email">Email Id</label>
            <input
              id="email"
              type="email"
              className="border block mt-2 px-2 py-1"
              value={emailId}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              className="border block mt-2 px-2 py-1"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="flex justify-between">
          <Link to="/signup" className="text-sm text-amber-400">New User?</Link>
          <Link to="/resetPassword" className="text-sm text-amber-400">Forgot Password?</Link>
          </div>
          <p className="text-red-600 text-xl">{error}</p>
          <button onClick={handleLogin} className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded">
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
