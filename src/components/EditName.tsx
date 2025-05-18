import { useState, type Dispatch, type SetStateAction } from "react"
import { motion } from "motion/react"

type EditNameProps = {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    setForm: Dispatch<SetStateAction<boolean>>
}

const EditName = ({ name, setName, setForm }: EditNameProps) => {
    const [tempName, setTempName] = useState(name)

    const onSubmit = () => {
        setName(tempName)
        setForm(false)
        localStorage.setItem("name", JSON.stringify(tempName))
    }

    return (
        <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <motion.div className="w-[36%]  backdrop-blur-lg bg-slate-600/10 px-5 py-2 pb-5 rounded-lg text-white"
                initial={{ y: -150 }}
                animate={{ y: 0, transition: { duration: .5 } }}
            >
                <h2 className="text-2xl text-white/70 py-2 border-b border-b-slate-500">{!name ? "Add" : "Edit"} Name</h2>

                <form onSubmit={onSubmit} className="mt-14 ">
                    <label htmlFor="name" className="text-lg ">What is your name?</label>
                    <input type="text" name="" id="name" value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Name"
                        className="block border border-slate-500 w-full mt-3 rounded p-2 text-lg"
                        required
                        autoFocus
                    />

                    <div className="mt-10 flex items-center justify-center gap-10">
                        <button
                            type="submit"
                            className="w-[100px] border border-green-800 text-green-600 px-4 py-2  rounded-lg cursor-pointer hover:bg-green-900 hover:text-white transition">Save</button>

                        <button className="w-[100px] border border-red-800 text-red-600 px-4 py-2 rounded-lg cursor-pointer  hover:bg-red-900 hover:text-white transition"
                            onClick={() => setForm(false)}>Cancel</button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default EditName