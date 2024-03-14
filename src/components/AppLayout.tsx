import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen overflow-y-scroll bg-base-200 flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
