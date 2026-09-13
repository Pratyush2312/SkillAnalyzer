import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrateUser() {
      try {
        const res = await api.post("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("User is not authenticated:", error);
        setUser(null);
      } finally {
        setTimeout(() => setLoading(false), 1000);
        // setLoading(false);
      }
    }

    hydrateUser();
  }, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
    </div>
  );
}
  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
