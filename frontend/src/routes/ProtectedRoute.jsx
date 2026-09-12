import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../config/api";
import { Outlet } from "react-router";

const ProtectedRoute = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function hydrateUser() {
      const res = await api.post("/auth/me");
      setUser(res.data.user);
    }
    hydrateUser();
  }, []);
  return <Outlet context={{user}}/>;
};

export default ProtectedRoute;
