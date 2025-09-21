import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Body from "./Body";
import Profile from "./Profile";
import Feed from "./Feed";
import appStore from "../utils/appStore";
import { Provider } from "react-redux";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import Requests from "./Requests";
import Connections from "./Connections";
import ViewProfile from "./ViewProfile";
const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/body" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feed" element={<Feed />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="viewProfile" element={<ViewProfile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
