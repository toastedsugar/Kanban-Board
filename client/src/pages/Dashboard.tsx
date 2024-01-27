import { useEffect } from "react";
import { auth } from "../../firebase-config.ts";

export default function Dashboard() {
// When the dashboard is launced, get all the boards owned by the user
// AND the lists that are present in each board 
  return (
    <div>
      <div>Boards</div>
      <button className="btn btn-primary">New Board</button>
      <ul>
        <li>Board 1</li>
        <li>Board 2</li>
        <li>Board 3</li>
      </ul>
    </div>
  );
}
