import { useState, useCallback } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AvailabilityForm from "./AvailabilityForm";
import EventDetailsCard from "./AvailabilityEventCard";
import {
  createAvailability,
  deleteAvailability,
  updateAvailability,
} from "../services/api";
import AvailabilityUpdateForm from "./AvailabilityUpdateForm";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ isCoach, events, setEvents }) => {
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [showEventDetailsForm, setShowEventDetailsForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState();

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (isCoach) {
        setSelectedSlot({ start, end });
        setShowAvailabilityForm(true);
      }
    },
    [isCoach]
  );

  const handleFormSubmit = async (formData) => {
    try {
      console.log("form data at handleformsubmit", formData);
      const newAvailability = await createAvailability(formData);
      const newEvent = {
        id: newAvailability.id,
        start: new Date(newAvailability.start_time),
        end: new Date(newAvailability.end_time),
        max_participants: newAvailability.max_participants,
      };
      setEvents([...events, newEvent]);
      console.log(newAvailability);
      setShowAvailabilityForm(false);
      //   const updatedAvailabilities = await getAvailabilities();
      // setEvents(updatedAvailabilities);
    } catch (error) {
      console.error("error creating availability:", error);
      alert("failed to create availability");
    }
  };

  const handleSelected = (e) => {
    setSelectedEvent(e);
    setShowEventDetailsForm(true);
    console.info("[handleSelected - event]", e);
  };

  const handleUpdate = async (updatedData) => {
    const availabilityId = selectedEvent?.id;

    console.log("availability id before update availability:", availabilityId);
    if (!availabilityId) {
      console.error("availability:");
      return;
    }
    try {
      const updatedAvailability = await updateAvailability(
        selectedEvent.id,
        updatedData
      );
      const updatedEvent = {
        ...selectedEvent,
        start: new Date(updatedAvailability.start_time),
        end: new Date(updatedAvailability.end_time),
        max_participants: updatedAvailability.max_participants,
      };
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? updatedEvent : event
      );
      setEvents(updatedEvents);
      setShowUpdateForm(false);
      setShowEventDetailsForm(false);
    } catch (error) {
      console.error("error updating availability:", error);
      alert("failed to update availability");
    }
  };

  const handleDeleteEvent = async (availabilityId) => {
    console.log("delete event with availability id:", availabilityId);
    try {
      await deleteAvailability(availabilityId);
      const updatedEvents = events.filter(
        (event) => event.id !== availabilityId
      );
      setEvents(updatedEvents);
      setShowEventDetailsForm(false);
    } catch (error) {
      console.error("error deleting availability:", error);
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
          onSelectEvent={handleSelected}
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
      {showEventDetailsForm && selectedEvent && (
        <EventDetailsCard
          event={selectedEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowEventDetailsForm(false)}
          isCoach={isCoach}
          onUpdate={() => {
            setShowUpdateForm(true);
            setShowEventDetailsForm(false);
          }}
        />
      )}

      {showUpdateForm && selectedEvent && (
        <AvailabilityUpdateForm
          event={selectedEvent}
          onClose={() => setShowUpdateForm(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default CalendarComponent;
