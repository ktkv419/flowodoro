import { useNavigate } from "react-router"
import useClockStore from "../../../entities/clock/clock.model"
import { URLs } from "../../router/router.config"

const TabBar = () => {
    const navigate = useNavigate()
    const { currentTime } = useClockStore()
    return (
        <div className="tab-bar">
            <button onClick={() => navigate(URLs.main)}>Main</button>
            <button onClick={() => navigate(URLs.settings)}>Settings</button>
            {currentTime}
        </div>
    )
}

export default TabBar
