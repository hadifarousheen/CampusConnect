import UserCard from "./UserCard";
const ViewProfile = () => {
  return (
    <div
      className="h-screen    overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="w-3/4 relative  md:w-1/4 mx-auto ">
        <UserCard />
      </div>
    </div>
  );
};

export default ViewProfile;
