import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useTheme } from "../../../context/themeContext";

const PageLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      className="container mx-auto bg-bg text-text px-5 min-h-screen transition-colors duration-500"
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
