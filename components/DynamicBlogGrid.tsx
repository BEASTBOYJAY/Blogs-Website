"use client";

import React, { useMemo } from "react";
import { BlogPost } from "@/lib/blogData";
import { getBlogPosts } from "@/lib/blogService";
import PixelBlogCard from "./PixelBlogCard";
import { getGridLayout } from "@/utils/layoutStrategy";

interface DynamicBlogGridProps {
    maxPosts?: number;
    searchQuery?: string;
}

export default function DynamicBlogGrid({ maxPosts, searchQuery = "" }: DynamicBlogGridProps) {
    const [posts, setPosts] = React.useState<BlogPost[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getBlogPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    // 1. Filter posts
    const filteredPosts = useMemo(() => {
        if (loading) return [];
        let p = posts;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            p = p.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        return p;
    }, [searchQuery, posts, loading]);

    // 2. Slice based on maxPosts
    const displayPosts = useMemo(() => {
        return filteredPosts.slice(0, maxPosts);
    }, [filteredPosts, maxPosts]);

    // 3. Render
    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gray-500">
                Loading posts...
            </div>
        );
    }

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
