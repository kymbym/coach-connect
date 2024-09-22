import CalendarComponent from "../components/Calendar";

const CoachDashboard = ({ availabilities }) => {
  return (
    <>
      <h1>Coach Dashboard</h1>
      <p>Manage your availability:</p>
      <CalendarComponent events={availabilities} />
    </>
  );
};

export default CoachDashboard;
