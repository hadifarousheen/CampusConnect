import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age || "");
  const [college, setCollege] = useState(user?.college || "");
  const [year, setYear] = useState(user?.year || "");
  const [about, setAbout] = useState(user?.about || "");
  const [branch, setBranch] = useState(user?.branch || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveProfile = async () => {
    try {
      const user = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          college,
          year,
          about,
          branch,
          skills,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(user.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setGender(user.gender || "");
      setAge(user.age || "");
      setCollege(user.college || "");
      setYear(user.year || "");
      setAbout(user.about || "");
      setBranch(user.branch || "");
      setSkills(user.skills || []);
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  return (
    <>
      {showToast && (
        <div className="w-1/2 md:w-fit bg-amber-600 text-white mx-auto my-2 p-1 px-2 rounded-lg absolute top-2 left-1/2 -translate-x-1/2 ">
          <h1 className="text-center">Profile updated Successfully</h1>
        </div>
      )}
      <div
        className="text-amber-950 md:relative  md:h-[calc(100vh-3rem)]    "
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
        }}
      >
        <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full  md:w-1/2 ">
          <h1 className="text-3xl font-bold text-center pt-2 md:mt-4">
            Edit Profile
          </h1>
          <div className="    md:flex m-auto mt-5  bg-transparent border border-amber-400 rounded-lg shadow-2xl shadow-amber-950 ">
            <div className="  w-full p-2">
              <div className="my-2 ">
                <label htmlFor="firstName" className="font-bold text-xl">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="lastName" className="font-bold text-xl">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="gender" className="font-bold text-xl">
                  Gender
                </label>
                <select
                  id="gender"
                  className="border block mt-2 px-2 py-1 w-full font-bold text-xl"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="my-2">
                <label htmlFor="age" className="font-bold text-xl">
                  Age
                </label>
                <input
                  id="age"
                  type="Number"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="about" className="font-bold text-xl">
                  About
                </label>
                <textarea
                  rows={5}
                  cols={40}
                  value={about}
                  className="border block mt-2 px-2 py-1 box-border w-full  "
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className=" w-full md:p-2 px-2">
              <div className="my-2">
                <label htmlFor="college" className="font-bold text-xl">
                  College
                </label>
                <input
                  id="college"
                  type="text"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={college}
                  onChange={(e) => {
                    setCollege(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="branch" className="font-bold text-xl">
                  Branch
                </label>
                <input
                  id="branch"
                  type="text"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="year" className="font-bold text-xl">
                  Year
                </label>
                <input
                  id="year"
                  type="Number"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </div>

              <div className="my-2">
                <label htmlFor="skills" className="font-bold text-xl">
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  placeholder="Enter skills separated by ,"
                  className="border block mt-2 px-2 py-1 w-full"
                  value={skills}
                  onChange={(e) => {
                    setSkills(e.target.value.split(",").map((s) => s.trim()));
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="photo" className="font-bold text-xl">
                  Profile Photo
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="border block mt-2 px-2 py-1 w-full"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    const base64 = await convertToBase64(file);
                    console.log(base64);
                    setPhotoUrl(base64);
                  }}
                />
              </div>
              <button
                className=" w-full my-1 py-2 bg-amber-500  font-bold rounded-lg hover:scale-90"
                onClick={() => handleSaveProfile()}
              >
                Save Profile
              </button>
              <Link to="/body/viewProfile">
                {" "}
                <button className=" w-full my-1 bg-amber-700 hover:scale-90 font-bold rounded-lg py-2">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
