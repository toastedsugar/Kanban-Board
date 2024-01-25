import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import BrushIcon from "@mui/icons-material/Brush";

const MenuItems = [
  { name: "Home", path: "/home" },
  { name: "Public Cards", path: "/public" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export default function Navbar() {
  const navItems = ["Item 1", "Item 2"];

  return (
    <div>
      <nav className="navbar bg-base-100 border-b border-base-300 mb-4 sticky top-0">
        <Link to="/" className="flex-1">
          <button className="btn btn-ghost text-xl">Kanban</button>
        </Link>
        <div className="flex-none">
          <div className="flex gap-8 dropdown dropdown-end">
            <div className=" hidden sm:block">
              <div className="flex gap-2 ">
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </div>
            </div>
            <div tabIndex={0} role="button" className="btn btn-ghost avatar">
              <BrushIcon />
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost avatar">
              <MenuIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60"
            >
              <li className="sm:hidden">
                <Link to="/login">
                  <p>Login</p>
                </Link>
              </li>
              <li className="sm:hidden pb-2 border-b border-base-300">
                <Link to="/register">
                  <p>Sign up</p>
                </Link>
              </li>
              <li className="pt-1">
                <p>Settings</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
