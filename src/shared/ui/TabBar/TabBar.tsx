import { useLocation, useNavigate } from "react-router"
import { Tabs, TabsList, TabsTrigger } from "../tabs"
import { TRoutes, URLs } from "@/shared/router/router.config"
import useUserStore from "@/entities/user/user.model"
import Wave from "@/widget/Wave/Wave"

interface ITab {
    name: string
}

type TTabs = Partial<Record<TRoutes, ITab>>

const tabs: TTabs = {
    [URLs.settings]: { name: "Settings" },
    [URLs.timer]: { name: "Timer" },
    [URLs.history]: { name: "History" },
}

const TabBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const {sessionHistory} = useUserStore()

    const onChange = (e: string) => {
        navigate(URLs[e as TRoutes])
    }

    return (
        <Tabs
            className="tab overflow-clip absolute inset-x-2 bottom-2"
            value={location.pathname.slice(1) || ""}
            onValueChange={onChange}
            defaultValue="main"
        >
            <TabsList className="w-full">
                {Object.entries(tabs).map(([k, v]) => (
                    <TabsTrigger className={k === "history" && sessionHistory.length === 0 ? "pointer-events-none opacity-25" : ""} key={k} value={k}>
                        {v.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            <Wave className="absolute  w-full" />
        </Tabs>
    )
}

export default TabBar
