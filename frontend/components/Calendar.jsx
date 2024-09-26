import { useState, useCallback } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AvailabilityForm from "./AvailabilityForm";
import EventDetailsCard from "./AvailabilityEventCard";
import {
  createAvailability,
  createBooking,
  deleteAvailability,
  updateAvailability,
  sendEmail,
  getUserDetailsById,
  getBookingsByCoachId,
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
        coach_id: newAvailability.coach_id,
        id: newAvailability.id,
        start: new Date(newAvailability.start_time),
        end: new Date(newAvailability.end_time),
        max_participants: newAvailability.max_participants,
      };
      console.log("new event created:", newEvent);
      setEvents([...events, newEvent]);
      setSelectedEvent(newEvent);
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
        coach_id: updatedAvailability.coach_id,
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
      const availabilityDetails = events.find(
        (event) => event.id === availabilityId
      );
      if (!availabilityDetails) {
        throw Error("availability not found");
      }
      console.log("availability details:", availabilityDetails);

      await deleteAvailability(availabilityId);
      const updatedEvents = events.filter(
        (event) => event.id !== availabilityId
      );
      setEvents(updatedEvents);
      setShowEventDetailsForm(false);

      const bookingDetails = await getBookingsByCoachId(
        availabilityDetails.coach_id
      );
      console.log("booking details:", bookingDetails);

      if (bookingDetails.length === 0) {
        console.log("no bookings for this availability");
        return;
      }

      const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString();
      };
      const sentEmails = new Set();

      for (const booking of bookingDetails) {
        const userId = booking.user_id;
        console.log("fetching user details for user_id:", userId);
        const userDetails = await getUserDetailsById(userId);
        console.log("user details object:", userDetails);

        if (userDetails && typeof userDetails === "object") {
          for (const user of Object.values(userDetails)) {
            const user_email = user.email;
            console.log("user email:", user_email);
            if (user_email && !sentEmails.has(user_email)) {
              sentEmails.add(user_email);

              const bookingDate = booking.date;
              const startTime = booking.start_time;
              const endTime = booking.end_time;
              const coachName = booking.coach_name;

              if (user_email) {
                const subject = "Class Cancellation Notice";
                const message = `
      <b>Your class has been cancelled on ${formatDate(bookingDate)} from ${formatDate(startTime)} to ${formatDate(endTime)} with Coach ${coachName}!</b>
    `;
                await sendEmail(user_email, subject, message);
              } else {
                console.error("email is undefined for user_id:", userId);
              }
            }
          }
        } else {
          console.error("user details error", userDetails);
        }
      }
    } catch (error) {
      console.error("error deleting availability:", error);
    }
  };

  const handleBook = async (availabilityId) => {
    console.log("booking for availability id:", availabilityId);
    try {
      const booking = await createBooking(availabilityId);
      console.log("booking successful:", booking);
      alert("booking confirmed!");
    } catch (error) {
      console.error("error booking appointment:", error);
    }
  };

  return (
    <>
      <div style={{ height: "800px" }}>
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

      {showAvailabilityForm && (
        <div
          id="crud-modal"
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50 flex"
        >
          <div className="relative p-5 w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-3 border-b rounded-t">
                <h3 className="lilita-one-regular text-2xl px-2 text-gray-700">
                  Create New Availability
                </h3>
                <button
                  onClick={() => setShowAvailabilityForm(false)}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg p-2"
                >
                  &times;
                </button>
              </div>

              <div className="p-5 overflow-auto max-h-[70vh]">
                {selectedSlot && (
                  <AvailabilityForm
                    onSubmit={handleFormSubmit}
                    onClose={() => setShowAvailabilityForm(false)}
                    initialStart={selectedSlot.start}
                    initialEnd={selectedSlot.end}
                  />
                )}
              </div>

              {/* <div className="flex justify-end p-4 border-t"> */}
              {/* <button
                  onClick={() => setShowAvailabilityForm(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"
                >
                  Close
                </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}

      {showEventDetailsForm && (
        <div
          id="event-details-modal"
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50 flex"
        >
          <div className="relative p-5 w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-3 border-b rounded-t">
                <h3 className="lilita-one-regular text-2xl px-2 text-gray-700">
                  Event Details
                </h3>
                <button
                  onClick={() => setShowEventDetailsForm(false)}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg p-2"
                >
                  &times;
                </button>
              </div>

              <div className="p-5 overflow-auto max-h-[70vh]">
                {selectedEvent && (
                  <EventDetailsCard
                    event={selectedEvent}
                    onDelete={handleDeleteEvent}
                    onClose={() => setShowEventDetailsForm(false)}
                    isCoach={isCoach}
                    onUpdate={() => {
                      setShowUpdateForm(true);
                      setShowEventDetailsForm(false);
                    }}
                    onBook={handleBook}
                  />
                )}
              </div>

              {/* <div className="flex justify-end p-4 border-t"> */}
              {/* <button
                  onClick={() => setShowEventDetailsForm(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"
                >
                  Close
                </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div
          id="update-form-modal"
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50 flex"
        >
          <div className="relative p-4 w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-3 border-b rounded-t">
                <h3 className="lilita-one-regular text-2xl px-2 text-gray-700">
                  Update Availability
                </h3>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg p-2"
                >
                  &times;
                </button>
              </div>

              <div className="p-5 overflow-auto max-h-[70vh]">
                {selectedEvent && (
                  <AvailabilityUpdateForm
                    event={selectedEvent}
                    onClose={() => setShowUpdateForm(false)}
                    onUpdate={handleUpdate}
                  />
                )}
              </div>

              {/* <div className="flex justify-end p-4 border-t"> */}
              {/* <button
                  onClick={() => setShowUpdateForm(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"
                >
                  Close
                </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
