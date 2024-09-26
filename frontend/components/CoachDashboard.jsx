import CalendarComponent from "./Calendar";
import { useState, useEffect } from "react";
import { isValidToken, extractPayload } from "../utils/jwtUtils";
import { getAvailabilities } from "../services/api";

const CoachDashboard = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="lilita-one-regular text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-400 p-4 rounded-lg">
          Coach Dashboard
        </h1>
        <p className="fira-sans-medium text-lg text-gray-700 mb-6">
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
