import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ISessionClass } from "../session/session.types"
import { Session } from "../session/session.modal"
import { Split } from "../split/split.modal"

interface IUserStore {
    // User
    isOffline: boolean | undefined
    userId: string | undefined
    setUserId: (id: string) => void

    // Session
    sessionHistory: ISessionClass[]
    createSession: (session: ISessionClass) => void
    sessionSplit: () => void

    // Settings
    amountOfBreaks: number
    setAmountOfBreaks: (amountOfBreaks: number) => void
    ratio: number
    setRatio: (ratio: number) => void
}

const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            isOffline: undefined,
            userId: undefined,
            setUserId: (id) => set({ userId: id }),
            sessionHistory: [],
            createSession: (session) =>
                set((state) => ({
                    sessionHistory: [...state.sessionHistory, session],
                })),
            sessionSplit: () => {
                set((state) => {
                    const sessions = state.sessionHistory
                    const lastSession = sessions.at(-1)

                    if (lastSession) {
                        // Set last split endTime
                        const lastSplit = lastSession.splits[lastSession.splits.length - 1]

                        !lastSplit.endTime && lastSplit.setEndTime(new Date().getTime())

                        if (lastSplit.type === "big-break") {
                            sessions.push(new Session(state.amountOfBreaks, state.ratio))
                        } else {
                            // Check whether current work session is last
                            const currentAmountOfBreaks = lastSession.splits.filter((el) => el.type === "work").length

                            const currentTime = new Date().getTime()

                            if (currentAmountOfBreaks <= lastSession.amountOfBreaks) {
                                // Add new session if it's not the last session
                                if (lastSplit.type === "work") {
                                    const endTime =
                                        currentTime + (lastSplit.endTime! - lastSplit.startTime) * state.ratio
                                    lastSession.splits.push(new Split(currentTime, "break", endTime))
                                } else {
                                    lastSession.splits.push(new Split(currentTime, "work"))
                                }
                            } else {
                                const endTime =
                                    currentTime + (lastSplit.endTime! - lastSplit.startTime) * state.ratio * 1.5
                                lastSession.splits.push(new Split(new Date().getTime(), "big-break", endTime))
                            }
                        }
                    } else {
                        sessions.push(new Session(state.amountOfBreaks, state.ratio))
                    }
                    return { ...state, sessionHistory: sessions }
                })
            },
            amountOfBreaks: 3,
            setAmountOfBreaks: (amountOfBreaks) => set({ amountOfBreaks }),
            ratio: 0.5,
            setRatio: (ratio) => set({ ratio }),
        }),
        {
            name: "user-store",
        },
    ),
)

export default useUserStore
