import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoachDetailsById, getAvailabilities } from "../services/api";
import CalendarComponent from "./Calendar";

const CoachProfile = () => {
  const { coachId } = useParams();
  const [coach, setCoach] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      try {
        const coachData = await getCoachDetailsById(coachId);
        console.log("coach data", coachData);
        setCoach(coachData.coach);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAvailabilities = async () => {
      if (coachId) {
        try {
          const availabilities = await getAvailabilities(coachId);
          console.log("fetched availabilities:", availabilities);
          const formattedEvents = availabilities.map((availability) => ({
            start: new Date(availability.start_time),
            end: new Date(availability.end_time),
            max_participants: availability.max_participants,
          }));
          setEvents(formattedEvents);
        } catch (error) {
          console.error("failed to fetch availabilities:", error);
        }
      }
    };

    fetchCoachDetails();
    fetchAvailabilities();
  }, [coachId]);

  if (!coach) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <h1>{coach.name}</h1>
      <CalendarComponent events={events} isCoach={false} />
    </>
  );
};

export default CoachProfile;