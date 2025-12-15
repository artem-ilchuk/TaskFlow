import { Outlet } from "react-router-dom";
import Header from "../Sections/Header";

import { useTheme } from "../../context/themeContext";

const PageLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      className="  bg-bg text-text min-h-screen transition-colors duration-500"
      data-theme={theme}
    >
      <Header />
      <main className="min-h-[70vh] ">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
