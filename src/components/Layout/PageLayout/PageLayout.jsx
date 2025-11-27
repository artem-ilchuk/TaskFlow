import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useTheme } from "../../../context/themeContext";

const PageLayout = () => {
  const { theme } = useTheme();
  return (
    <>
      <Header />
      <main className="min-h-[70vh] py-8">
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;
