"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/SearchBar"
import { RefreshCw } from "lucide-react"
import { HeadlineSection } from "@/components/HeadlineSection"
import DynamicBlogGrid from "@/components/DynamicBlogGrid"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
    const [isSyncing, setIsSyncing] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [searchQuery])

    const handleRefresh = async () => {
        setIsSyncing(true)
        try {
            await fetch('/api/sync')
            setRefreshKey(prev => prev + 1)
        } catch (error) {
            console.error("Failed to trigger RSS sync:", error)
        } finally {
            setIsSyncing(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col text-foreground transition-colors duration-300 bg-background">
            <HeadlineSection />

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8 relative z-10">
                {/* Header Area - Functional Nav */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div className="flex-1 w-full md:max-w-xl mx-auto z-10 flex items-center gap-2">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        <button
                            onClick={handleRefresh}
                            disabled={isSyncing}
                            className="p-3 rounded-xl bg-secondary/80 hover:bg-secondary transition-colors border border-border/50 text-muted-foreground hover:text-foreground disabled:opacity-50"
                            title="Refresh Blogs"
                        >
                            <RefreshCw className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                <DynamicBlogGrid key={refreshKey} searchQuery={debouncedSearchQuery} />
            </div>
        </div>
    )
}


