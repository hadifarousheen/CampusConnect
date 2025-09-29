import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const UserCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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
  useEffect(() => {}, [user]);
  return (
    <div className=" mt-6    p-2 rounded-lg shadow-2xl shadow-amber-950  bg-amber-100 ">
      <img className="h-60 w-60 mx-auto" src={user?.photoUrl} />
      <h1 className="text-2xl font-bold px-2 mt-4 text-amber-700">
        {user?.firstName + " " + user?.lastName}
      </h1>
      <div className="my-2 text-xl">
        {user?.age && user?.gender && (
          <p className="px-2">
            {user?.age} , {user?.gender}
          </p>
        )}
        {user?.college && (
          <p className="px-2">
            <span className="font-bold text-amber-700">College:</span> {user?.college}
          </p>
        )}
        {user?.year && (
          <p className="px-2">
            <span className="font-bold text-amber-700">Year:</span> {user?.year}{" "}
          </p>
        )}
        {user?.branch && (
          <p className="px-2">
            <span className="font-bold text-amber-700">Branch:</span>{" "}
            {user?.branch?.toUpperCase()}{" "}
          </p>
        )}
        {user?.about && (
          <p className="whitespace-pre-line break-words max-h-40 overflow-y-auto px-2 py-2">
            ❝{user?.about}❞
          </p>
        )}

        <div className="my-2">
          {user?.skills?.map((skill) => (
            <span className=" px-2 bg-amber-600 text-white mx-1 py-0.5 rounded-lg">
              {skill.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
