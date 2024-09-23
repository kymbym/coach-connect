const EventDetailsCard = ({ event, onUpdate, onDelete, onClose, isCoach }) => {
  return (
    <div>
      <h2>Event Details</h2>
      <p>Max Participants: {event.max_participants}</p>
      <p>Date: {new Date(event.start).toLocaleDateString()}</p>
      <p>
        Start Time:{" "}
        {new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>
        End Time:{" "}
        {new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {isCoach ? (
        <>
          <button onClick={() => onUpdate(event)}>Update</button>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={() => {}}>Book Class</button>
          <button onClick={() => {}}>Cancel</button>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventDetailsCard;
