import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
const Body = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
   
    </>
  );
};

export default Body;
