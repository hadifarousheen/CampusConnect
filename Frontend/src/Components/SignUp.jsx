import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, gender },
        { withCredentials: true }
      );
      setError("");
      dispatch(addUser(res.data));
      navigate("/body/profile");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div
      className="h-screen w-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20240329/pngtree-three-friends-climbing-and-helping-each-other-to-reach-on-mountain-image_15697744.jpg')",
      }}
    >
      <div className="h-screen w-screen flex items-center justify-center opacity-70 bg-black text-white">
        <div className="border rounded-lg shadow-xl/30 shadow-white w-full md:w-1/4  p-3  ">
          <h1 className="text-3xl font-bold my-4 ">Sign Up</h1>
          <div className="text-2xl">
            <div className="my-2">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                required
                className="border block mt-2 px-2 py-1 w-full"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                required
                className="border block mt-2 px-2 py-1 w-full"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                required
                className="block w-full mt-2 px-2 py-1 border bg-black "
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="my-2 ">
              <label htmlFor="email">Email Id</label>
              <input
                id="email"
                type="email"
                required
                className="border block mt-2 px-2 py-1 w-full"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                required
                type="text"
                className="border block mt-2 px-2 py-1 w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p className="text-red-600 text-xl">{error}</p>
            <Link to="/" className="text-lg">
              Already Registered?
            </Link>
            <button
              onClick={handleSignUp}
              className="border  my-4 py-2 bg-amber-300  rounded w-full text-black font-bold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
