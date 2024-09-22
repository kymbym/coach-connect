import CalendarComponent from "../components/Calendar";

const UserDashboard = ({ bookings }) => {
  return (
    <>
      <h1>User Dashboard</h1>
      <p>Here are your upcoming bookings:</p>
      <CalendarComponent events={bookings} />
    </>
  );
};

export default UserDashboard;
