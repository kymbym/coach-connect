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
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto fira-sans-regular px-4 sm:px-5 lg:px-8"
    >
      <div className="flex justify-center mb-4">
        <div className="inline-flex w-full rounded-md shadow-sm" role="group">
          <button
            className={`px-4 py-2 w-full text-sm font-medium border rounded-s-lg focus:z-10 focus:ring-2 ${
              !formData.isCoach
                ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                : "text-gray-900 bg-transparent border hover:bg-purple-500 hover:text-white dark:border-white dark:text-black"
            }`}
            type="button"
            onClick={() => setFormData({ ...formData, isCoach: false })}
          >
            Athlete
          </button>

          <button
            className={`px-4 py-2 w-full text-sm font-medium border rounded-e-lg focus:z-10 focus:ring-2 ${
              formData.isCoach
                ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                : "text-gray-900 bg-transparent border hover:bg-purple-500 hover:text-white dark:border-white dark:text-white dark:hover:text-white hover:bg-purple-500"
            }`}
            type="button"
            onClick={() => setFormData({ ...formData, isCoach: true })}
          >
            Coach
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            placeholder="e.g kymbym@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            id="email-address-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-6 h-5 text-gray-800 dark:text-gray"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              fill="none"
              viewBox="6 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.4"
                d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
              />
            </svg>
          </div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            id="password-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 w-full text-sm font-medium border rounded-s-lg rounded-e-lg focus:z-10 focus:ring-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        Log In
      </button>

      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Don't have an account? Sign Up{" "}
        <a
          onClick={() => navigate("/signup")}
          style={{ cursor: "pointer" }}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          here
        </a>
        .
      </p>
    </form>
  );
};

export default LoginForm;
