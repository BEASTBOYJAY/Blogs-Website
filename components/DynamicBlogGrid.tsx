"use client";

import React, { useMemo } from "react";
import { BlogPost, blogPosts } from "@/lib/blogData";
import PixelBlogCard from "./PixelBlogCard";
import { getGridLayout } from "@/utils/layoutStrategy";

interface DynamicBlogGridProps {
    maxPosts?: number;
    searchQuery?: string;
}

export default function DynamicBlogGrid({ maxPosts = 7, searchQuery = "" }: DynamicBlogGridProps) {
    // 1. Filter posts
    const filteredPosts = useMemo(() => {
        let posts = blogPosts;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        // Sort by date or other criteria if needed, assuming blogPosts is already sorted or order matters
        return posts;
    }, [searchQuery]);

    // 2. Slice based on maxPosts
    const displayPosts = useMemo(() => {
        return filteredPosts.slice(0, maxPosts);
    }, [filteredPosts, maxPosts]);

    // 3. Render
    if (displayPosts.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gray-500">
                No posts found.
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
            {displayPosts.map((post, index) => {
                const layoutClass = getGridLayout(index, displayPosts.length);
                return (
                    <PixelBlogCard
                        key={post.slug}
                        post={post}
                        className={layoutClass}
                    />
                );
            })}
        </div>
    );
}
