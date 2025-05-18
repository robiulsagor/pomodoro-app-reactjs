import { Play, StopCircle } from "lucide-react"
import type { PomodoroState } from "../pages/Home"
import type { Dispatch, SetStateAction } from "react"

const Button = ({ state, setState, type }:
    { state: string, setState: Dispatch<SetStateAction<PomodoroState>>, type: string }) => {

    return (
        <button

            className={`text-white px-4 py-2 rounded-lg cursor-pointer flex gap-2 capitalize ${state === "RUNNING" ? "bg-red-800/60" : "bg-green-700/70"}`}
            onClick={() => setState(state === "RUNNING" ? type === "BREAK" ? "PAUSED" : "STOPPED" : "RUNNING")}
        >
            {state === "RUNNING" ? <StopCircle /> : <Play />}
            {state === "RUNNING" ? "Stop" : "Start"} {type.toLowerCase()}
        </button >
    )
}

export default Button