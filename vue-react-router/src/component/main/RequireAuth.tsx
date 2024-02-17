import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthStatus } from "../../type/auth.ts";

const RequireAuth = ({ permission }: { permission: string }) => {
  const { status, auth } = useAuth();
  const location = useLocation();

  return status === AuthStatus.Unknown ? (
    <Navigate
      to="/loading"
      state={
        location.pathname !== "/login"
          ? { from: location.pathname }
          : { from: null }
      }
    />
  ) : status === AuthStatus.Unauthenticated ? (
    <Navigate to="/login" state={{ from: location.pathname }} />
  ) : auth?.permissions?.find((p) => p.includes(`${permission}`)) ||
    permission === undefined ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      state={{ notification: { message: "Access denied", success: false } }}
    />
  );
};

export default RequireAuth;
