import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  try {
    const raw = localStorage.getItem("sitetrade_auth");
    const auth = raw ? JSON.parse(raw) : null;

    if (!auth?.token) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
