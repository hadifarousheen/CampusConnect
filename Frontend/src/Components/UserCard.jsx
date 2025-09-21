const UserCard=({user})=>{
    const{firstName,lastName,age,gender,about,skills,college,year,branch,photoUrl}=user;
    return(
<div className="min-h-screen flex justify-center items-center">
  <div className="border w-1/4 p-2 rounded-lg">
    <img className="h-60 w-60" src={photoUrl} />
    <h1>{firstName + " " + lastName}</h1>
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