import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  // Если есть state.from, редирект туда, иначе на "/"
  const redirectTo = (location.state as { from?: string })?.from || "/";

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};

export default PublicRoute;
