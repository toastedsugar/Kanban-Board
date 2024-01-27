import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import DashLayout from "./components/DashLayout";
import AppLayout from "./components/AppLayout";

/**/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Auth auth="login" />} />
      <Route path="register" element={<Auth auth="register" />} />
      <Route path="logout" element={<Logout />} />
      <Route path="demo" element={<Demo />} />
      <Route path="/dashboard" element={<DashLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/user/:user"></Route>
    </Route>
  )
);

export default function App() {
  return (
    <div data-theme="nord">
        <RouterProvider router={router} />
    </div>
  );
}
