import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  const removeConnection=async(userId)=>{
  try{
   const res=await axios.post(BASE_URL+"/user/connection/remove/"+userId,{},{withCredentials:true});
   if(res){
   dispatch(removeConnections(userId));
   }
  }catch(err){
    console.log(err)
  }
  }
  return (
    <div
      className="flex  justify-center h-[calc(100vh-4rem)]   overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="mx-auto w-full  md:w-1/2 mt-4 p-1">
        <h1 className="text-3xl font-bold text-amber-950 shadow-2xl ">
          Friends
        </h1>
        <div className="my-2  ">
          {connections?.map((connection, index) => (
            <div
              key={index}
              className=" bg-amber-100 flex justify-between my-2 p-1 px-2 py-2 rounded-lg shadow-2xl shadow-amber-950"
            >
              <div className="flex">
                <img
                  className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto "
                  src={connection?.photoUrl}
                />
                <h1 className="text-md md:text-xl font-bold my-auto text-amber-900 ">
                  {connection.firstName} {connection.lastName}
                </h1>
              </div>
              <div className="my-auto">
              <Link
                to={"/body/chat/" + connection._id}
                className="text-xl  mx-1 px-2 my-auto shadow-md shadow-amber-400 font-bold rounded-lg bg-amber-600 hover:text-white hover:bg-amber-400 "
              >
                Chat
              </Link>
               <button
                className="text-xl  mx-1 px-2 my-auto shadow-md shadow-amber-400 font-bold rounded-lg bg-amber-600 hover:text-white hover:bg-amber-400 "
                onClick={()=>{
                  removeConnection(connection._id)
                }}
              >
               Remove
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
