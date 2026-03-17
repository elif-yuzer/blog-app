import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function PublicOnlyRoute() {
  const currentUser = useSelector(selectCurrentUser);

  return currentUser ? <Navigate to="/admin" replace /> : <Outlet />;
}

