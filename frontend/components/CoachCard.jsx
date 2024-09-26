const CoachCard = ({ name, profilepicture }) => {
  return (
    <div className="relative p-2 w-full max-w-xs mx-auto">
      <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-purple-300 to-pink-200"></div>
      <div className="fira-sans-semibold  relative z-10 flex flex-col items-center bg-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
        <img
          className="rounded-full w-32 h-32 border-4 border-white transition-all duration-300 filter hover:grayscale"
          src={profilepicture}
          alt={`Photo of ${name}`}
        />
        <h1 className="mt-4 text-2xl font-semibold text-center text-gray-800">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CoachCard;
