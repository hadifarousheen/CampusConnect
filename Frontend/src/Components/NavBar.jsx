import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="flex justify-between bg-amber-600 p-1">
        <div className="flex items-center">
      <Link to="/body/feed">
        <h1 className="font-bold text-2xl mx-1 text-amber-950 ">CampusConnect</h1>
      </Link>
      </div>
      <div className="flex my-auto">
        <div className="my-auto text-lg">
          <Link to="/body/connections" className=" mx-1 bg-amber-400 rounded-lg py-1 px-2">Friends</Link>
          <Link to="/body/requests" className=" mx-1 bg-amber-400 rounded-lg py-1 px-2">Requests</Link>
          <button className="mx-1 bg-amber-400 rounded-lg py-1 px-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Link to="/body/profile">
          {" "}
          <img
            className="h-12 w-12 border mr-2 rounded-full my-auto"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
            alt="profile-photo"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
