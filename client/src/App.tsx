import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate,
} from "react-router-dom";


import Error from "./pages/Error";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import DashLayout from "./components/DashLayout";
import AppLayout from "./components/AppLayout";

export default function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Auth key="login" auth="login" />} />
        <Route
          path="register"
          element={<Auth key="register" auth="register" />}
        />
        <Route path="logout" element={<Logout />} />
        <Route path="demo" element={<Demo />} />
        <Route
          path="/dashboard"
          element={
              <DashLayout />
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/user/:user"></Route>
      </Route>
    )
  );

  return (
    <div data-theme="sunset">
        <RouterProvider router={router} />
    </div>
  );
}
