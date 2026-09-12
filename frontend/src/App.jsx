import React from "react";
import RegisterForm from "./features/auth/ui/RegisterForm";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginForm from "./features/auth/ui/LoginForm";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import ProfileSetup from "./features/profile/ui/ProfileSetup";
import Dashboard from "./features/dashboard/ui/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./shared/ui/Landing";
import PublicRoute from "./routes/PublicRoute";
import CareerRecommendations from "./pages/CareerRecommendations";
import SkillOverview from "./pages/SkillOverview";
import EditProfile from "./pages/EditProfile";
import ViewProfile from "./features/profile/ui/ViewProfile";
import SkillGap from "./pages/SkillGap";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "career-recommendations",
              element:<CareerRecommendations/>
            },
            {
              path: "skill-overview",
              element:<SkillOverview/>
            },
            {
              path: 'edit-profile',
              element:<EditProfile/>
            },
            {
              path: 'view-profile',
              element:<ViewProfile/>
            },
            {
              path: 'skill-gap',
              element:<SkillGap/>
            }
          ],
        },
        {
          path: "/profile",
          element: <ProfileSetup />,
        },
      ],
    },

    {
      element: <PublicRoute />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/register",
          element: <RegisterForm />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
