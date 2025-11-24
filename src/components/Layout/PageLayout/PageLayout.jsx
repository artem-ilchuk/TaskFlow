import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector } from "react-redux";

const PageLayout = () => {
  const theme = useSelector((state) => state.ui.theme);
  return (
    <div className="container mx-auto px-4" data-theme={theme}>
      <Header />
      <main className="min-h-[70vh] py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
