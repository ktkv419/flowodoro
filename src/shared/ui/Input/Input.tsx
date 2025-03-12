import { nanoid } from "nanoid"
import { useMemo } from "react"

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputType?: "regular" | "ghost"
    label?: string
}

const Input = ({ inputType, label, ...props }: IInputProps) => {
    const id = useMemo(() => props.id || nanoid(), [props.id])

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input id={id} className={["input__field", inputType, props.className?.split(" ")].join(" ")} {...props} />
        </div>
    )
}

export default Input
