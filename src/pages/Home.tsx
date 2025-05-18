import { useEffect, useRef, useState } from "react"
import Button from "../components/Button"
import { motion } from "motion/react"
import EditName from "../components/EditName"
import { CircularTimer } from "../components/CircularTimer"
import NewTimeForm from "../components/NewTimeForm"
import TimeUp from "../components/TimeUp"

export type PomodoroState = "RUNNING" | "STOPPED" | "PAUSED"
type PomodoroType = "SESSION" | "BREAK"

const Home = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [totalSessionTime, setTotalSessionTime] = useState<number>(25 * 60); // 25 minutes in seconds
    const [totalBreakTime, setTotalBreakTime] = useState<number>(5 * 60); // 5 minutes in seconds

    const [state, setState] = useState<PomodoroState>("STOPPED")
    const [type, setType] = useState<PomodoroType>("BREAK")

    const [time, setTime] = useState<number>(totalSessionTime) // remaining session time
    const [breakTime, setBreakTime] = useState<number>(totalBreakTime) //remaining break time

    const [name, setName] = useState(JSON.parse(localStorage.getItem('name') as string) || "") // user name
    const [showNameForm, setShowNameForm] = useState(false) // name editing form

    const [newTime, setNewTime] = useState<number>() // custom session time
    const [newBreakTime, setNewBreakTime] = useState<number>() // custom break time

    const [showNewTimeForm, setShowNewTimeForm] = useState(false) //custom time adding form

    const [timeUp, setTimeUp] = useState(false) // time up modal

    // make the time ticking
    useEffect(() => {
        if (type === "SESSION") {
            if (state === "RUNNING") {
                const interval = setInterval(() => {
                    setTime((prev) => {
                        if (prev <= 0) {
                            setType("BREAK")
                            setState("STOPPED")
                            setTimeUp(true)
                            clearInterval(interval)
                            return breakTime
                        }
                        return prev - 1
                    })
                }, 1000)
                return () => clearInterval(interval)
            } else {
                setTime(totalSessionTime)
            }
        }
        else if (type === "BREAK") {
            if (state === "RUNNING") {
                const interval = setInterval(() => {
                    setBreakTime((prev) => {
                        if (prev <= 0) {
                            setType("SESSION")
                            setState("STOPPED")
                            setTimeUp(true)
                            clearInterval(interval)
                            return breakTime
                        }
                        return prev - 1
                    })
                }, 1000)
                return () => clearInterval(interval)
            }
            else if (state === "PAUSED") {
                setType("SESSION")
                setTime(totalSessionTime)
                setBreakTime(totalBreakTime)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, type])

    useEffect(() => {
        audioRef.current = new Audio('/alarm.wav');
    }, []); // create only once when component mounts

    useEffect(() => {
        if (audioRef.current) {
            if (timeUp) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // reset to start
            }
        }
    }, [timeUp]);

    // hide the form if the name is already set
    useEffect(() => {
        if (!name) {
            setShowNameForm(true)
        }
    }, [name])

    // close name form with pressing "Esc" key
    useEffect(() => {
        const handleClose = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowNameForm(false)
            }
        }
        document.addEventListener('keydown', handleClose)
        return () => document.removeEventListener('keydown', handleClose)
    }, [showNameForm])

    // setting custom time for session time
    useEffect(() => {
        if (newTime) {
            setTotalSessionTime(newTime)
            setTime(newTime)
        }
    }, [newTime])

    // setting custom time for break time
    useEffect(() => {
        if (newBreakTime) {
            setTotalBreakTime(newBreakTime)
            setBreakTime(newBreakTime)
        }
    }, [newBreakTime])

    const cancelBreak = () => {
        setType("SESSION")
    }


    return showNameForm ? <EditName name={name} setName={setName} setForm={setShowNameForm} /> :
        showNewTimeForm ? <NewTimeForm
            setNewBreakTime={setNewBreakTime}
            showForm={setShowNewTimeForm}
            type={type}
            setNewTime={setNewTime}
        /> : (
            <div className="w-[98%] sm:w-[75%] md:w-[65%] h-[85%] p-10 rounded-lg backdrop-blur-lg bg-white/10 text-white" >
                <motion.div className="h-full flex flex-col items-center justify-around transition duration-300"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: .5 } }}
                    exit={{ opacity: 0, y: -50 }}
                >
                    <div className="text-2xl md:text-4xl font-bold text-center">
                        {
                            state === "RUNNING" ? (
                                type === "SESSION" ? (
                                    <h1>
                                        {name}, <br /> it's time to work.
                                    </h1>
                                ) : (
                                    <h1>
                                        {name}, <br /> it's break time.
                                    </h1>
                                )
                            ) : (
                                type === "BREAK" ? (
                                    <h1>You better take a break now, <br /> {name} </h1>
                                ) :
                                    (
                                        <h1>Welcome to Pomodaro, <br />
                                            <span className="cursor-pointer hover:underline" onClick={() => setShowNameForm(true)}> {name || "Guest"}</span>!
                                        </h1>
                                    )
                            )
                        }
                    </div>

                    <CircularTimer
                        totalTime={type === "SESSION" ? totalSessionTime : totalBreakTime}
                        timeLeft={type === "SESSION" ? time : breakTime}
                        running={state === "RUNNING"}
                        type={type}
                        showForm={setShowNewTimeForm}
                    />

                    <div className="transition duration-300  ">
                        <div className="flex items-center justify-center transition duration-300">
                            {/* {
                                state === "RUNNING" ? (
                                    <Button state={state} setState={setState} type={type}
                                    />
                                ) : 
                                    <Button state={state} setState={setState} type={type}
                                    />
                                
                            } */}
                            <Button state={state} setState={setState} type={type}
                            />

                            {
                                (state === "STOPPED" && type === "BREAK") && (
                                    <button className="text-white px-4 py-2 rounded-lg cursor-pointer flex gap-2 capitalize border border-red-800 ml-5 bg-red-600/20 hover:bg-red-700/40 transition"
                                        onClick={cancelBreak}>
                                        Cancel Break
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </motion.div>

                {timeUp && <TimeUp name={name} type={type} setTimeUp={setTimeUp} />}
            </div>
        )
}

export default Home