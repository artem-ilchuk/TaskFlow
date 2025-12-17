import { NavLink } from "react-router-dom";
import PadLayout from "../Layout/PadLayout";
import { FC } from "react";

const SideBar: FC = () => {
  return (
    <PadLayout padding={"m"}>
      <nav>
        <NavLink to="/projects"> Projects</NavLink>
      </nav>
    </PadLayout>
  );
};

export default SideBar;
