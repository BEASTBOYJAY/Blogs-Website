import { getBlogPostBySlug } from "@/lib/blogService";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import CodeBlock from "@/components/CodeBlock";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-8 bg-background text-foreground transition-colors duration-300">
            <Link
                href="/"
                className="sticky top-4 z-50 self-start flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 group bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
            </Link>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <header className="flex flex-col gap-6 mb-12">

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        {post.title}
                    </h1>
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

                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {post.author.avatar && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                            )}
                            <span className="font-medium text-foreground">{post.author.name}</span>
                        </div>
                        <span>•</span>
                        <time>{post.date}</time>
                        <span>•</span>
                        <span>{post.readTime} read</span>
                    </div>

                </header>

                <div className="leading-relaxed text-lg text-muted-foreground parse-content">
                    {parse(post.content, {
                        replace: (domNode) => {
                            if (domNode instanceof Element && domNode.name === 'pre') {
                                return (
                                    <CodeBlock>
                                        {domToReact(domNode.children as DOMNode[])}
                                    </CodeBlock>
                                );
                            }
                        }
                    })}
                </div>
            </article>
        </div>
    );
}
