const UserCard=({user})=>{
    const{firstName,lastName,age,gender,about,skills,college,year,branch,photoUrl}=user;
    return(

  <div className=" mt-6    p-2 rounded-lg shadow-2xl shadow-amber-950  bg-amber-100 opacity-80 ">
    <img className="h-60 w-60 mx-auto" src={photoUrl} />
    <h1 className="text-2xl font-bold">{firstName + " " + lastName}</h1>
    <div className="my-2 text-xl">
    <p>{age} {gender}</p>
  <p className="whitespace-pre-line break-words max-h-40 overflow-y-auto">
  {about}
</p>
    <p>{college}</p>
    <p>{year} {branch}</p>
    <p>{skills}</p>
    </div>
  </div>


       
    )
}

export default UserCard;