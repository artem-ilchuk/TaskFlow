import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUserThunk } from "./redux/auth/operations";

import Loader from "./components/Common/Loader/Loader";
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PageLayout from "./components/Layout/PageLayout/PageLayout";
import DashBoardLayout from "./components/Layout/DashBoardLayout/DashBoardLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage/DashBoardPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage/ProjectsPage"));
const ProjectsDetailsPage = lazy(
  () => import("./pages/ProjectsDetailsPage/ProjectsDetailsPage")
);
const TasksDetailsPage = lazy(
  () => import("./pages/TasksDetailsPage/TasksDetailsPage")
);
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage/AnalyticsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  if (isRefreshing) return null;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<DashBoardLayout />}>
            <Route path="dashboard" element={<DashBoardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectsDetailsPage />} />
            <Route path="tasks/:id" element={<TasksDetailsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
