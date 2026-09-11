import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/ui/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
