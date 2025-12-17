import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUserThunk } from "./redux/auth/operations";

import Loader from "./components/Common/Loader";
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PageLayout from "./components/Layout/PageLayout";
import DashBoardLayout from "./components/Layout/DashBoardLayout";
import { AppDispatch, RootState } from "./redux/store";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectsDetailsPage = lazy(() => import("./pages/ProjectsDetailsPage"));
const TasksDetailsPage = lazy(() => import("./pages/TasksDetailsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector((state: RootState) =>
    selectIsRefreshing(state)
  );

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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoardPage />} />
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectsDetailsPage />} />
          <Route path="tasks/:id" element={<TasksDetailsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
