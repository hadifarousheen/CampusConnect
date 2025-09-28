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
  const [showverifyemail, setshowverifyemail] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL
}/forgetpassword/verifyemail`,
        { emailId },
        { withCredentials: true }
      );

      if (res) {
        setMessage("Check your mail for OTP");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setError("");
      }
      setuserdata(res.data);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  const updatePassword = async () => {
    try {
      setMessage("");
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL
}/forgetpassword/changepassword`,
        { password, emailId },
        { withCredentials: true }
      );
      if (res) {
        setError("");
        setEmail("");
        setPassword("");
        setMessage("Password Updated");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  const verifyOTP = async () => {
    try {
      setMessage("");
      const res = await axios.post(
        BASE_URL + "/forgetpassword/verifyotp",
        { emailId, otp },
        { withCredentials: true }
      );

      if (res) {
        setshowverifyemail(false);
        setShowChangePassword(true);
        setError("");
      }
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <>
      {showToast && (
        <div className="w-1/2 md:w-fit bg-amber-300  mx-auto my-2 p-1 px-2 rounded-lg fixed z-50 top-32 md:top-16 left-1/2 -translate-x-1/2 ">
          <h1 className="text-center">{message}</h1>
        </div>
      )}
      <div
        className="h-screen w-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/85/cf/7b/85cf7b4993b6519887effa15951ca46b.jpg')",
        }}
      >
        <div className="flex items-center justify-center min-h-screen bg-black opacity-70 text-white">
          <div className="border w-fit p-6 rounded-lg shadow-xl/30 shadow-white">
            <h1 className="text-3xl font-bold my-4 ">Reset Password</h1>
            <div className="text-2xl">
              {showverifyemail && (
                <div>
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
                  </div>
                  <div className="flex justify-between">
                    <p className="text-red-600 text-xl font-bold">{error}</p>
                    <Link to="/" className="text-lg text-amber-400">
                      Login?
                    </Link>
                  </div>
                  <div className="flex gap-0.5">
                    <button
                      className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded disabled hover:scale-90 cursor-pointer"
                      onClick={() => verifyEmail()}
                    >
                      Get OTP
                    </button>
                    <button
                      className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded hover:scale-90 cursor-pointer"
                      onClick={() => verifyOTP()}
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {showChangePassword && (
                <div>
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
                  <div className="flex justify-between">
                    <p className="text-red-600 text-xl font-bold">{error}</p>
                    <Link to="/" className="text-lg text-amber-400">
                      Login?
                    </Link>
                  </div>
                  <button
                    className="border w-full my-4 py-2 bg-amber-300  text-black font-bold rounded hover:scale-90 cursor-pointer"
                    onClick={() => updatePassword()}
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
