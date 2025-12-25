import React, { useCallback } from "react";
import InlineLayout from "../Layout/InlineLayout";
import PadLayout from "../Layout/PadLayout";
import { useTheme } from "../../context/themeContext";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate, NavLink } from "react-router-dom";
import Toggleswitch from "../Common/Toggleswitch";
import Avatar from "../UIComponents/Avatar";
import NotificationBell from "../UIComponents/NotificationBell";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleRegistration = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <header className="max-w-360 mx-auto">
      <PadLayout padding={["s", "m", "s", "m"]}>
        <InlineLayout justify="between">
          <InlineLayout gap={{ sm: "m", lg: "xl" }}>
            <NavLink
              to="/"
              className="cursor-pointer"
              aria-label="Go to home page"
              data-testid="logoLink"
            >
              <svg className="w-11 h-11 md:w-12 md:h-12 lg:w-16 lg:h-16">
                <use href="/sprite.svg#taskflow-logo" />
              </svg>
            </NavLink>
            <p className="flex flex-col items-center font-bold leading-none md:leading-[0.8]">
              <span className="text-xs md:text-sm">Task</span>
              <span className="text-sm tracking-widest md:text-base font-bold bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Flow
              </span>
            </p>
          </InlineLayout>

          <div
            id="header-filters-slot"
            className="hidden lg:block flex-1 max-w-2xl mx-10"
          ></div>

          <InlineLayout gap={{ sm: "l", lg: "xxl" }}>
            <Toggleswitch
              data-testid="toggle"
              theme={theme}
              toggleTheme={toggleTheme}
            />
            {!isLoggedIn ? (
              <button
                className="btn btn-outline btn-accent btn-xs sm:px-8 py-4 md:btn-md lg:btn-lg hover:scale-105 lg:ml-20"
                onClick={handleRegistration}
              >
                Sign Up
              </button>
            ) : (
              <div className="flex items-center gap-4 md:gap-6">
                <NotificationBell />
                <div className="w-0.5 h-8 bg-base-content/10 hidden md:block rounded-full"></div>
                <div className="hover:scale-105 transition-transform cursor-pointer">
                  <Avatar />
                </div>
              </div>
            )}
          </InlineLayout>
        </InlineLayout>
      </PadLayout>
    </header>
  );
};

export default React.memo(Header);
