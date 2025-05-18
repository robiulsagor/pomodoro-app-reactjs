import type { Dispatch, SetStateAction } from "react"
import { motion } from "motion/react"

const TimeUp = ({ name, type, setTimeUp }: { name: string, type: string, setTimeUp: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className="absolute top-0 left-1/2 translate-x-[-50%] w-full h-full bg-gray-900 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: .5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black p-5 rounded-lg w-1/2 text-center">
                <h2 className="text-2xl font-bold text-white border-b border-b-slate-400 pb-4">Time's Up</h2>

                <p className="my-14 text-2xl">
                    Hi {name}, Your {type === "SESSION" ? "Break" : "Session"} time is over.
                </p>

                <button className="border p-2 rounded-lg w-[100px] mx-auto cursor-pointer hover:bg-slate-400 hover:text-black transition"
                    onClick={() => setTimeUp(false)}>OK</button>
            </motion.div>
        </div>
    )
}

export default TimeUp