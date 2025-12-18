"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"

import { HeadlineSection } from "@/components/HeadlineSection"

import DynamicBlogGrid from "@/components/DynamicBlogGrid"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")



    return (
        <div className="min-h-screen flex flex-col text-foreground transition-colors duration-300 bg-background">
            <HeadlineSection />

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8 relative z-10">
                {/* Header Area - Functional Nav */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div className="flex-1 w-full md:max-w-xl mx-auto z-10">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                </div>

                {/* Dynamic Blog Grid */}
                <DynamicBlogGrid maxPosts={5} searchQuery={searchQuery} />
            </div>
        </div>
    )
}
