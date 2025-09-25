import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";

const Chat=()=>{
    const{targetUserId}=useParams();
    const[newMessage,setNewMessage]=useState("");
    const[messages,setMessages]=useState([]);

    const fetchChatMessages=async()=>{
      const chat=await axios.get("http://localhost:3000/chat/"+targetUserId,{withCredentials:true})
      console.log(chat.data.message);
      const chatMessages=chat?.data?.messages?.map(msg=>{return {msg.firstName,msg.lastName,msg.text}});
      setMessages(chatMessages)
    }
  

    const sendMessage=()=>{
      const socket=createSocketConnection();
      socket.emit("sendMessage",{firstName,userId,targetUserId,text:newMessage})
    }
    useEffect(()=>{
      const socket=createSocketConnection();
      socket.emit("joinChat",{userId,targetUserId})
      socket.on("messageReceived",({firstName,text})=>{})
      setMessages((messages)=>[...messages,{firstName,text}])
  return()=>{
    socket.disconnect();
  }
},[userId,targetUserId]);
useEffect(()=>{
  fetchChatMessages();
},[])
    return (
  <div
      className="flex items-center justify-center  h-[calc(100vh-3.5rem)] "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
    <div className="border">
       <div>Name</div>
       <div></div>
       <input type="text" value={newMessage} onChange={(e)=>{
        setNewMessage(e.target.value)
       }}/>
       <button onClick={sendMessage}>Send</button>
    </div>
  </div>
    )
}

export default Chat;