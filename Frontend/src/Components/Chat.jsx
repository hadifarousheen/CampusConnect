import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const connections=useSelector((store=>store.connections));
  const chatUser=connections.filter(connection=>connection._id==targetUserId);
  console.log(chatUser[0])
  const userId = user?._id;
  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL+"/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    console.log(chatMessages);
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    console.log(user?.firstName);
    console.log(user?.lastName);
    console.log(userId);
    console.log(targetUserId);
    console.log(newMessage);
    setNewMessage("");
  };
  return (
   <div
      className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="relative flex flex-col border border-amber-950 rounded-2xl h-5/6 w-4/5 shadow-2xl shadow-amber-700 bg-transparent ">
        

        <div className="flex m-1">
        <img className="h-12 w-12 border ml-1 mr-2 rounded-full my-auto" src={chatUser[0]?.photoUrl}/>
        <h1 className="text-3xl font-bold p-3 text-amber-950">{chatUser[0]?.firstName}</h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 px-3 pb-24 scrollbar-hidden">
          {messages?.map((msg, index) => {
            const isUser = user?.firstName === msg?.firstName;
            return (
              <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl shadow-md ${
                    isUser
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-amber-600 text-white rounded-bl-none"
                  }`}
                >
                  <div className="text-xs md:text-md font-semibold opacity-70 mb-1">
                    {msg.firstName} {msg.lastName}
                  </div>
                  <div className="text-sm">{msg.text}</div>
                </div>
              </div>
            );
          })}
      
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute w-full bottom-0 left-0 p-3 bg-transparent backdrop-blur-md rounded-b-2xl flex gap-2 shadow-inner">
          <input
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-amber-400"
            type="text"
            value={newMessage}
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-medium shadow-md transition"
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
