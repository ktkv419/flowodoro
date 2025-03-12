import useUserStore from "../../entities/user/user.model"
import { useNavigate } from "react-router"
import { URLs } from "../../shared/router/router.config"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useEffect } from "react"
import Wave from "@/widget/Wave/Wave"
import "./Login.css"

interface ILoginInputs {
    email: string
    password: string
}

const Login = () => {
    const navigate = useNavigate()

    const { setLogged, onboarded } = useUserStore()

    const onLogin = (data: any) => {
        console.log(data)
    }

    const onOfflineLogin = () => {
        setLogged(true)
        navigate(URLs.main)
    }

    useEffect(() => {
        if (!onboarded) navigate(URLs.onboarding)
    }, [])

    return (
        <div className="login grid h-full grid-rows-[1fr_auto_1fr] p-8">
            <div className="login__container row-end-3">
                <h1 className="login__title mb-4 text-center text-5xl font-bold">Flowodoro</h1>
                <form className="flex w-full flex-col gap-2">
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Password" type="password" />
                    <Button className="mt-4" type="submit">
                        Log in
                    </Button>
                    <Button type="submit" variant={"outline"}>
                        Sign up
                    </Button>
                    <Button type="button" variant={"ghost"} onClick={onOfflineLogin}>
                        Stay offline
                    </Button>
                </form>
                <Wave className="absolute bottom-0 left-0 w-screen bg-transparent" amount={3} />
            </div>
        </div>
    )
}

export default Login
