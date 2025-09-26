import {io} from "socket.io-client";
import { BASE_URL } from "./constants";
export const createSocketConnection=()=>{
    return io(BASE_URL)
}

// export const createSocketConnection=()=>{
//     if(location.hostname==="localhost"){
//         return io("https://localhost:3000")
//     }
//     else{
//         return io("/",{path:"/api/socket.io"})
//     }
// }