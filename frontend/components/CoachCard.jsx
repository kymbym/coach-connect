const CoachCard = ({ name, profilepicture }) => {
  return (
    <div className="relative p-2 w-full max-w-lg mx-auto">
      {/* <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 to-pink-200"></div> */}
      <div className="flex flex-col items-center bg-gradient-to-r from-purple-100 to-pink-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <img
          className="rounded-full w-48 h-48 border-4 border-white transition-all duration-300 filter hover:grayscale"
          src={profilepicture}
          alt={`Photo of ${name}`}
        />
        <h1 className="fira-sans-regular mt-4 text-3xl font-semibold text-center text-gray-800">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CoachCard;
