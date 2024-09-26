import { Routes, Route } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import CoachDashboard from "../components/CoachDashboard";
import MainPage from "../pages/MainPage";
import CoachProfile from "../components/CoachProfile";
import AllCoaches from "../components/AllCoaches";
import "../src/index.css";
import "flowbite";
import "flowbite/dist/flowbite.css";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/coach-dashboard" element={<CoachDashboard />} />
      <Route path="/user-dashboard" element={<AllCoaches />} />
      <Route path="/user-dashboard/:coachId" element={<CoachProfile />} />
    </Routes>
  );
};

export default App;
