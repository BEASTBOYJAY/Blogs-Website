"use client";

import React from "react";
import Link from "next/link";
import PixelCard from "./PixelCard";
import { BlogPost } from "@/lib/blogData";
import { cn } from "@/lib/utils";

interface PixelBlogCardProps {
    post: BlogPost;
    className?: string; // For grid positioning classes
}

export default function PixelBlogCard({ post, className }: PixelBlogCardProps) {
    return (
        <div className={cn("relative group h-full w-full min-h-[250px]", className)}>
            <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                <PixelCard
                    className="h-full w-full border border-white/10 group-hover:border-zinc-300 group-hover:shadow-[0_0_30px_-5px_rgba(212,212,216,0.6)] transition-all duration-300 bg-black/50 overflow-hidden relative"
                    variant="default"
                    colors="#27272a,#52525b,#a1a1aa"
                >
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                        <div className="flex justify-between items-start">
                            <div className="font-bold text-lg text-white/90 px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm border border-white/5">
                                {post.tags[0]}
                            </div>
                            {post.author.avatar && (
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                                />
                            )}
                        </div>

                        <div className="mt-auto bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 -mx-6 -mb-6">
                            <h2 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-300 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 font-mono uppercase tracking-wider">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime} read</span>
                            </div>
                        </div>
                    </div>
                </PixelCard>
            </Link>
        </div>
    );
}
