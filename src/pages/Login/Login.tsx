import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../../shared/ui/Button/Button"
import Input from "../../shared/ui/Input/Input"
import useUserStore from "../../entities/user/user.model"
import { useNavigate } from "react-router"
import { URLs } from "../../shared/router/router.config"

interface ILoginInputs {
    login: string
    password: string
}

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILoginInputs>()

    const navigate = useNavigate()

    const { setIsLoggedIn } = useUserStore()

    const onLogin: SubmitHandler<ILoginInputs> = (data) => {
        console.log(data)
    }

    const onOfflineLogin = () => {
        setIsLoggedIn(true)
        navigate(URLs.main)
    }

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    // }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onLogin)}>
                <Input label="login" {...register("login", { required: true })} />
                <Input label="password" type="password" {...register("password", { required: true })} />
                <Button type="submit">Log in</Button>
            </form>

            <Button onClick={onOfflineLogin}>Stay offline</Button>
        </div>
    )
}

export default Login
