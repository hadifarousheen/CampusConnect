import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });

    dispatch(addRequest(res.data));
  };

  const handleRequestReview = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );

    dispatch(removeRequest(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div
      className="flex  justify-center h-[calc(100vh-4rem)]   overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="mx-auto w-full md:w-1/2 p-1">
        <h1 className="text-3xl  font-bold my-4 text-amber-950 shadow-2xl ">
          Pending Requests
        </h1>
        <div className="my-2 ">
          {requests?.map((request) => {
            return (
              <div className=" flex justify-between my-2 p-1 px-2 rounded-lg bg-amber-100 shadow-2xl shadow-amber-950 py-2">
                <div>
                  <div className="flex">
                    <img
                      className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto "
                      src={request?.fromUserId?.photoUrl}
                    />
                    <h1 className="text-xl font-bold my-auto text-amber-700">
                      {request?.fromUserId?.firstName}{" "}
                      {request?.fromUserId?.lastName}
                    </h1>
                  </div>
                 
                </div>
                <div className="my-auto  font-bold">
                  <button
                    className="hover:scale-95 mx-1 p-1 px-2 rounded-lg bg-amber-400 hover:text-white hover:bg-amber-400"
                    onClick={() => handleRequestReview("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="hover:scale-95 mx-1 p-1 px-2 rounded-lg bg-amber-700 hover:text-white hover:bg-amber-400"
                    onClick={() => handleRequestReview("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
