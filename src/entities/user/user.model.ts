import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ISessionClass } from "../session/session.types"
import { Session } from "../session/session.model"
import { Split } from "../split/split.model"

interface IUserStore {
    logged: boolean
    onboarded: boolean
    sessionHistory: ISessionClass[]
    amountOfBreaks: number
    ratio: number

    setLogged: (logged: boolean) => void
    setOnboarded: (onboarded: boolean) => void
    setSession: (sessions: ISessionClass[]) => void
    sessionSplit: () => void
    setAmountOfBreaks: (val: number) => void
    setRatio: (val: number) => void
}

const useUserStore = create<IUserStore>()(
    persist(
        (set, get) => ({
            logged: false,
            onboarded: false,
            sessionHistory: [],
            amountOfBreaks: 3,
            ratio: 0.5,

            setLogged: (logged) => set({ logged }),
            setOnboarded: (onboarded) => set({ onboarded }),
            setSession: (sessions) => set({ sessionHistory: sessions }),
            setAmountOfBreaks: (val) => set({ amountOfBreaks: val }),
            setRatio: (val) => set({ ratio: val }),

            sessionSplit: () => {
                const state = get()
                const sessions = [...state.sessionHistory]
                const lastSession = sessions.at(-1)

                if (lastSession) {
                    const splits = [...lastSession.splits]
                    const lastSplit = splits.at(-1)

                    const now = Date.now()

                    if (lastSplit && !lastSplit.endTime) {
                        lastSplit.setEndTime(now)
                    }

                    if (lastSplit?.type === "big-break") {
                        sessions.push(new Session(state.amountOfBreaks, state.ratio))
                    } else {
                        const workCount = splits.filter((s) => s.type === "work").length

                        if (workCount <= lastSession.amountOfBreaks) {
                            if (lastSplit?.type === "work") {
                                splits.push(
                                    new Split(
                                        now,
                                        "break",
                                        now + (lastSplit.endTime! - lastSplit.startTime) * state.ratio,
                                    ),
                                )
                            } else {
                                splits.push(new Split(now, "work"))
                            }
                        } else {
                            const endTime = now + (lastSplit!.endTime! - lastSplit!.startTime) * state.ratio * 1.5
                            splits.push(new Split(now, "big-break", endTime))
                        }

                        lastSession.splits = splits
                    }
                } else {
                    sessions.push(new Session(state.amountOfBreaks, state.ratio))
                }

                set({ sessionHistory: sessions })
            },
        }),
        { name: "user-store" },
    ),
)

export default useUserStore
