import { useState, useEffect, useCallback } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  createAvailability,
  getAllAvailabilities,
  getAvailabilities,
} from "../services/api";
import { extractPayload, isValidToken } from "../utils/jwtUtils";

const localizer = momentLocalizer(moment);

const CalendarComponent= ({ isCoach }) => {
  const [myEvents, setEvents] = useState([]);
  const [coachId, setCoachId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && isValidToken(token)) {
      const payload = extractPayload(token);
      setCoachId(payload.id);
      console.log("coach id", payload.id);

      const fetchAvailabilities = async () => {
        try {
          const availabilities = isCoach
            ? await getAvailabilities(payload.id)
            : await getAllAvailabilities();

          console.log("availabilities:", availabilities);

          const formattedEvents = availabilities.map((availability) => ({
            start: new Date(availability.start_time),
            end: new Date(availability.end_time),
            title: `max participants: ${availability.max_participants}`,
          }));
          setEvents(formattedEvents);
        } catch (error) {
          console.error("failed to fetch availabilities:", error);
        }
      };

      fetchAvailabilities();
    } else {
      console.error("invalid token");
    }
  }, [isCoach]);

  const handleSelectSlot = useCallback(
    async ({ start, end }) => {
      if (isCoach && coachId) {
        const title = window.prompt("new event name:");
        const maxParticipants = window.prompt("max participants:");

        console.log("max participants input:", maxParticipants); 

        if (title && maxParticipants) {
          try {
            console.log("start time:", start);
            console.log("end time:", end);
            const date = moment(start).format("YYYY-MM-DD"); 
            const startTime = moment(`${date} ${startTime}`).toISOString();
            const endTime = moment(`${date} ${endTime}`).toISOString();


            console.log("date:", date);
            console.log("start time:", startTime);
            console.log("end time:", endTime);

            const formData = {
              title,
              date,
              start_time: startTime,
              end_time: endTime,
              max_participants: parseInt(maxParticipants),
              coach_id: coachId,
            };

            console.log("form data before api create availability:", formData);

            const newAvailability = await createAvailability(formData);
            setEvents((prev) => [...prev, { start, end, title }]);
            console.log(newAvailability);
          } catch (error) {
            console.error("error creating availability:", error);
            alert("failed to create availability");
          }
        } else {
          alert("invalid field");
        }
      } else {
        alert("only coaches can create events!");
      }
    },
    [isCoach, coachId]
  );

  return (
    <div style={{ height: "800px" }}>
      <Calendar
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        selectable={isCoach}
      />
    </div>
  );
};

export default CalendarComponent;
