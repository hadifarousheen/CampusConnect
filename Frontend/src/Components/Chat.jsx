import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null); 
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const userId = user?._id;


  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text, createdAt }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
    const interval = setInterval(fetchConnections, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const selected = connections?.find(
      (connection) => connection._id == targetUserId
    );
    setChatUser(selected || null);
  }, [connections, targetUserId]);

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="relative flex flex-col border border-amber-950 rounded-2xl md:h-5/6 w-full h-full md:w-4/5 shadow-2xl shadow-amber-700 bg-transparent ">
        {chatUser && (
          <div className="flex m-1">
            <img
              className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto"
              src={chatUser.photoUrl}
              alt="user"
            />
            <h1 className="text-3xl font-bold p-3 text-amber-950">
              {chatUser.firstName}
              <span className="block text-sm px-2 ">
                {chatUser.online ? (
                  <span className="text-amber-800">Online</span>
                ) : (
                  <span className="text-red-600">Offline</span>
                )}
              </span>
            </h1>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 px-3 pb-24 scrollbar-hidden">
          {messages?.map((msg, index) => {
            const isUser = user?.firstName === msg?.firstName;
            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl shadow-md ${
                    isUser
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-amber-600 text-white rounded-bl-none"
                  }`}
                >
                  <div className="text-xs md:text-md font-bold opacity-70 mb-1 text-black">
                    {msg.firstName} {msg.lastName}
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-black mt-1 opacity-60">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute w-full bottom-0 left-0 md:p-3 bg-transparent backdrop-blur-md rounded-b-2xl flex md:gap-2 shadow-inner">
          <input
            className=" flex-1 border rounded-full px-2 md:px-4 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            type="text"
            value={newMessage}
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white md:px-5 py-2 rounded-full font-medium shadow-md transition md:w-fit w-1/4 "
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
