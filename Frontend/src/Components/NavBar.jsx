import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState,useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.user);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isUserPremium, setisUserPremium] = useState(false);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout",{}, {
        withCredentials: true,
      });
      
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) 
    ) {
      setShowMenu(false);
    }
  };

  if (showMenu) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [showMenu]);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setisUserPremium(true);
    }
  };
   useEffect(() => {
    verifyPremiumUser();
  }, []);

  return (
    <div
      className="flex justify-between    shadow-2xl shadow-amber-950 ovrl"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="flex items-center">
        <Link to="/body/feed">
          <h1 className="font-bold text-2xl mx-1 opacity-100 text-amber-950 hover:scale-105 ">
            CampusConnect{isUserPremium && "☑"}
          </h1>
        </Link>
      </div>
      <div className="flex my-auto relative">
        <div className="hidden md:block my-auto text-lg">
          <Link
            to="/body/profile"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2 shadow-xl/30 shadow-amber-700 hover:bg-amber-700 hover:text-white"
          >
            Profile
          </Link>
          <Link
            to="/body/premium"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2 shadow-xl/30 shadow-amber-700 hover:bg-amber-700 hover:text-white"
          >
            Premium
          </Link>
          <Link
            to="/body/connections"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2 shadow-xl/30 shadow-amber-700 hover:bg-amber-700 hover:text-white"
          >
            Friends
          </Link>
          <Link
            to="/body/requests"
            className=" mx-1 bg-amber-400 rounded-lg py-1 px-2 shadow-xl/30 shadow-amber-700 hover:bg-amber-700 hover:text-white"
          >
            Requests
          </Link>
          <button
            className="mx-1 bg-amber-400 rounded-lg py-0.5 hover:bg-amber-700 hover:text-white px-2 cursor-pointer shadow-xl/30 shadow-amber-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="flex my-auto relative z-50">
          <img  ref={buttonRef}   
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto relative"
            src={user?.photoUrl}
            alt="profile-photo"
          />
        </div>

        {showMenu && (
          <div  ref={menuRef} className="flex flex-col order-1 rounded-xl  md:hidden text-white absolute z-[1001]  top-12 right-0   text-lg shadow-xl shadow-amber-600 text-left bg-transparent overflow-hidden">
            <Link
              to="/body/profile"
              className="w-full   bg-amber-500  py-1 px-2 block"
               onClick={() => {
              setShowMenu(false);
            }}
            >
              Profile
            </Link>
            <Link
              to="/body/premium"
              className="w-full   bg-amber-500  py-1 px-2 block"
               onClick={() => {
              setShowMenu(false);
            }}
            >
              Premium
            </Link>
            <Link
              to="/body/connections"
              className="w-full  bg-amber-500  py-1 px-2 block "
               onClick={() => {
              setShowMenu(false);
            }}
            >
              Friends
            </Link>
            <Link
              to="/body/requests"
              className="  bg-amber-500  py-1 px-2 block w-full "
               onClick={() => {
              setShowMenu(false);
            }}
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
