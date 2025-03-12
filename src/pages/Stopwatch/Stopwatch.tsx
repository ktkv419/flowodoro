import { useEffect } from "react"
import useClockStore from "../../entities/clock/clock.model"
import useUserStore from "../../entities/user/user.model"
import Feed from "../../shared/ui/Feed/Feed"

const Stopwatch = () => {
    const { currentTime, setCurrentTime, setIsRunning, intervalId, setIntervalId } = useClockStore()

    const { sessionHistory, setSession, sessionSplit } = useUserStore()
    const lastSession = sessionHistory[sessionHistory.length - 1]

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

    const handleSplit = () => {
        sessionSplit()
        if (lastSession && lastSession.splits[lastSession.splits.length - 1].type === "big-break") {
            setIsRunning(false)
            console.log(123)
        } else {
            setIsRunning(true)
        }
    }

    const handleReset = () => {
        setIsRunning(false)
        setCurrentTime(0)
        setSession([])
        clearInterval(intervalId)
    }

    return (
        <div className="stopwatch">
            <h1>Stopwatch</h1>
            <h2>{currentTime}</h2>
            <button onClick={handleSplit}>Split</button>
            <button onClick={handleReset}>Reset</button>
            {lastSession && <Feed splits={lastSession.splits} />}
        </div>
    )
}

export default Stopwatch
