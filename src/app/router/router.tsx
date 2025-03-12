import { createBrowserRouter } from "react-router-dom"
import Stopwatch from "../../pages/Stopwatch/Stopwatch"
import Login from "../../pages/Login/Login"
import Main from "../../pages/Main/Main"
import Settings from "../../pages/Settings/Settings"
import { URLs } from "../../shared/router/router.config"
import Onboarding from "@/pages/Onboarding/Onboarding"
import History from "@/pages/History/History"

const router = createBrowserRouter([
    {
        path: URLs.main,
        element: <Main />,
        children: [
            { path: URLs.timer, element: <Stopwatch /> },
            { path: URLs.settings, element: <Settings /> },
            { path: URLs.history, element: <History /> },
        ],
    },
    {
        path: URLs.login,
        element: <Login />,
    },
    {
        path: URLs.onboarding,
        element: <Onboarding />,
    },
])

export default router
