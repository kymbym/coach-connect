const EventDetailsCard = ({
  event,
  onUpdate,
  onDelete,
  // onClose,
  isCoach,
  onBook,
}) => {
  console.log("event details card event", event);
  return (
    <div className="max-w-sm p-6 bg-purple-100 border border-purple-300 rounded-lg shadow dark:bg-purple-800 dark:border-purple-700">
      <svg
        className="w-7 h-7 text-gray-500 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="2 3 19 19"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>

      {/* <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Event Details
      </h5> */}
      <p className="fira-sans-regular mb-1 text-gray-500 text-purple-50 pt-2">
        <span className="fira-sans-bold"> Max Participants: </span>{" "}
        {event.max_participants}
      </p>
      <p className="fira-sans-regular mb-1 text-gray-500 dark:text-gray-400 pt-2">
        <span className="fira-sans-bold"> Date: </span>{" "}
        {new Date(event.start).toLocaleDateString()}
      </p>
      <p className="fira-sans-regular mb-1 text-gray-500 dark:text-gray-400 pt-2">
        <span className="fira-sans-bold"> Start Time: </span>
        {new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="fira-sans-regular mb-1 text-gray-500 dark:text-gray-400 pt-2">
        <span className="fira-sans-bold"> End Time: </span>
        {new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {isCoach ? (
        <div className="flex space-x-2 pt-3">
          <button
            onClick={() => onUpdate(event)}
            className="fira-sans-regular text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="fira-sans-regular text-white bg-pink-600 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex space-x-2 pt-3">
          <button
            onClick={() => onBook(event.id)}
            className="fira-sans-regular text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Book
          </button>
          {/* <button
            onClick={() => {}}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cancel
          </button> */}
        </div>
      )}
      {/* <button
        onClick={onClose}
        className="mt-4 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Close
      </button> */}
    </div>
  );
};

export default EventDetailsCard;
