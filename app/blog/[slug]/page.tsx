"use client";

import { blogPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-8 bg-background text-foreground transition-colors duration-300">
            <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
            </Link>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <header className="flex flex-col gap-6 mb-12">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {post.author.avatar && (
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-10 h-10 rounded-full object-cover border border-border"
                                />
                            )}
                            <span className="font-medium text-foreground">{post.author.name}</span>
                        </div>
                        <span>•</span>
                        <time>{post.date}</time>
                        <span>•</span>
                        <span>{post.readTime} read</span>
                    </div>

                    {post.imageUrl && (
                        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mt-6 border border-border shadow-2xl">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div className="leading-relaxed text-lg text-muted-foreground">
                    <p className="mb-6 font-medium text-foreground text-xl border-l-4 border-primary pl-6 italic">
                        {post.excerpt}
                    </p>
                    {/* Render actual content here. For now we use the dummy 'content' field */}
                    <p>{post.content}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2>The Magic of Bento</h2>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </article>
        </div>
    );
}
