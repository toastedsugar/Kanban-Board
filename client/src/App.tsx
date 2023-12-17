import Navbar from "./components/Navbar"
import Kanban from "./components/Kanban/Kanban";

/*
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter(createRoutesFromElements(
  <Route
  path="/"
  element={<Home />}
  errorElement={<ErrorPage />}
  >

  </Route>
));
*/

export default function App() {
  return (
    <div className="h-screen">
      <div className="flex flex-col bg-color-surface-mixed-100 text-color-text-primary w-screen h-screen">
        <Navbar />
        <Kanban />
      </div>
    </div>
  )
}
