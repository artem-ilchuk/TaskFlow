import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useTheme } from "../../../context/themeContext";

const PageLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      className="container bg-bg text-text px-4 min-h-screen transition-colors duration-500"
      data-theme={theme}
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <Header />
      <main className="min-h-[70vh] py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
