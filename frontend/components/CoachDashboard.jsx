import CalendarComponent from "./Calendar";

const CoachDashboard = () => {
  return (
    <>
      <h1>Coach Dashboard</h1>
      <p>Manage your availability:</p>
      <CalendarComponent isCoach={true} />
    </>
  );
};

export default CoachDashboard;
