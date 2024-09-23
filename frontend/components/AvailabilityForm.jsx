import { useState, useEffect } from "react";
import moment from "moment";

const AvailabilityForm = ({ onSubmit, onClose, initialStart, initialEnd }) => {
  const [title, setTitle] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [date, setDate] = useState(
    initialStart ? moment(initialStart) : moment()
  );
  const [startTime, setStartTime] = useState(
    initialStart ? moment(initialStart) : moment()
  );
  const [endTime, setEndTime] = useState(
    initialEnd ? moment(initialEnd) : moment()
  );

  useEffect(() => {
    if (initialStart) {
      setStartTime(moment(initialStart));
      setEndTime(moment(initialEnd));
      setDate(moment(initialStart));
    }
  }, [initialStart, initialEnd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      max_participants: parseInt(maxParticipants),
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Event Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
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
            onChange={(e) => setDate(moment(e.target.value))}
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
        <button type="submit">Create Event</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default AvailabilityForm;
