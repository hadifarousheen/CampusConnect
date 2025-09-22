import { useEffect } from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    const res = await axios.get("http://localhost:3000/user/feed", {
      withCredentials: true,
    });

    dispatch(addFeed(res.data));
    console.log(feed);
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="h-[calc(100vh-3.5rem)] "   style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
      {feed.length > 0 ? <FeedCard user={feed[0]} /> : <h1 className="text-2xl text-center ">No Users Found 🔎</h1>}
    </div>
  );
};

export default Feed;
