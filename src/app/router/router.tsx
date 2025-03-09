import { createBrowserRouter } from "react-router-dom"
import Stopwatch from "../../pages/Stopwatch/Stopwatch"
import Login from "../../pages/Login/Login"
import Main from "../../pages/Main/Main"
import Settings from "../../pages/Settings/Settings"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "", element: <Stopwatch /> },
            { path: "settings", element: <Settings /> },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
])

export default router
