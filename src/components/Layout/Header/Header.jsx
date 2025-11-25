import { NavLink } from "react-router-dom";
import Toggleswitch from "../../common/ToggleSwitch/Toggleswitch";
import { useTheme } from "../../../context/themeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-16">
        <NavLink
          to="/"
          className=" py-4 cursor-pointer"
          aria-label="Go to home page"
        >
          <svg className="w-16 h-16">
            <use href="/sprite.svg#taskflow-logo" />
          </svg>
        </NavLink>
        <p className="text-2xl leading-[1.1] font-bold">
          Task <br />
          Flow
        </p>
      </div>
      <Toggleswitch theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
