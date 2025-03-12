export type TRoutes = "settings" | "timer" | "history" | "login" | "onboarding" | "main"

export const URLs: Record<TRoutes, string> = {
    login: "/login",
    main: "/",
    timer: "",
    settings: "settings",
    onboarding: "/onboarding",
    history: "history"
}
