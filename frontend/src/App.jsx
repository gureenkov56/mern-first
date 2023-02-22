import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import BasicLayout from './BasicLayout';
import Profile from './pages/Profile';

const noAuthUserRouter = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
]);

const authUserRouter = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: '/',
        element: <Profile />
      },
    ]
  },
]);

const isAuth = false;
const router = isAuth ? authUserRouter : noAuthUserRouter;

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App