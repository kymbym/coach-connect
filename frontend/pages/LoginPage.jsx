import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="../public/images/colorful-background.jpg"
        alt="Signup background"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="lilita-one-regular text-4xl font-bold text-center mb-6">
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
