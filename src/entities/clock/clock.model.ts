import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IClockStore {
    isRunning: boolean
    intervalId?: NodeJS.Timeout
    setIsRunning: (value: boolean) => void
    setIntervalId: (id?: NodeJS.Timeout) => void
}

const useClockStore = create<IClockStore>()(
    devtools((set) => ({
        isRunning: false,
        intervalId: undefined,

        setIsRunning: (value) => set({ isRunning: value }),
        setIntervalId: (id) =>
            set((state) => {
                state.intervalId && clearInterval(state.intervalId)
                return { intervalId: id }
            }),
    })),
)

export default useClockStore
