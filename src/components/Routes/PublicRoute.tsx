import React, { ReactNode, memo } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import Loader from "../Common/Loader";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default memo(PublicRoute);
