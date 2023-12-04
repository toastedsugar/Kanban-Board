import Navbar from "./components/Navbar"
import Board from "./components/Board"

export default function App() {

  return (
    <div className="h-screen">

      <div className="flex flex-col bg-color-surface-mixed-100 text-color-text-primary w-screen h-screen">
        <Navbar />
        <div className="mx-4 overflow-x-scroll">
          <Board />
        </div>
      </div>
    </div>
  )
}
