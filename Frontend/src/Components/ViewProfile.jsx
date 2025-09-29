import UserCard from "./UserCard";
const ViewProfile = () => {
  return (
    <div
      className="h-screen md:h-[calc(100vh-4rem)]   overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/4e/2e/8d/4e2e8d018198e3a41a4ae9323e07a7dd.jpg')",
      }}
    >
      <div className="w-4/5 md:relative  md:w-1/5 mx-auto">
        <UserCard />
      </div>
    </div>
  );
};

export default ViewProfile;
