import { Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "../store/atoms";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import UserDashboard from "../components/UserDashboard";
import CoachDashboard from "../components/CoachDashboard";

const App = () => {
  const [token] = useAtom(tokenAtom);

  return (
    <Routes>
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/coach-dashboard" element={<CoachDashboard />} />
    </Routes>
  );
};

export default App;
