import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[showMenu,setShowMenu]=useState(false)
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-between  opacity-90 p-1 shadow-2xl shadow-amber-950" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
        <div className="flex items-center">
      <Link to="/body/feed">
        <h1 className="font-bold text-2xl mx-1 opacity-100 text-amber-950 ">CampusConnect</h1>
      </Link>
      </div>
      <div className="flex my-auto relative">
      <div className="hidden md:block my-auto text-lg">
         <Link to="/body/profile" className=" mx-1 bg-amber-400 rounded-lg py-1 px-2">Profile</Link>
          <Link to="/body/connections" className=" mx-1 bg-amber-400 rounded-lg py-1 px-2">Friends</Link>
          <Link to="/body/requests" className=" mx-1 bg-amber-400 rounded-lg py-1 px-2">Requests</Link>
          <button className="mx-1 bg-amber-400 rounded-lg py-1 px-2" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* <Link to="/body/profile" onClick={()=>{
          setShowMenu(true)
        }}> */}
         
          <img
          onClick={()=>{
            setShowMenu(!showMenu)
          }}
            className="h-12 w-12 border mr-2 rounded-full my-auto relative"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
            alt="profile-photo"
          />
        {/* </Link> */}
       { showMenu && <div className="z-50 md:hidden text-white absolute border top-12 right-0  my-auto text-lg shadow-xl shadow-amber-600">
             <Link to="/body/profile" className="w-full my-1 mx-1 bg-amber-500  py-1 px-2 block">Profile</Link>
          <Link to="/body/connections" className="w-full mx-1 bg-amber-500  py-1 px-2 block my-1">Friends</Link>
          <Link to="/body/requests" className=" mx-1 bg-amber-500  py-1 px-2 block w-full my-1">Requests</Link>
          <button className="mx-1 bg-amber-500 w-full py-1 px-2 block my-1" onClick={handleLogout}>
            Logout
          </button>
        </div>
}
      </div>
    </div>
  );
};

export default NavBar;
