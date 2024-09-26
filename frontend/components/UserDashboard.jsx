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
            start: new Date(booking.start_time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
            end: new Date(booking.end_time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
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
    <div className="container mx-auto p-6">
      <h1 className="lilita-one-regular text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-400 p-4 rounded-lg">
        User Dashboard
      </h1>
      <p className="fira-sans-bold text-2xl text-gray-800 mb-4 p-1">
        Our Coaches
      </p>
      <AllCoaches />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 fira-sans-bold">
          Upcoming Classes
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No upcoming classes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-pink-50 p-2 rounded-lg shadow-md"
              >
                <p className="fira-sans-regular text-gray-800 text-sm">
                  Class with coach{" "}
                  <span className="fira-sans-medium">{booking.coach_name}</span>
                </p>
                <p className="fira-sans-light-italic text-gray-800 text-xs">
                  {booking.date} from <strong>{booking.start}</strong> to{" "}
                  <strong>{booking.end}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
