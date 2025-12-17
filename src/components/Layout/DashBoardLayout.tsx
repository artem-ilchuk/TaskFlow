import { Outlet } from "react-router-dom";
import SideBar from "../Sections/SideBar";
import Header from "../Sections/Header";
import ScreenSplitter from "./ScreenSplitter";

const DashBoardLayout: React.FC = () => {
  return (
    <>
      <Header />
      <ScreenSplitter className="border-t border-gray-400 bg-white">
        <SideBar />
        <main className="border-l border-gray-400 min-h-screen bg-white p-6">
          <Outlet />
        </main>
      </ScreenSplitter>
    </>
  );
};

export default DashBoardLayout;
