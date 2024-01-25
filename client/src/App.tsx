import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Kanban from "./components/Kanban/Kanban";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Logout from "./pages/Logout";
import Demo from "./pages/Demo";

/**/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Auth auth="login" />} />
      <Route path="register" element={<Auth auth="register" />} />
      <Route path="logout" element={<Logout />} />
      <Route path="demo" element={<Demo />} />
      <Route path="/user/:user"></Route>
    </Route>
  )
);



export default function App() {
  return (
    <div data-theme="pastel">
      <div className="w-screen h-screen overflow-y-scroll">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
