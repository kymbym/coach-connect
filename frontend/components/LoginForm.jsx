import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginCoach } from "../services/api";
import { tokenAtom } from "../store/atoms";
import { useAtom } from "jotai";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isCoach: false,
  });

  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = formData.isCoach
        ? await loginCoach({
            email: formData.email,
            password: formData.password,
          })
        : await loginUser({
            email: formData.email,
            password: formData.password,
          });

      const { token } = response;

      localStorage.setItem("token", token);
      setToken(token);

      navigate(formData.isCoach ? "/coach-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("login error:", error.message);
      alert("login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <button
        type="button"
        onClick={() => setFormData({ ...formData, isCoach: false })}
      >
        Athlete
      </button>

      <button
        type="button"
        onClick={() => setFormData({ ...formData, isCoach: true })}
      >
        Coach
      </button>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
