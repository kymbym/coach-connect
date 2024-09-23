import { Routes, Route } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import UserDashboard from "../components/UserDashboard";
import CoachDashboard from "../components/CoachDashboard";
import MainPage from "../components/MainPage";
import CoachProfile from "../components/CoachProfile";
import AllCoaches from "../components/AllCoaches";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/coach-dashboard" element={<CoachDashboard />} />
      <Route path="/user-dashboard" element={<AllCoaches />} />
      <Route path="/user-dashboard/:coachId" element={<CoachProfile />} />
    </Routes>
  );
};

export default App;
