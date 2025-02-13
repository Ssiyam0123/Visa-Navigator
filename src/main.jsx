import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root.jsx";
import AllVisasPage from "./components/visas/AllVisasPage.jsx";
import MyAddedVisasPage from "./components/visas/MyAddedVisasPage.jsx";
import MyVisaApplicationsPage from "./components/visas/MyVisaApplicationsPage.jsx";
import VisaDetailsPage from "./components/visas/VisaDetailsPage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import AddVisaPage from "./components/visas/AddVisaPage.jsx";
import HomePage from "./components/home/HomePage.jsx";
import AuthProvider, {
  AuthContext,
} from "./components/provider/AuthProvider.jsx";
import PrivateRoute from "./components/utilities/PrivateRoute.jsx";
import ErrorPage from "./components/general/ErrorPage.jsx";
import { ThemeProvider } from "./components/provider/ThemeProvider.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () =>
          fetch("https://assignment-10-server-swart-nine.vercel.app/visas"),
      },
      {
        path: "/all-visas",
        element: <AllVisasPage></AllVisasPage>,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisaPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisasPage />,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplicationsPage />
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://assignment-10-server-swart-nine.vercel.app/applications"
          ),
      },
      {
        path: "/visas/:id",
        element: (
          <PrivateRoute>
            <VisaDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/allVisas",
        element: <AllVisasPage></AllVisasPage>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
