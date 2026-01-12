"use client";

import React, { memo } from "react";
import Link from "next/link";

import PixelCard from "@/components/PixelCard";
import { BlogPost } from "@/lib/blogData";
import { cn } from "@/lib/utils";
import parse, { Element } from "html-react-parser";
import BlogVisibilityToggle from "./BlogVisibilityToggle";
import { Eye, EyeOff } from "lucide-react";

interface AdminBlogCardProps {
    post: BlogPost;
    className?: string;
}

const AdminBlogCard = memo(function AdminBlogCard({ post, className }: AdminBlogCardProps) {
    return (
        <div className={cn("relative group w-[330px] h-[300px]", className)}>
            <PixelCard
                className="h-full w-full border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px_var(--primary)] transition-all duration-300 bg-black/50 overflow-hidden relative"
                variant="default"
                colors="#27272a,#52525b,#a1a1aa"
            >
                {/* Main Link Overlay - z-0 to sit behind the interactive content */}
                <Link
                    href={`/admin/blog/${post.slug}`}
                    className="absolute inset-0 z-0 bg-transparent"
                    aria-label={`Edit ${post.title}`}
                />

                {/* Content Container - z-10 to sit above link, but largely non-interactive */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-between items-start relative">
                        <div className="font-bold text-lg text-white/90 px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm border border-white/5">
                            {post.tags[0] || 'Blog'}
                        </div>

                        {/* Visibility Toggle - z-50 and stop propagation to prevent link click */}
                        <div
                            className="pointer-events-auto flex items-center gap-2 bg-black/40 rounded-full backdrop-blur-sm border border-white/5 px-2 py-1 relative z-50"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            {post.isVisible ? (
                                <Eye className="w-4 h-4 text-green-500" />
                            ) : (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                            <BlogVisibilityToggle
                                guid={post.guid || post.slug}
                                initialIsVisible={!!post.isVisible}
                            />
                        </div>
                    </div>

                    <div className="mt-auto bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 -mx-6 -mb-6 pointer-events-none">
                        <h2 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                            {post.title}
                        </h2>
                        <div className="text-sm text-gray-300 line-clamp-3 mb-3">
                            {parse(post.excerpt || '', {
                                replace: (domNode) => {
                                    if (domNode instanceof Element && (domNode.name === 'img' || domNode.name === 'figure')) {
                                        return <></>;
                                    }
                                }
                            })}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 font-mono uppercase tracking-wider">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime} read</span>
                        </div>
                    </div>
                </div>
            </PixelCard>
        </div>
    );
});

export default AdminBlogCard;
