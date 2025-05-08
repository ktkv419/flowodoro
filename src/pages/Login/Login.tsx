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
        <div className="login flex h-full justify-center items-center p-8">
            <div className="login__container row-end-3 w-full md:max-w-md">
                <h1 className="font-[Great_Vibes] login__title mb-4 text-center text-4xl sm:text-6xl md:text-8xl font-bold">Flowodoro</h1>
                <form className="flex w-full flex-col gap-2">
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Password" type="password" />
                    <Button className="mt-4" variant={"wave"} type="submit">
                        Log in
                    </Button>
                    <Button type="submit" variant={"outline"}>
                        Sign up
                    </Button>
                    <Button type="button" variant={"ghostWave"} onClick={onOfflineLogin}>
                        Stay offline
                    </Button>
                </form>
                <Wave className="max-h-[30dvh] opacity-50 absolute bottom-0 left-0 w-screen bg-transparent" amount={3} />
            </div>
        </div>
    )
}

export default Login
