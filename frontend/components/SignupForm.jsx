import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, createCoach } from "../services/api";
import { tokenAtom } from "../store/atoms";
import { useAtom } from "jotai";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    isCoach: false,
    location: "",
    sports: [],
    experience: "",
    rate_per_hour: "",
    bio: "",
  });

  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);

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

    try {
      const response = formData.isCoach
        ? await createCoach(formData)
        : await createUser(formData);

      const { token } = response;

      localStorage.setItem("token", token);
      setToken(token);
      navigate(formData.isCoach ? "/coach-dashboard" : "user-dashboard")
    } catch (error) {
      console.error("signup error:", error.message);
      alert("signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
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
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
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

      {formData.isCoach && (
        <>
          <h4>Sports</h4>
          {[
            "Swimming",
            "Soccer",
            "Basketball",
            "Tennis",
            "Volleyball",
            "Badminton",
            "Others",
          ].map((sport) => (
            <label key={sport}>
              <input
                type="checkbox"
                value={sport}
                checked={formData.sports.includes(sport)}
                onChange={handleSportChange}
              />
              {sport}
            </label>
          ))}

          <h4>Location</h4>
          {["Central", "North", "East", "West"].map((location) => (
            <label key={location}>
              <input
                type="radio"
                name="location"
                value={location}
                checked={formData.location === location}
                onChange={handleLocationChange}
              />
              {location}
            </label>
          ))}

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rate_per_hour"
            placeholder="Rate per hour (SGD)"
            value={formData.rate_per_hour}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
