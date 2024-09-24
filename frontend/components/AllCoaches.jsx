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
    <>
      <h2>Our Coaches</h2>
      {coaches.map((coach) => {
        console.log("coach id mapped:", coach.id);
        return (
          <Link to={`/user-dashboard/${coach.id}`} key={coach.id}>
            <CoachCard
              name={coach.name}
              profilepicture={coach.profilepicture}
            />
          </Link>
        );
      })}
    </>
  );
};

export default AllCoaches;
