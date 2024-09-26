import { useState } from "react";
import moment from "moment";

const AvailabilityUpdateForm = ({ event,
  // onClose,
  onUpdate }) => {
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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm p-6 bg-purple-100 border border-purple-300 rounded-lg shadow dark:bg-purple-800 dark:border-purple-700 grid gap-6 mb-6 md:grid-cols-2"
    >
      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          Max Participants:
        </label>
        <input
          type="number"
          value={maxParticipants}
          min={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          Date:
        </label>
        <input
          type="date"
          value={date.format("YYYY-MM-DD")}
          onChange={handleDateChange}
          required
          min={moment().format("YYYY-MM-DD")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm fira-sans-bold text-gray-900 dark:text-white">
          Start Time:
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
          End Time:
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

      <div className="flex space-x-2">
        <button
          type="submit"
          className="text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Update Event
        </button>
        {/* <button
          type="button"
          onClick={onClose}
          className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 fira-sans-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Cancel
        </button> */}
      </div>
    </form>
  );
};

export default AvailabilityUpdateForm;
