import type { PomodoroState } from "../pages/Home"
import type { Dispatch, SetStateAction } from "react"

import { CiPlay1, CiStop1 } from "react-icons/ci";

const Button = ({ state, setState, type }:
    { state: string, setState: Dispatch<SetStateAction<PomodoroState>>, type: string }) => {

    return (
        <button

            className={`text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 capitalize ${state === "RUNNING" ? "bg-red-800/60" : "bg-green-700/70"}`}
            onClick={() => setState(state === "RUNNING" ? type === "BREAK" ? "PAUSED" : "STOPPED" : "RUNNING")}
        >
            {state === "RUNNING" ? <CiStop1 size={20} /> : <CiPlay1 size={20} />}
            {state === "RUNNING" ? "Stop" : "Start"} {type.toLowerCase()}
        </button >
    )
}

export default Button