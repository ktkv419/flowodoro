import { Outlet, useNavigate } from "react-router"
import TabBar from "../../shared/ui/TabBar"
import useUserStore from "../../entities/user/user.modal"
import { useEffect } from "react"

const Main = () => {
    // const { userId, isOffline } = useUserStore()

    const navigate = useNavigate()

    useEffect(() => {
        // if (!userId || isOffline) {
        //     navigate("/login")
        // }
    }, [])

    return (
        <div className="main">
            <Outlet />
            <TabBar />
        </div>
    )
}

export default Main
