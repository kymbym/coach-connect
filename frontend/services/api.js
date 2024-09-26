import axios from "axios";
import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

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
    console.error("error fetching availabilities:", error);
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

export const getCoachDetails = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/api/coach", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetching all coaches details", response.data);
    return response.data;
  } catch (error) {
    console.error("error fetching coach details:", error.message);
    throw error;
  }
};

export const getCoachDetailsById = async (coachId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/coach/${coachId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error fetching coach details by id:", error.message);
    throw error;
  }
};

export const getUserDetailsById = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error fetching coach details by id:", error.message);
    throw error;
  }
};

export const updateAvailability = async (availabilityId, formData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `/api/coach/availability/${availabilityId}`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("error updating coach availability:", error);
    throw error;
  }
};

export const deleteAvailability = async (availabilityId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `/api/coach/availability/${availabilityId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("error deleting coach availability:", error);
    throw error;
  }
};

export const createBooking = async (availabilityId) => {
  const token = localStorage.getItem("token");
  try {
    console.log("availability id create booking frontend:", availabilityId);
    const response = await axios.post(
      `/api/user/bookings`,
      { availability_id: availabilityId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("error booking appointment:", error);
    throw error;
  }
};

export const getBookingsByUserId = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/user/bookings/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error fetching user bookings details by id:", error.message);
    throw error;
  }
};

export const getBookingsByCoachId = async (coach_id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/coach/bookings/${coach_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error fetching coach booking details by id:", error.message);
    throw error;
  }
};

export const sendEmail = async (email, subject, message) => {
  try {
    const response = await axios.post("/api/email", {
      email: email,
      subject: subject,
      html: message,
    });
    console.log("email sent successfully:", response.data);
  } catch (error) {
    console.error("error sending email:", error);
  }
};

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_REGION;

AWS.config.update({
  region: REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  try {
    const upload = await s3.putObject(params).promise();
    console.log(upload);
    const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("error uploading file", error.message);
  }
};
