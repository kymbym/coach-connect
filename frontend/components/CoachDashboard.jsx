import CalendarComponent from "./Calendar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidToken, extractPayload } from "../utils/jwtUtils";
import { getAvailabilities } from "../services/api";

const CoachDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isValidToken(token)) {
      const payload = extractPayload(token);
      const fetchAvailabilities = async () => {
        try {
          const availabilities = await getAvailabilities(payload.id);
          const formattedEvents = availabilities.map((availability) => ({
            coach_id: availability.coach_id,
            id: availability.id,
            start: new Date(availability.start_time),
            end: new Date(availability.end_time),
            max_participants: availability.max_participants,
          }));
          setEvents(formattedEvents);
        } catch (error) {
          console.error("failed to fetch availabilities:", error);
        }
      };
      fetchAvailabilities();
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h1
          className="fira-sans-bold text-4xl text-black mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-400 p-4 rounded-lg cursor-pointer"
          onClick={handleSignOut}
        >
          Coach Dashboard
        </h1>
        <p className="fira-sans-bold text-2xl text-gray-800 mb-4 p-1">
          Manage your availabilities
        </p>
        <CalendarComponent
          events={events}
          isCoach={true}
          setEvents={setEvents}
        />
      </div>
    </>
  );
};

export default CoachDashboard;
