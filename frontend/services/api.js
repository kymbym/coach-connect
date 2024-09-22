import axios from "axios";

export const createUser = async (formData) => {
  const response = await axios.post("/api/user/signup", formData);
  return response.data;
};

export const createCoach = async (formData) => {
  const response = await axios.post("/api/coach/signup", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post("/api/user/login", formData);
  return response.data;
};

export const loginCoach = async (formData) => {
  const response = await axios.post("/api/coach/login", formData);
  return response.data;
};
