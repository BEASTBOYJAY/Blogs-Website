"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-xl mx-auto group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search topics, tags, or articles..."
                className="w-full h-14 pl-12 pr-6 rounded-full bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary ring-0 shadow-sm focus:shadow-lg transition-all text-slate-900 dark:text-white placeholder-slate-400 outline-none text-lg"
            />
        </div>
    )
}
