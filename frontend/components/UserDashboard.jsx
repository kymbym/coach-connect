import { useEffect, useState } from "react";
import AllCoaches from "./AllCoaches";
import { getBookingsByUserId } from "../services/api";
import { isValidToken, extractPayload } from "../utils/jwtUtils";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isValidToken(token)) {
      const payload = extractPayload(token);
      const fetchUserBookings = async () => {
        try {
          const bookings = await getBookingsByUserId(payload.id);
          const formattedBookings = bookings.map((booking) => ({
            id: booking.id,
            date: new Date(booking.date).toLocaleDateString(),
            start: new Date(booking.start_time).toLocaleTimeString(),
            end: new Date(booking.end_time).toLocaleTimeString(),
            max_participants: booking.max_participants,
            coach_name: booking.coach_name,
          }));
          setBookings(formattedBookings);
        } catch (error) {
          console.error("failed to fetch bookings:", error);
        }
      };
      fetchUserBookings();
    }
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <AllCoaches />
      <h2>Booking Details:</h2>
      {bookings.length === 0 ? (
        <p>no bookings found</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>
                Class with coach {booking.coach_name} on {booking.date} from{" "}
                {booking.start} to {booking.end}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
