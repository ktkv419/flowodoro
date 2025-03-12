import { Button } from "@/shared/ui/button"
import useUserStore from "../../entities/user/user.model"
import { ThemeSwitcher } from "@/widget/ThemeSwitcher/ThemeSwitcher"
import { useNavigate } from "react-router"
import { URLs } from "@/shared/router/router.config"

const Settings = () => {
    const navigate = useNavigate()

    const { setLogged, setOnboarded } = useUserStore()

    const onLogout = () => {
        setLogged(false)
    }
    
    const onClear = () => {
        setOnboarded(false)
        setLogged(false)
    }

    return (
        <div className="settings">
            <h1>Settings</h1>
            <ThemeSwitcher />
            <Button onClick={onLogout} variant={"outline"}>Log out</Button>
            <Button onClick={onClear} variant={"outline"}>Clear</Button>
            <Button className="w-full">Save</Button>
        </div>
    )
}

export default Settings
