import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FirebaseLogin, FirebaseRegister } from "../utils/firebase-auth";
import { auth } from "../../firebase-config.ts";

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
  const [error, setError] = useState<any>(null);
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  // Import auth context so isLoggedIn can be set when user logs in/ registers

  const navigate = useNavigate();

  async function HandleLogin(e: any) {
    e.preventDefault();
    const login = await FirebaseLogin(email, password);
    if (login) {
      //console.log(login)
      setError(() => login);
      return;
      //console.log(error)
    }
    navigate("/dashboard");
  }

  async function HandleRegister(e: any) {
    e.preventDefault();
    const register = await FirebaseRegister(username, email, password);
    if (register) {
      console.log(register);
      setError(() => register);
      return;
      //console.log(error)
    }
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-100 justify-center items-center w-96 shadow-xl">
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
              {/** Only render the username section if this is being used for registration */}
              {auth === "register" && (
                <li className="flex flex-col mb-2">
                  <label className="label-text mb-1" htmlFor="usernameInput">
                    Username
                  </label>
                  <input
                    id="usernameInput"
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </li>
              )}
              <li className="flex flex-col mb-2">
                <label className="label-text mb-1" htmlFor="emailInput">
                  Email
                </label>
                <input
                  id="emailInput"
                  className="input input-bordered w-full max-w-xs"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="flex flex-col">
                <label className="label-text mb-1" htmlFor="passwordInput">
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
            <div className="flex justify-center mb-4 text-error">
              {error && <b>{error.message}</b>}
            </div>
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
                    to="/login"
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
