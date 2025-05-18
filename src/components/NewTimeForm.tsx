import { useState, type Dispatch, type SetStateAction } from "react"
import { motion } from "motion/react"

type NewTimeFormProps = {
    setNewTime: Dispatch<SetStateAction<number>>,
    showForm: Dispatch<SetStateAction<boolean>>,
    type: string,
    setNewBreakTime: Dispatch<SetStateAction<number>>
}

const NewTimeForm = ({ setNewTime, showForm, type, setNewBreakTime }: NewTimeFormProps) => {
    const [tempTime, setTempTime] = useState<number>()

    const handleSubmit = () => {
        if ((tempTime ?? 0) > 0) {
            if (type === "SESSION") {
                setNewTime((tempTime ?? 0) * 60)
            } else {
                setNewBreakTime((tempTime ?? 0) * 60)
            }
            showForm(false)
        }
    }

    return (
        <div className="absolute top-10 left-1/2 w-[64%] h-[80%] translate-x-[-50%] flex items-center justify-center bg-gray-800/40 backdrop-blur-2xl bg-opacity-50 text-white rounded-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}

                className="bg-black/60 p-8 rounded-lg shadow-lg ">
                <form action="" className="flex flex-col items-center gap-5">
                    <label htmlFor="newTime" className="text-lg">Enter the Minutes you want to
                        {type === "SESSION" ? "Work" : " Take break"} : </label>

                    <input type="number" id="newTime" value={tempTime}
                        onChange={e => setTempTime(Number(e.target.value))}
                        placeholder="Minutes"
                        autoFocus
                        required
                        className="block border w-32 p-2 rounded-lg no-spinner text-center text-white text-2xl" />

                    <div className="mt-10 flex items-center justify-center gap-10">
                        <button
                            type="submit"
                            className="w-[100px] border border-green-800 text-green-600 px-4 py-2  rounded-lg cursor-pointer hover:bg-green-900 hover:text-white transition"
                            onClick={handleSubmit}>Ok</button>

                        <button className="w-[100px] border border-red-800 text-red-600 px-4 py-2 rounded-lg cursor-pointer  hover:bg-red-900 hover:text-white transition"
                            onClick={() => showForm(false)}
                        >Cancel</button>
                    </div>
                </form>

            </motion.div>
        </div>
    )
}

export default NewTimeForm
