import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function DashLayout() {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  function Layout() {
    return (
      <div className="flex h-full">
        <div
          className="bg-neutral w-4 sm:hidden flex justify-center relative"
          onClick={() => setShowMobileSidebar(true)}
        >
          <ChevronRightIcon
            fontSize="large"
            className="bg-base-100 rounded-full  border-2 border-neutral absolute left-0"
          />
        </div>
        <div className="hidden sm:block">
          <DashSidebar />
        </div>
        <div className="px-8 md:px-20 lg:px-32">
          <Outlet />
        </div>
      </div>
    );
  }

  function ShowMobileSidebar() {
    return (
      <div className="flex h-full bg-base-300">
        <div className="bg-base-100">
          <DashSidebar />
        </div>
        <div
          className="bg-neutral w-4 sm:hidden flex justify-center relative"
          onClick={() => setShowMobileSidebar(false)}
        >
          <ChevronLeftIcon
            fontSize="large"
            className="bg-base-100 rounded-full  border-2 border-neutral absolute left-0"
          />
        </div>
      </div>
    );
  }

  return showMobileSidebar ? ShowMobileSidebar() : Layout();
}
