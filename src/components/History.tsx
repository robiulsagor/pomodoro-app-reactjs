import { motion } from "motion/react"
import type { Dispatch, SetStateAction } from "react"


const History = ({ setShowHistory }: { setShowHistory: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <motion.div className="absolute top-10 left-1/2 h-[85%] w-[50%] translate-x-[-50%]  z-20 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: .5 } }}
        >
            <div className="bg-black/50 h-full rounded-lg overflow-y-scroll no-scrollbar w-full mx-auto">
                <div className="fixed top-0 left-0 w-full h-[80px] backdrop-blur-3xl bg-black/50 z-10">
                    <h2 className="text-3xl font-bold text-center p-5 border-b border-b-slate-500 text-slate-300">History</h2>
                    <button
                        className="border bg-slate-700 p-2 rounded-lg absolute right-10 top-5 cursor-pointer hover:bg-slate-800 transition duration-200"
                        onClick={() => setShowHistory(false)}>Back</button>

                </div>


                <ul className="flex flex-col gap-2 mt-24 px-10 ">
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>Today</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>Yesterday</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>15/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                    <li className="flex justify-between items-center p-5 border-b border-b-slate-500 text-slate-300">
                        <div>14/05/25</div>
                        <div>2hr 20min</div>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}

export default History