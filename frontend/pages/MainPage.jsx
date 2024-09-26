import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="m-5 flex flex-col justify-center items-start w-1/2 p-8 bg-white relative">
          <h1 className="lilita-one-regular text-5xl text-purple-800">
            Pulse: Your Heartbeat to Fitness
          </h1>
          <h2 className="text-lg fira-sans-light-italic my-1">
            Find your ideal coach and transform your health and wellness.
          </h2>
          {/* <h3 className="fira-sans-light-italic mt-2">
            Connect, train, and thrive together!
          </h3> */}
          <div className="mt-1">
            <Link to="/signup">
              <button className="fira-sans-regular bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 w-auto border rounded-s-lg rounded-e-lg text-sm font-medium focus:z-10 focus:ring-2 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 hover:bg-gradient-to-l mr-2">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="fira-sans-regular text-sm font-medium border rounded-s-lg rounded-e-lg py-2 px-4 w-auto focus:z-10 focus:ring-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                Log In
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <img
            src="../public/images/colorful-background.jpg"
            alt="colorful blobs"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
