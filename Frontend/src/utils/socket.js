import {io} from "socket.io-client";
export const createSocketConnection=()=>{
    return io("http://localhost:3000")
}

// export const createSocketConnection=()=>{
//     if(location.hostname==="localhost"){
//         return io("https://localhost:3000")
//     }
//     else{
//         return io("/",{path:"/api/socket.io"})
//     }
// }