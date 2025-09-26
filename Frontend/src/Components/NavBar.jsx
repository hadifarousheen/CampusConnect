import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="flex justify-between   p-1 shadow-2xl shadow-amber-950"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="flex items-center">
        <Link to="/body/feed">
          <h1 className="font-bold text-2xl mx-1 opacity-100 text-amber-950 ">
            CampusConnect
          </h1>
        </Link>
      </div>
      <div className="flex my-auto relative">
        <div className="hidden md:block my-auto text-lg">
          <Link
            to="/body/profile"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2"
          >
            Profile
          </Link>
          <Link
            to="/body/premium"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2"
          >
            Premium
          </Link>
          <Link
            to="/body/connections"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2"
          >
            Friends
          </Link>
          <Link
            to="/body/requests"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2"
          >
            Requests
          </Link>
          <button
            className="mx-1 bg-amber-400 rounded-lg py-1 px-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="flex my-auto relative z-50">
          <img
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto relative"
            src={user?.photoUrl}
            alt="profile-photo"
          />
        </div>

        {showMenu && (
          <div className="flex flex-col order-1 rounded-xl  md:hidden text-white absolute z-[1001]  top-12 right-0   text-lg shadow-xl shadow-amber-600 text-left bg-transparent">
            <Link
              to="/body/profile"
              className="w-full   bg-amber-500  py-1 px-2 block"
            >
              Profile
            </Link>
            <Link
              to="/body/premium"
              className="w-full   bg-amber-500  py-1 px-2 block"
            >
              Premium
            </Link>
            <Link
              to="/body/connections"
              className="w-full  bg-amber-500  py-1 px-2 block "
            >
              Friends
            </Link>
            <Link
              to="/body/requests"
              className="  bg-amber-500  py-1 px-2 block w-full "
            >
              Requests
            </Link>
            <button
              className="text-left  bg-amber-500 w-full py-1 px-2 block  "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
