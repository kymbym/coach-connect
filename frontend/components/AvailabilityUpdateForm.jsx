import { useState } from "react";
import moment from "moment";

const AvailabilityUpdateForm = ({ event, onClose, onUpdate }) => {
  const [maxParticipants, setMaxParticipants] = useState(
    event.max_participants
  );
  const [date, setDate] = useState(moment(event.start));
  const [startTime, setStartTime] = useState(moment(event.start));
  const [endTime, setEndTime] = useState(moment(event.end));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      max_participants: parseInt(maxParticipants),
      date: date.toISOString(),
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };
    console.log("submitting updated data:", updatedData);
    onUpdate(updatedData);
  };

  const handleDateChange = (e) => {
    const newDate = moment(e.target.value);
    setDate(newDate);
    setStartTime(
      moment(newDate).set({
        hours: startTime.hours(),
        minutes: startTime.minutes(),
      })
    );
    setEndTime(
      moment(newDate).set({
        hours: endTime.hours(),
        minutes: endTime.minutes(),
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Max Participants:
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date.format("YYYY-MM-DD")}
            onChange={handleDateChange}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime.format("HH:mm")}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              setStartTime(moment(date).set({ hours, minutes }));
            }}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime.format("HH:mm")}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              setEndTime(moment(date).set({ hours, minutes }));
            }}
            required
          />
        </label>
        <button type="submit">Update Event</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default AvailabilityUpdateForm;
