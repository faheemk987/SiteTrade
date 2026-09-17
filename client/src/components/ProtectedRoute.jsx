import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import { api } from "@/lib/api";

export default function ProtectedRoute() {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    if (!isAuthenticated()) {
      localStorage.removeItem("sitetrade_auth");
      setChecking(false);
      return undefined;
    }

    api.get("/auth/me")
      .then(() => {
        if (active) setAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("sitetrade_auth");
        if (active) setAuthenticated(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (!authenticated) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`}
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  return <Outlet />;
}
