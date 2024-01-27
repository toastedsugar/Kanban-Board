import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FirebaseLogin, FirebaseRegister } from "../utils/firebase-auth";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type AuthTypes = {
  auth: "login" | "register" | "logout";
};
type ErrorType = {
  code: number;
  message: string;
};

export default function Auth({ auth }: AuthTypes) {
  const [error, setError] = useState<ErrorType>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const navigate = useNavigate()

  function HandleLogin(e: any) {
    e.preventDefault();
    FirebaseLogin(email, password);
    navigate('/dashboard')
  }
  function HandleRegister(e: any) {
    e.preventDefault();
    FirebaseRegister(email, password);
    navigate('/dashboard')
  }
  

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-200 justify-center items-center w-96 shadow-xl">
        <div className="p-12">
          <form
            className="flex flex-col"
            onSubmit={
              auth === "login"
                ? (e: any) => HandleLogin(e)
                : (e: any) => HandleRegister(e)
            }
          >
            <h2 className="mb-4">
              {auth === "login" ? "Log into your account" : "Register with us"}
            </h2>
            <ul className="mb-6">
              <li className="flex flex-col mb-2">
                <label className="label-text" htmlFor="usernameInput">
                  Username
                </label>
                <input
                  id="usernameInput"
                  className="input input-bordered w-full max-w-xs"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="flex flex-col">
                <label className="label-text" htmlFor="passwordInput">
                  Password
                </label>
                <div className="flex relative ">
                  <input
                    id="passwordInput"
                    className="input input-bordered w-full max-w-xs"
                    type={viewPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    className="absolute right-3 top-2"
                    onClick={() => setViewPassword((prevState) => !prevState)}
                  >
                    {viewPassword ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </div>
                </div>
              </li>
            </ul>
            <span className="flex justify-end mb-6">
              <button className="btn btn-primary">
                {auth === "login" ? "Login" : "Register"}
              </button>
            </span>
            <span className="flex justify-center text-textSecondary text-sm">
              {auth === "login" ? (
                <p>
                  Don't have an account?
                  <Link
                    className="font-bold ml-2 text-colorSecondary"
                    to="/register"
                  >
                    Register now
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <Link
                    className="font-bold ml-2 text-colorSecondary"
                    to="/register"
                  >
                    Login now
                  </Link>
                </p>
              )}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
