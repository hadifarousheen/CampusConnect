
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const ViewProfile=()=>{
    const user=useSelector(store=>store.user);
    console.log(user)
    return(
        <div  className="flex  justify-center h-[calc(100vh-4rem)]   overflow-hidden"  style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')" }}>
        <div className="w-2/3 md:relative  md:w-1/5 mx-auto" >
            <UserCard user={user}/>
        </div>
        </div>
    )
}

export default ViewProfile;