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
  const { token } = response.data;
  localStorage.setItem("token", token);
  return response.data;
};

export const loginCoach = async (formData) => {
  const response = await axios.post("/api/coach/login", formData);
  return response.data;
};

export const createAvailability = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/api/coach/availability", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllAvailabilities = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/coach/availability/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("all availabilities api call:", response.data);
    return response.data;
  } catch (error) {
    console.error("failed to fetch availabilities:", error);
  }
};

export const getAvailabilities = async (coachId) => {
  console.log("fetching availabilities for coach id:", coachId);

  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`/api/coach/availability/${coachId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("availabilities by coach id api call:", response.data);
    return response.data;
  } catch (error) {
    console.error("error fetching availabilities:", error.message);
    throw error;
  }
};
