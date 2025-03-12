import { create } from "zustand"

interface IClockStore {
    currentTime: number
    setCurrentTime: (value: number | ((prev: number) => number)) => void
    isRunning: boolean
    setIsRunning: (isRunning: boolean) => void
    intervalId: NodeJS.Timeout | undefined
    setIntervalId: (intervalId: NodeJS.Timeout | undefined) => void
}

const useClockStore = create<IClockStore>()((set) => ({
    currentTime: 0,
    setCurrentTime: (currentTime) =>
        set((state) => ({
            currentTime:
                typeof currentTime === "function"
                    ? currentTime(state.currentTime)
                    : currentTime,
        })),
    isRunning: false,
    setIsRunning: (isRunning) => set({ isRunning }),
    intervalId: undefined,
    setIntervalId: (intervalId) => set({ intervalId }),
}))

export default useClockStore
