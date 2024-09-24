const CoachCard = ({ name, profilepicture }) => {
  return (
    <>
      <img src={profilepicture} alt={`photo of ${name}`} />
      <h2>{name}</h2>
    </>
  );
};

export default CoachCard;
