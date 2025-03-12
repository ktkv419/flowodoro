import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import router from "./app/router/router.tsx"
import { ThemeProvider } from "./app/theme/themeProvider.tsx"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>,
)
