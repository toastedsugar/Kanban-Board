import { useState } from "react";
import { Link } from "react-router-dom";

import BrushIcon from "@mui/icons-material/Brush";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config.ts";

export default function Navbar() {
  const [user, setUser] = useState<any>({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 sticky top-0">
      <Link to="/" className="flex-1">
        <button className="btn btn-ghost text-xl">Kanban</button>
      </Link>
      <div className="flex-none">
        <div className="flex gap-8 dropdown dropdown-end">
          <div className=" hidden sm:block">
            {user ? (
              // If the user is logged in, show the logout button
              <Link to="/logout">
                <button className="btn btn-primary">Logout</button>
              </Link>
            ) : (
              // Otherwise show the login and register buttons */
              <div className="flex gap-2 ">
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </div>
            )}
          </div>
          <div tabIndex={0} role="button" className="btn btn-ghost avatar">
            <BrushIcon />
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost avatar">
            <AccountCircleIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[40] p-2 shadow bg-base-100 rounded-box w-60"
          >
            <div>
              {
                // If the user is logged in, show their email and the logout button
                user ? (
                  <div>
                    <p>{user?.email}</p>
                    <li className="sm:hidden">
                      <Link to="/logout">
                        <p>Logout</p>
                      </Link>
                    </li>
                  </div>
                ) : (
                  // Otherwise slow the login and register buttons
                  <div>
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
                  </div>
                )
              }
            </div>
            <li className="pt-1">
              <Link to="/dashboard">
                <p>Dashboard</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
