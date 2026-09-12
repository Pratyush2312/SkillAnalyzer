import React from "react";
import { Outlet, useOutletContext } from "react-router";
import Navbar from "../shared/ui/Navbar";

const MainLayout = () => {
  const { user } = useOutletContext();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <main className="flex-1">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;
