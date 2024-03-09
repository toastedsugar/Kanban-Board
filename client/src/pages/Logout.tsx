import { useEffect, useContext } from "react";
import { FirebaseLogout } from "../utils/firebase-auth";
import { useNavigate } from "react-router-dom";

import crying from "../assets/anime-crying.gif";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    FirebaseLogout();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-8">
      <p className="text-4xl ">You have been logged out!</p>
      <img src={crying} className="rounded-md" alt="weeping anime girl picture" />
    </div>
  );
}
