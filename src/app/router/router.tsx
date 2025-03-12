import { createBrowserRouter } from "react-router-dom"
import Stopwatch from "../../pages/Stopwatch/Stopwatch"
import Login from "../../pages/Login/Login"
import Main from "../../pages/Main/Main"
import Settings from "../../pages/Settings/Settings"
import { URLs } from "../../shared/router/router.config"

const router = createBrowserRouter([
    {
        path: URLs.main,
        element: <Main />,
        children: [
            { path: URLs.stopwatch, element: <Stopwatch /> },
            { path: URLs.settings, element: <Settings /> },
        ],
    },
    {
        path: URLs.login,
        element: <Login />,
    },
])

export default router
