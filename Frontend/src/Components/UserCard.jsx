const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills,
    college,
    year,
    branch,
    photoUrl,
  } = user;
  return (
    <div className=" mt-6    p-2 rounded-lg shadow-2xl shadow-amber-950  bg-amber-100 ">
      <img className="h-60 w-60 mx-auto" src={photoUrl} />
      <h1 className="text-2xl font-bold px-2 mt-4">
        {firstName + " " + lastName}
      </h1>
      <div className="my-2 text-xl">
        {age && gender && (
          <p className="px-2">
            {age} , {gender}
          </p>
        )}
      { college &&  <p className="px-2">
          <span className="font-bold">College:</span> {college}
        </p>
}
      {year &&  <p className="px-2">
          <span className="font-bold">Year:</span> {year}{" "}
        </p>
}
   {branch &&   <p className="px-2">
        <span className="font-bold">Branch:</span> {branch?.toUpperCase()}{" "}
      </p>}
     {about &&   <p className="whitespace-pre-line break-words max-h-40 overflow-y-auto px-2 py-2">
          ❝{about}❞
        </p>
}

        <p className="my-2">
          {skills?.map((skill) => (
            <span className=" px-2 bg-amber-600 text-white mx-1 py-0.5 rounded-lg">
              {skill.toUpperCase()}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
