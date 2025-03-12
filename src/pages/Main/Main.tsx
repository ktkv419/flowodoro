import { Outlet, useNavigate } from "react-router"
import TabBar from "../../shared/ui/TabBar/TabBar"
import useUserStore from "../../entities/user/user.model"
import { useEffect } from "react"
import { URLs } from "../../shared/router/router.config"

const Main = () => {
    const { logged } = useUserStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (logged === false) {
            navigate(URLs.login)
        }
    }, [logged])

    return (
        <div className="main h-full relative p-4">
            <Outlet />
            <TabBar />
        </div>
    )
}

export default Main
