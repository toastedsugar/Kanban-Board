import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";

export default function DashLayout() {
  return (
    <div className="flex h-full">
      <DashSidebar />
      <div className="px-8 md:px-20 lg:px-32">
        <Outlet />
      </div>
    </div>
  );
}
