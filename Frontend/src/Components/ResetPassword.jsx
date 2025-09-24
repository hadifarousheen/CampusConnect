import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [emailId, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userdata, setuserdata] = useState({});
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const[showotp,setshowotp]=useState(false)
  const[showverifyemail,setshowverifyemail]=useState(true);
  const verifyEmail = async () => {
    try{
    const res = await axios.post(
      "http://localhost:3000/forgetpassword/verifyemail",
      { emailId },
      { withCredentials: true }
    );
   
    if(res){
        setshowverifyemail(false);
        setError("")
    setshowotp(true)
    }
   
    setuserdata(res.data);
}catch(err){
console.log(err.response.data.message)
setError(err?.response?.data?.message)
}
  };
  const updatePassword = async () => {
    try{
    const res = await axios.post(
      "http://localhost:3000/forgetpassword/changepassword",
      { password,emailId },
      { withCredentials: true }
    );
    if (res) {
       setError("");
       setEmail("");
       setPassword("")
      setMessage(res.data.message);
    }
}catch(err){
    console.log(err.response.data.message)
    setError(err?.response?.data?.message)
}
  };
  const verifyOTP = async () => {
   try{
    console.log(userdata.otp)
    if (otp !== userdata.otp) {
      throw new Error("Invalid OTP")
    } else {
         setshowotp(false);
         setError("");
      setShowChangePassword(true);
    }
}catch(err){
    setError("Invalid OTP")
}
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/85/cf/7b/85cf7b4993b6519887effa15951ca46b.jpg')",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-black opacity-70 text-white">
      
        <div className="border w-fit p-6 rounded-lg shadow-xl/30 shadow-white">
          <p >{message}</p>
          <h1 className="text-3xl font-bold my-4 ">Reset Password</h1>
          <div className="text-2xl">
        {showverifyemail &&    <div>
              <div className="my-2">
                <label className="text-xl" htmlFor="email">
                  Enter your Email to get OTP
                </label>
                <input
                  id="email"
                  type="email"
                  className="border block mt-2 px-2 py-1"
                  value={emailId}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <button
                className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded"
                onClick={() => verifyEmail()}
              >
                Verify Email
              </button>
            </div>
}
{showotp &&
            <div>
              <div className="my-2">
                <label className="text-xl" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  className="border block mt-2 px-2 py-1"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <button
                className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded"
                onClick={() => verifyOTP()}
              >
                Verify OTP
              </button>
            </div>
}
           {showChangePassword && <div>
            <div className="my-2">
                <label className="text-xl" htmlFor="email">
                  Enter your Email 
                </label>
                <input
                  id="email"
                  type="email"
                  className="border block mt-2 px-2 py-1"
                  value={emailId}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="my-2">
                <label className="text-xl" htmlFor="password">
                  New Password
                </label>
                <input
                  id="password"
                  type="text"
                  className="border block mt-2 px-2 py-1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            
              <button
                className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded"
                onClick={() => updatePassword()}
              >
                Update Password
              </button>
            </div>
}
<Link to="/" className="text-lg">Login?</Link>
<p className="text-red-600 text-xl">{error}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
