import { Switch } from "@/shared/ui/switch"
import { useTheme } from "@/app/theme/themeProvider"

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()

    return (
        <Switch
            onCheckedChange={(e) => {
                setTheme(e ? "light" : "dark")
            }}
            checked={theme === "light"}
        />
    )
}
