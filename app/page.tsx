"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { AboutMeLink } from "@/components/AboutMeLink"
import { blogPosts, BlogPost } from "@/lib/blogData"
import { BentoGrid } from "@/components/BentoGrid"
import { BentoCard } from "@/components/BentoCard"
import VantaBackground from "@/components/VantaBackground" // Import Vanta
import { useRouter } from "next/navigation"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const getGridStyle = (size: BlogPost['size']) => {
        const style: React.CSSProperties = {};
        if (size === 'large') {
            style.gridColumn = 'span 2';
            style.gridRow = 'span 2';
        } else if (size === 'wide' || size === 'medium') {
            style.gridColumn = 'span 2';
        } else if (size === 'tall') {
            style.gridRow = 'span 2';
        }
        return style;
    };

    return (
        <div className="min-h-screen py-8 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col gap-8 text-foreground transition-colors duration-300 relative z-10">
            <VantaBackground />
            {/* Header Area */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center text-primary rounded-full bg-primary/10">
                        <span className="material-symbols-outlined text-2xl">grid_view</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">BentoBlog</h1>
                </div>

                <div className="flex-1 w-full md:max-w-xl mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                <div className="flex items-center gap-4 justify-end">
                    <AboutMeLink />
                    <ThemeToggle />
                </div>
            </header>

            {/* Hero */}
            <div className="flex flex-col items-start gap-2 pt-8 pb-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight">
                    Discover New <span className="text-[#89964e] underline decoration-4 underline-offset-4">Perspectives</span>
                </h2>
            </div>

            {/* Magic Bento Grid */}
            <div className="w-full">
                <BentoGrid glowColor="137, 150, 78">
                    {filteredPosts.map((post) => (
                        <BentoCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.title}
                            description={post.excerpt}
                            label={post.tags[0]}
                            img={post.author.avatar}
                            style={getGridStyle(post.size)}
                            glowColor="137, 150, 78"
                        />
                    ))}
                </BentoGrid>
            </div>
        </div>
    )
}
