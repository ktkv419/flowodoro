import useUserStore from "../../entities/user/user.model"
import Button from "../../shared/ui/Button/Button"

const Settings = () => {
    const { setIsLoggedIn } = useUserStore()
    const onLogout = () => {
        setIsLoggedIn(false)
    }

    return (
        <div className="settings">
            <h1>Settings</h1>
            <Button onClick={onLogout}>Log out</Button>
        </div>
    )
}

export default Settings
