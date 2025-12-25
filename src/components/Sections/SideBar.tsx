import { FC, memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Squares2X2Icon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { AppDispatch } from "../../redux/store";
import { logoutThunk } from "../../redux/auth/operations";
import PadLayout from "../Layout/PadLayout";

const SideBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn btn-ghost justify-start gap-4 h-12 w-full transition-all duration-200 ${
      isActive
        ? "bg-primary/10 text-primary font-bold shadow-sm"
        : "opacity-60 hover:opacity-100 hover:bg-base-200"
    }`;

  return (
    <PadLayout padding="m">
      <div className="flex flex-col gap-8">
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            <Squares2X2Icon className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            <UserCircleIcon className="w-5 h-5" />
            <span>Profile Settings</span>
          </NavLink>
        </nav>

        <div className="pt-6 border-t border-base-300">
          <button
            onClick={handleLogout}
            className="btn btn-error btn-outline btn-sm w-full gap-2 group transition-all duration-300"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>
    </PadLayout>
  );
};

export default memo(SideBar);
