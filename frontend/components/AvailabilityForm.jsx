import { useState, useEffect } from "react";
import moment from "moment";

const AvailabilityForm = ({ onSubmit, onClose, initialStart, initialEnd }) => {
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
    const start_time = moment(date)
      .set({
        hours: startTime.hours(),
        minutes: startTime.minutes(),
      })
      .toISOString();

    const end_time = moment(date)
      .set({
        hours: endTime.hours(),
        minutes: endTime.minutes(),
      })
      .toISOString();

    const formData = {
      max_participants: parseInt(maxParticipants),
      date: date.toISOString(),
      start_time,
      end_time,
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm p-6 bg-purple-100 border border-purple-300 rounded-lg shadow dark:bg-purple-800 dark:border-purple-700 grid gap-6 mb-6 md:grid-cols-2"
    >
      <div>
        <label className="fira-sans-bold block mb-2 text-sm text-gray-900 dark:text-white">
          Max Participants
        </label>
        <input
          min="1"
          placeholder="e.g: 5"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          Date
        </label>
        <input
          min={moment().format("YYYY-MM-DD")}
          type="date"
          value={date.format("YYYY-MM-DD")}
          onChange={(e) => setDate(moment(e.target.value))}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          Start Time
        </label>
        <input
          type="time"
          value={startTime.format("HH:mm")}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            setStartTime(moment(date).set({ hours, minutes }));
          }}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          End Time
        </label>
        <input
          type="time"
          value={endTime.format("HH:mm")}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            setEndTime(moment(date).set({ hours, minutes }));
          }}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Create Event
        </button>
        {/* <button
          type="button"
          onClick={onClose}
          className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
        >
          Cancel
        </button> */}
      </div>
    </form>
  );
};

export default AvailabilityForm;
