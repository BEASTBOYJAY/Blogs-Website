"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed">
                <span className="sr-only">Toggle theme</span>
                <div className="w-5 h-5" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-800 hover:border-primary/50 text-slate-700 dark:text-slate-200 hover:text-primary transition-all"
        >
            <span className="sr-only">Toggle theme</span>
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    )
}
