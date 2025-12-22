import { getBlogPostBySlug } from "@/lib/blogService";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogPostBySlug(params.slug);

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
                        <div className="mt-6 border border-border shadow-2xl rounded-[2rem] overflow-hidden">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={1200}
                                height={630}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div className="leading-relaxed text-lg text-muted-foreground">
                    <p className="mb-6 font-medium text-foreground text-xl border-l-4 border-primary pl-6 italic">
                        {post.excerpt}
                    </p>
                    <p>{post.content}</p>
                </div>
            </article>
        </div>
    );
}
