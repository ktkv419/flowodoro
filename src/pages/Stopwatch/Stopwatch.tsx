import { useEffect, useState } from "react"
import useClockStore from "../../entities/clock/clock.model"
import useUserStore from "../../entities/user/user.model"
import Feed from "../../shared/ui/Feed/Feed"

const Stopwatch = () => {
    const [currentTime, setCurrentTime] = useState(0)
    const { setIsRunning, isRunning, intervalId, setIntervalId } = useClockStore()

    const { sessionHistory, setSession, sessionSplit } = useUserStore()
    const lastSession = sessionHistory[sessionHistory.length - 1]

    useEffect(() => {
        const lastSplit = lastSession.splits[lastSession.splits.length - 1]
        console.log(lastSession)

        if (isRunning) {
            if (lastSplit.type === "work") {
                setCurrentTime(Math.round((Date.now() - lastSplit.startTime) / 1000))
            } else {
                setCurrentTime(Math.round((lastSplit.endTime! - Date.now()) / 1000))
            }
        }
    }, [])

    useEffect(() => {
        if (lastSession) {
            const lastSplit = lastSession.splits[lastSession.splits.length - 1]
            setIsRunning(true)
            if (lastSplit.type === "work") {
                setIntervalId(
                    setInterval(() => {
                        setCurrentTime(Math.round((Date.now() - lastSplit.startTime) / 1000))
                    }, 1000),
                )
            } else {
                setIntervalId(
                    setInterval(() => {
                        setCurrentTime(() => {
                            const time = Math.round((lastSplit.endTime! - Date.now()) / 1000)
                            if (time <= 1) {
                                setIntervalId(undefined)
                                return 0
                            }
                            return time
                        })
                    }, 1000),
                )
            }
        }

        return () => {
            if (intervalId) {
                setIntervalId(undefined)
            }
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
        setIntervalId(undefined)
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
