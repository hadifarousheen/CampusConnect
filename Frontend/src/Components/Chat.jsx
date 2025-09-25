import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId, firstName } = useParams();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const fetchChatMessages = async () => {
    const chat = await axios.get("http://localhost:3000/chat/" + targetUserId, {
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

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
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
      className="flex items-center justify-center  h-[calc(100vh-3.5rem)] "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="relative border rounded-lg h-10/12 w-4/5 p-2">
        <h1 className="text-3xl font-bold mx-1">{firstName}</h1>
        <div>
          {messages?.map((msg, index) => {
            return (
              <div
                key={index}
                className={`${
                  user?.firstName === msg?.firstName
                    ? "ml-auto border w-fit p-1 rounded-lg"
                    : "mr-auto border w-fit p-1 rounded-lg"
                }`}
              >
                <div>
                  {`${msg.firstName}  ${msg.lastName}`}
                  <time className="text-xs opacity-50"> 2 hours ago</time>
                </div>
                <div>{msg.text}</div>
              </div>
            );
          })}
        </div>
        <div className="absolute  bottom-0   ">
          <div className="border w-full">
          <input
          className=""
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button className="border w-4/12" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
