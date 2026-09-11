import React from 'react'
import RegisterForm from './features/auth/ui/RegisterForm';
import { createBrowserRouter, RouterProvider } from 'react-router';
import LoginForm from './features/auth/ui/LoginForm';
import MainLayout from './layout/MainLayout';
import { Toaster } from 'react-hot-toast';
import ProfileSetup from './features/profile/ui/ProfileSetup';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children:[]
    },
    {
      path: '/register',
      element:<RegisterForm/>
    },
    {
      path: '/login',
      element:<LoginForm/>
    },
    {
      path: '/profile',
      element:<ProfileSetup/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  )
}

export default App
