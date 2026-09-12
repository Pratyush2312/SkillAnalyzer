import React from "react";
import RegisterForm from "./features/auth/ui/RegisterForm";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginForm from "./features/auth/ui/LoginForm";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import ProfileSetup from "./features/profile/ui/ProfileSetup";
import Dashboard from "./features/dashboard/ui/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/profile",
      element: <ProfileSetup />,
    },
    // {
    //   path: "/dashboard",
    //   element: < />,
    // },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
