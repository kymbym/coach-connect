import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, createCoach } from "../services/api";
import { tokenAtom } from "../store/atoms";
import { useAtom } from "jotai";
import { uploadFile } from "../services/api";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    isCoach: false,
    location: "",
    profilepicture: "",
    sports: [],
    experience: "",
    rate_per_hour: "",
    bio: "",
  });

  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [clicked, setClicked] = useState("athlete");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSportChange = (e) => {
    const selectedSport = e.target.value;
    setFormData({
      ...formData,
      sports: formData.sports.includes(selectedSport)
        ? formData.sports.filter((sport) => sport !== selectedSport)
        : [...formData.sports, selectedSport],
    });
  };

  const handleLocationChange = (e) => {
    setFormData({
      ...formData,
      location: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("passwords do not match!");
      return;
    }

    try {
      const response = formData.isCoach
        ? await createCoach(formData)
        : await createUser(formData);

      const { token } = response;

      localStorage.setItem("token", token);
      setToken(token);
      navigate(formData.isCoach ? "/coach-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("signup error:", error.message);
      alert("signup failed");
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      alert("uploading profile picture...");
      const uploadedImageUrl = await uploadFile(file);
      setFormData({ ...formData, profilepicture: uploadedImageUrl });
      console.log("uploaded profile picture url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading picture", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-sm mx-auto fira-sans-regular px-4 sm:px-5 lg:px-8"
    >
      <div className="flex justify-center mb-4">
        <div className="inline-flex w-full rounded-md shadow-sm" role="group">
          <button
            className={`px-4 py-2 w-full text-sm font-medium border rounded-s-lg focus:z-10 focus:ring-2 ${
              clicked === "athlete"
                ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                : "text-gray-900 bg-transparent border hover:bg-purple-500 hover:text-white dark:border-white dark:text-black"
            }`}
            type="button"
            onClick={() => {
              setFormData({ ...formData, isCoach: false });
              setClicked("athlete");
            }}
          >
            Athlete
          </button>
        </div>

        <button
          className={`px-4 py-2 w-full text-sm font-medium border rounded-e-lg focus:z-10 focus:ring-2 ${
            clicked === "coach"
              ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              : "text-gray-900 bg-transparent hover:text-white dark:border-white dark:text-white dark:hover:text-white hover:bg-purple-500"
          }`}
          type="button"
          onClick={() => {
            setFormData({ ...formData, isCoach: true });
            setClicked("coach");
          }}
        >
          Coach
        </button>
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
            type="text"
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
          htmlFor="name-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              fill="currentColor"
              viewBox="5 0 24 24"
            >
              <path d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <input
            type="text"
            name="name"
            placeholder="e.g kymbym"
            value={formData.name}
            onChange={handleChange}
            required
            id="name-icon"
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

      <div className="mb-5">
        <label
          htmlFor="confirmpw-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
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
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            id="confirmpw-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      {formData.isCoach && (
        <>
          <label
            htmlFor="sports-icon"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Sports
          </label>
          <div className="flex flex-wrap space-x-2">
            {["Swimming", "Soccer", "Basketball"].map((sport) => (
              <div className="flex items-center mb-4" key={sport}>
                <input
                  id={`checkbox-${sport}`}
                  type="checkbox"
                  value={sport}
                  checked={formData.sports.includes(sport)}
                  onChange={handleSportChange}
                  className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`checkbox-${sport}`}
                  className="ms-2 text-sm text-gray-800 dark:text-gray-300"
                >
                  {sport}
                </label>
              </div>
            ))}
          </div>

          <label
            htmlFor="location-icon"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Class Location
          </label>
          <div className="flex flex-wrap space-x-3">
            {["Central", "North", "East", "West"].map((location) => (
              <div className="flex items-center mb-4" key={location}>
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={formData.location === location}
                  onChange={handleLocationChange}
                  className="bg-gray-20"
                />
                <label
                  htmlFor="location"
                  className="ms-2 text-sm text-gray-800 dark:text-gray-300"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <label
              htmlFor="experience"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Level of Experience
            </label>
            <input
              min="0"
              type="number"
              name="experience"
              id="experience"
              placeholder="e.g 10 years"
              value={formData.experience}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="rate_per_hour"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rate Per Hour
            </label>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  name="rate_per_hour"
                  id="rate_per_hour"
                  placeholder="e.g 100"
                  value={formData.rate_per_hour}
                  onChange={handleChange}
                  required
                  min="1"
                  className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                />
              </div>
              <button
                id="dropdown-currency-button"
                className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                type="button"
                disabled
              >
                SGD
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bio
            </label>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your bio here..."
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="small_size"
            >
              Upload Profile Picture
            </label>
            <input
              className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="small_size"
              type="file"
              name="profilepicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="px-4 py-2 w-full text-sm font-medium border rounded-s-lg rounded-e-lg focus:z-10 focus:ring-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        Sign Up
      </button>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Have an account? Login{" "}
        <a
          onClick={handleLoginClick}
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

export default SignupForm;
