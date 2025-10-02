import { useEffect } from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });

    dispatch(addFeed(res.data));
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div
      className="flex items-center  h-screen overflow-hidden "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      {feed.length > 0 ? (
        <FeedCard user={feed[0]} />
      ) : (
        <div className=" mx-auto overflow-hidden ">
          {" "}
          <h1 className="text-2xl  font-bold text-amber-700   ">
            No Users Found{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Feed;
