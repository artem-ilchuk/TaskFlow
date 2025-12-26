import React, { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useTheme } from "../../context/themeContext";
import InlineLayout from "../Layout/InlineLayout";
import PadLayout from "../Layout/PadLayout";
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
    <header className="max-w-360 mx-auto w-full" data-testid="app-header">
      <PadLayout padding={["s", "m", "s", "m"]}>
        <InlineLayout justify="between" align="center">
          <InlineLayout gap={{ sm: "m", lg: "xl" }} align="center">
            <NavLink
              to="/"
              data-testid="logoLink"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 1024 1024"
                fill="none"
                className="md:w-12 md:h-12 lg:w-16 lg:h-16"
              >
                <defs>
                  <linearGradient
                    id="logo-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFB347" />
                    <stop offset="60%" stopColor="#FF7A6B" />
                    <stop offset="100%" stopColor="#FF4DA6" />
                  </linearGradient>
                </defs>
                <rect
                  x="64"
                  y="64"
                  width="896"
                  height="896"
                  rx="200"
                  fill="url(#logo-gradient)"
                />
                <path
                  d="M 280 520 L 460 700 L 730 380"
                  stroke="white"
                  strokeWidth="80"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col font-bold leading-none">
                <span className="text-xs md:text-sm">Task</span>
                <span className="text-sm tracking-widest md:text-base bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Flow
                </span>
              </div>
            </NavLink>
          </InlineLayout>

          <div
            id="header-filters-slot"
            className="hidden lg:block flex-1 max-w-2xl mx-10"
          ></div>

          <InlineLayout gap={{ sm: "l", lg: "xxl" }} align="center">
            <Toggleswitch theme={theme} toggleTheme={toggleTheme} />
            {!isLoggedIn ? (
              <button
                data-testid="signup-button"
                className="btn btn-outline btn-accent btn-sm md:btn-md"
                onClick={handleRegistration}
              >
                Sign Up
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <NotificationBell />
                <div className="w-px h-6 bg-base-content/20 hidden md:block"></div>
                <Avatar />
              </div>
            )}
          </InlineLayout>
        </InlineLayout>
      </PadLayout>
    </header>
  );
};

export default React.memo(Header);
