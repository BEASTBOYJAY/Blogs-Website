"use client"

import { useState } from "react"
import AdminBlogCard from "./AdminBlogCard"
import { SearchBar } from "@/components/SearchBar"
import { BlogPost } from "@/lib/blogData"

interface AdminDashboardContentProps {
    initialPosts: BlogPost[]
}

export default function AdminDashboardContent({ initialPosts }: AdminDashboardContentProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = initialPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center justify-center text-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Beast Blog Editor</h1>
                    <div className="text-sm text-muted-foreground">
                        Manage your content • {initialPosts.length} posts
                    </div>
                </div>

                <div className="w-full max-w-md">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 border rounded-lg bg-card/50 border-dashed">
                    <p className="text-muted-foreground">No blog posts found matching your search.</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {filteredPosts.map((post) => (
                        <AdminBlogCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}
