const UserCard=({user})=>{
    const{firstName,lastName,college,year}=user;
    return(
       <div className="">
          <div className=" border w-fit">
            <img className="h-60 w-60" src="https://thefinancemd.com/wp-content/uploads/2015/08/facebook-default-no-profile-pic.jpg"/>
            <h1>{firstName + " "+lastName}</h1>
            {/* <p>{about}</p>
            <p>{skills.join(',')}</p>
            <p>{gender}</p> */}
            <p>{college}</p>
            <p>{year}</p>
            <div>
                <button>Send Request</button>
                <button>Ignore</button>
            </div>
          </div>
          </div>
       
    )
}

export default UserCard;