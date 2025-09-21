
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const ViewProfile=()=>{
    const user=useSelector(store=>store.user);
    console.log(user)
    return(
        <div>
            <UserCard user={user}/>
        </div>
    )
}

export default ViewProfile;