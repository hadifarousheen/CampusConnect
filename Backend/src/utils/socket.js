const socket=require('socket.io');
const Chat=require("../models/chat")

const initializeSocket=(server)=>{
    const io=socket(server,{
        cors:{
            origin:"http://localhost:5173"
        }
    });
    io.on("connection",(socket)=>{
        socket.on("joinchat",({userId,targetUserId})=>{
       const roomId=[userId,targetUserId].sort().join("_");
       socket.join(roomId);
        });
        socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
 const roomId=[userId,targetUserId].sort().join("_");
 io.to(roomId).emit("messageReceived",{firstName,text})
  try{
    let chat=await Chat.findOne({
        participants:{
            $all:[userId,targetUserId]
        }
    })
    if(!chat){
        chat=new Chat({
            participants:[userId,targetUserId],
            messages:[],
        })
    }
    chat.messages.push({senderId:userId,text});
    await chat.save();
  }
        });
        socket.on("disconnec",()=>{})
    })
}

module.exports=initializeSocket;