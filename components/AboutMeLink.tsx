"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function AboutMeLink() {
    return (
        <Link
            href="https://bento.me/" // Linking to generic for now as user didn't specify URL
            target="_blank"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
        >
            <span>About Me</span>
            <ArrowUpRight className="w-4 h-4" />
        </Link>
    )
}
