import { useEffect, useState } from "react";
import { getCoachDetails } from "../services/api";
import CoachCard from "../components/CoachCard";
import { Link } from "react-router-dom";

const AllCoaches = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const getCoaches = async () => {
      try {
        const coachesData = await getCoachDetails();
        setCoaches(coachesData.coaches);
      } catch (error) {
        console.error(error);
      }
    };

    getCoaches();
  }, []);

  if (!coaches) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {coaches.map((coach) => (
        <Link to={`/user-dashboard/${coach.id}`} key={coach.id}>
          <CoachCard name={coach.name} profilepicture={coach.profilepicture} />
        </Link>
      ))}
    </div>
  );
};

export default AllCoaches;
