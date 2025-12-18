"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"

import { HeadlineSection } from "@/components/HeadlineSection"
import { blogPosts, BlogPost } from "@/lib/blogData"
import { BentoGrid } from "@/components/BentoGrid"
import { BentoCard } from "@/components/BentoCard"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const getGridStyle = (size: BlogPost['size']) => {
        const style: React.CSSProperties = {};
        if (size === 'wide') {
            style.gridColumn = 'span 2';
        } else if (size === 'tall') {
            style.gridRow = 'span 2';
        } else if (size === 'large') {
            style.gridColumn = 'span 2';
            style.gridRow = 'span 2';
        }
        return style;
    };

    return (
        <div className="min-h-screen flex flex-col text-foreground transition-colors duration-300 bg-background">
            <HeadlineSection />

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8 relative z-10">
                {/* Header Area - Functional Nav */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center text-primary rounded-full bg-primary/10">
                            <span className="material-symbols-outlined text-2xl">grid_view</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Latest Posts</h2>
                    </div>

                    <div className="flex-1 w-full md:max-w-xl mx-auto z-10">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                </div>

                {/* Magic Bento Grid */}
                <div className="w-full">
                    <BentoGrid glowColor="207, 210, 214">
                        {filteredPosts.map((post) => (
                            <BentoCard
                                key={post.slug}
                                slug={post.slug}
                                title={post.title}
                                description={post.excerpt}
                                label={post.tags[0]}
                                img={post.author.avatar}
                                style={getGridStyle(post.size)}
                                glowColor="207, 210, 214"
                            />
                        ))}
                    </BentoGrid>
                </div>
            </div>
        </div>
    )
}
