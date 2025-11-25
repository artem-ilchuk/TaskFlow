import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useTheme } from "../../../context/themeContext";

const PageLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      className="container mx-auto bg-bg text-text px-4 min-h-screen transition-colors duration-500"
      data-theme={theme}
    >
      <Header />
      <main className="min-h-[70vh] py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
