import { URLs } from "@/shared/router/router.config"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/progress"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useUserStore from "@/entities/user/user.model"
import Wave from "@/widget/Wave/Wave"

const maxStage = 4

const Onboarding = () => {
    const navigate = useNavigate()
    const { setOnboarded } = useUserStore()

    const [stage, setStage] = useState(1)

    useEffect(() => {
        if (stage === maxStage + 1) {
            setOnboarded(true)
            navigate(URLs.login)
        }
    }, [stage])

    return (
        <div className="onboarding h-full">
            <Progress className="rounded-none" value={(100 / maxStage) * (stage - 1)} />
            {stage === 1 && <div className="onboarding onboarding--1">This is stage 1</div>}
            {stage === 2 && <div className="onboarding onboarding--2">This is stage 2</div>}
            {stage === 3 && <div className="onboarding onboarding--3">This is stage 3</div>}
            {stage === 4 && <div className="onboarding onboarding--4">This is stage 4</div>}
            <Button variant={"outline"} onClick={() => setStage((val) => val + 1)} className="mt-auto w-full">
                Okay
            </Button>

            <Wave className="absolute bottom-0 left-0 w-screen bg-transparent" amount={stage - 1} />
        </div>
    )
}

export default Onboarding
