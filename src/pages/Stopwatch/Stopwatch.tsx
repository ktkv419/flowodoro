import { useEffect } from "react"
import useClockStore from "../../entities/clock/clock.modal"
import useUserStore from "../../entities/user/user.modal"
import Feed from "../../shared/ui/Feed/Feed"

const Stopwatch = () => {
    const { currentTime, setCurrentTime, isRunning, setIsRunning, intervalId, setIntervalId } = useClockStore()

    const { sessionHistory, sessionSplit } = useUserStore()
    const lastSession = sessionHistory[sessionHistory.length - 1]

    const handleSplit = () => {
        sessionSplit()
        if (lastSession && lastSession.splits[lastSession.splits.length - 1].type === "big-break") {
            console.log("last session big break")
            setIsRunning(false)
        }
    }

    useEffect(() => {
        if (lastSession) {
            const lastSplit = lastSession.splits[lastSession.splits.length - 1]
            setIsRunning(true)
            if (lastSplit.type === "work") {
                setCurrentTime(0)
                setIntervalId(
                    setInterval(() => {
                        setCurrentTime((val) => val + 1)
                    }, 1000),
                )
            } else {
                setCurrentTime(Math.floor(lastSplit.endTime! / 1000))
                setIntervalId(
                    setInterval(() => {
                        setCurrentTime((val) => val - 1)
                    }, 1000),
                )
            }
        }

        return () => {
            clearInterval(intervalId)
            setIntervalId(undefined)
        }
    }, [sessionHistory])

    return (
        <div className="stopwatch">
            <h1>Stopwatch</h1>
            <h2>{currentTime}</h2>
            <button onClick={handleSplit}>Split</button>
            <button onClick={() => setCurrentTime(0)}>Reset</button>
            {lastSession && <Feed splits={lastSession.splits} />}
        </div>
    )
}

export default Stopwatch
