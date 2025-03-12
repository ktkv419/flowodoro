import { Outlet, useNavigate } from "react-router"
import TabBar from "../../shared/ui/TabBar/TabBar"
import useUserStore from "../../entities/user/user.model"
import { useEffect } from "react"
import { URLs } from "../../shared/router/router.config"

const Main = () => {
    const { isLoggedIn } = useUserStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn === undefined) {
            navigate(URLs.login)
        }
    }, [isLoggedIn])

    return (
        <div className="main">
            <Outlet />
            <TabBar />
        </div>
    )
}

export default Main
