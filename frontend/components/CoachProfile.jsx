import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            id: availability.id,
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
    <div className="max-w-full mx-auto p-6">
      <div className="flex justify-center items-center">
        <div className="relative p-2 w-1/5 mr-4 overflow-hidden">
          <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 to-pink-200"></div>
          <div className="relative z-10 bg-white shadow-md rounded-lg p-5">
            <div className="flex flex-col items-center">
              <img
                className="w-48 h-48 rounded-full border-4 border-white"
                src={coach.profilepicture}
                alt={`Profile of ${coach.name}`}
              />
              <h1 className="lilita-one-regular text-4xl text-black mt-4">
                Coach {coach.name}
              </h1>
              <p className="text-black mt-2 fira-sans-regular-italic text-l">
                {coach.bio}
              </p>
              <p className="fira-sans-regular text-black mt-4">
                <strong>Sports:</strong> {coach.sports.join(", ")}
              </p>
              <p className="fira-sans-regular text-black mt-2">
                <strong>Years of experience:</strong> {coach.experience}
              </p>
              <p className="fira-sans-regular text-black mt-2">
                <strong>Rate:</strong> SGD {coach.rate_per_hour} / hr
              </p>
              <p className="fira-sans-regular text-black mt-2">
                <strong>Location:</strong> {coach.location}
              </p>
              <Link to="/user-dashboard" className="pt-4">
                <button className="px-4 py-2 w-full text-sm font-medium border rounded-s-lg rounded-e-lg focus:z-10 focus:ring-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-3/4">
          <CalendarComponent events={events} isCoach={false} />
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
