interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: "regular" | "ghost"
}

const Button = ({ btnType, children, ...props }: IButtonProps) => {
    return <button {...props}>{children}</button>
}

export default Button
