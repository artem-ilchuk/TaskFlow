import { ReactNode, memo } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    <> {children} </>
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
};

export default memo(PrivateRoute);
