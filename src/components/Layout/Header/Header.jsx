import { useTheme } from "../../../context/themeContext";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import { useNavigate, NavLink } from "react-router-dom";
import Toggleswitch from "../../common/ToggleSwitch/Toggleswitch";
import Avatar from "../../Avatar/Avatar";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/register");
  };

  return (
    <header className="container mx-auto px-5 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4 md:gap-8">
        <NavLink
          to="/"
          className=" py-4 cursor-pointer"
          aria-label="Go to home page"
        >
          <svg className="w-11 h-11 md:w-12 md:h-12 lg:w-16 lg:h-16">
            <use href="/sprite.svg#taskflow-logo" />
          </svg>
        </NavLink>
        <p className="flex flex-col items-center font-bold leading- md:leading-[0.8]">
          <span className="text-xs md:text-sm">Task</span>
          <span className="text-sm tracking-widest md:text-base font-bold bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Flow
          </span>
        </p>
      </div>
      <div className="flex flex-row items-center gap-4 ">
        <Toggleswitch theme={theme} toggleTheme={toggleTheme} />
        {!isLoggedIn ? (
          <button
            className="
  btn btn-outline btn-accent 
  transition-all duration-300 ease-in-out
  btn-xs sm:px-8 py-4 md:btn-md lg:btn-lg xl:btn-xl
  hover:scale-105
  "
            onClick={handleRegistration}
          >
            Sign Up
          </button>
        ) : (
          <Avatar />
        )}
      </div>
    </header>
  );
};

export default Header;
