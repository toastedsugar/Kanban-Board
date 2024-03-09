import { useEffect, useState } from "react";
import { auth } from "../../firebase-config.ts";
import { useNavigate } from "react-router-dom";

console.log(auth)

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config.ts";

export default function Dashboard() {
  // Stops the user from accessing the dashboard if they're not logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, []);

  const AddBoard = async (e: any) => {
    e.preventDefault();
    try {
      const response = await addDoc(collection(db, "Boards"), {
        name: "New Board",
        lists: ["A list"],
        cards: ["A card"]
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const [boards, setBoards] = useState();
  // When the dashboard is launched, get all the boards owned by the user
  // AND the lists that are present in each board
  return (
    <div className="pt-4">
      <div>Boards</div>
      <button onClick={AddBoard} className="btn btn-primary">
        New Board
      </button>
      <ul>
        <li>Board 1</li>
        <li>Board 2</li>
        <li>Board 3</li>
      </ul>
    </div>
  );
}
