import { useState } from "react"

export default function Navbar() {
    const [viewNavModal, setViewNavModal] = useState<boolean>(false)

    return (
        <nav className="bg-color-surface-mixed-300 py-2">
            <div className="mx-3 flex justify-between items-center">
                <div className="">Kanban board</div>
                <button 
                className="bg-color-primary-500 hover:bg-color-primary-600 px-3 py-1"
                onClick={() => {setViewNavModal(true)}}
                >
                    Login
                    </button>
            </div>
            {viewNavModal && < NavModal />}
        </nav>
    )
}

function NavModal() {
    return (
        <div className="bg-color-surface-mixed-500 z-20 h-screen w-screen brightness-50 fixed top-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-color-surface-mixed-200 w-1/2 h-1/2">
                Nav modal
            </div>
        </div>
    )
}