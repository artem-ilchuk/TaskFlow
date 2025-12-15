import { NavLink } from "react-router-dom";
import PadLayout from "../Layout/PadLayout";

const SideBar = () => {
  return (
    <PadLayout padding={"m"}>
      <nav>
        <NavLink to="/project"> Projects</NavLink>
      </nav>
    </PadLayout>
  );
};

export default SideBar;
