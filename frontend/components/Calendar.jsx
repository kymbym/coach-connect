import { useState, useEffect, useCallback } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createAvailability, getAvailabilities } from "../services/api";
import { extractPayload, isValidToken } from "../utils/jwtUtils";
import AvailabilityForm from "./AvailabilityForm";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ isCoach }) => {
  const [events, setEvents] = useState([]);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [coachId, setCoachId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isValidToken(token)) {
      const payload = extractPayload(token);
      setCoachId(payload.id);

      const fetchAvailabilities = async () => {
        try {
          const availabilities = await getAvailabilities(payload.id);
          const formattedEvents = availabilities.map((availability) => ({
            start: new Date(availability.start_time),
            end: new Date(availability.end_time),
            title: `Max participants: ${availability.max_participants}`,
          }));
          setEvents(formattedEvents);
        } catch (error) {
          console.error("failed to fetch availabilities:", error);
        }
      };

      fetchAvailabilities();
    }
  }, [isCoach]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (isCoach && coachId) {
        setSelectedSlot({ start, end });
        setShowAvailabilityForm(true);
      }
    },
    [isCoach, coachId]
  );

  const handleFormSubmit = async (formData) => {
    try {
      console.log("form data at handleformsubmit", formData);
      const newAvailability = await createAvailability({
        ...formData,
        coach_id: coachId,
        start_time: formData.startTime,
        end_time: formData.endTime,
      });

      setEvents((prev) => [...prev, newAvailability]);
      setShowAvailabilityForm(false);
    } catch (error) {
      console.error("error creating availability:", error);
      alert("failed to create availability");
    }
  };

  return (
    <>
      <div style={{ height: "700px" }}>
        <Calendar
          defaultDate={new Date()}
          defaultView={Views.WEEK}
          events={events}
          localizer={localizer}
          onSelectSlot={handleSelectSlot}
          selectable={isCoach}
          popup
        />
      </div>
      {showAvailabilityForm && selectedSlot && (
        <AvailabilityForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowAvailabilityForm(false)}
          initialStart={selectedSlot.start}
          initialEnd={selectedSlot.end}
        />
      )}
    </>
  );
};

export default CalendarComponent;
