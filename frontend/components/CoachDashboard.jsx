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
      <h1>Coach Dashboard</h1>
      <p>Manage your availability:</p>
      <CalendarComponent events={events} isCoach={true} setEvents={setEvents}/>
    </>
  );
};

export default CoachDashboard;
