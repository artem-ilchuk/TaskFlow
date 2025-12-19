import { FC } from "react";
import { NavLink } from "react-router-dom";
import notFoundImg from "../assets/img/Accessories/Not found.png";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <img
        src={notFoundImg}
        alt="Not Found"
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6"
      />
      <div className="flex flex-col gap-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          The page you are looking for does not exist. Please check the URL.
        </p>

        <NavLink
          to="/"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 self-center"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
