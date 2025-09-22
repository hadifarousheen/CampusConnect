const UserCard=({user})=>{
    const{firstName,lastName,age,gender,about,skills,college,year,branch,photoUrl}=user;
    return(

  <div className="border mt-6    p-2 rounded-lg">
    <img className="h-60 w-60 mx-auto" src={photoUrl} />
    <h1 className="text-3xl font-bold">{firstName + " " + lastName}</h1>
    <div className="my-2 text-xl">
    <p>{age} {gender}</p>
    <p>{about}</p>
    <p>{college}</p>
    <p>{year} {branch}</p>
    <p>{skills}</p>
    </div>
  </div>


       
    )
}

export default UserCard;