import { useNavigate } from "react-router"
import useClockStore from "../../entities/clock/clock.modal"

const TabBar = () => {
    const navigate = useNavigate()
    const { currentTime } = useClockStore()
    return (
        <div className="tab-bar">
            <button onClick={() => navigate("/")}>Main</button>
            <button onClick={() => navigate("/settings")}>Settings</button>
            {currentTime}
        </div>
    )
}

export default TabBar
