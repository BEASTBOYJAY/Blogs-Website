"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string; // HTML parser might pass class names
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // Extract text content from children
        // "children" here comes from html-react-parser and might be a mix of strings and elements
        // The safest way to get raw text is to access the textContent of the ref,
        // but since we are wrapping, we can strip tags or try to grab text directly.
        // However, html-react-parser passes React elements.
        // A simple robust way is to create a temp element or simpler:
        // Just try to grab the string if it's simple, but for potentially complex highlighted HTML:

        // We will use a ref approach for robust text extraction if needed, 
        // but for now, let's try to extract text recursively from children if possible,
        // OR, simpler: rely on the user to click copy and we find the code element in DOM.
        // Let's use a click handler that finds the closest code block text.

        // Better User Experience:
        // We can't easily "ref" the children passed by parser without extra wrappers.
        // So we'll use an interaction-based approach:
        // When clicked, finding the text content of this component's container.
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div className="relative group my-6 overflow-hidden rounded-lg border border-border bg-zinc-950 text-zinc-50">
            <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                <button
                    onClick={(e) => {
                        // Find the code element sibling or parent
                        // This button is absolute positioned, the code is in the pre/code below.
                        const container = e.currentTarget.parentElement?.parentElement;
                        const codeElement = container?.querySelector("code");
                        if (codeElement && codeElement.textContent) {
                            copyToClipboard(codeElement.textContent);
                        }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Copy code"
                >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
            <div className="overflow-x-auto p-4">
                {/* Pass props down to the pre/code elements or wrap them. 
            Since the parser sends <pre><code>...</code></pre>, 
            we might just receive the content OF the pre if we replace validly.
            But typically we replace the PRE tag itself.
            So we should render a pre here.
        */}
                <pre className={`m-0 font-mono text-sm leading-relaxed ${className || ""}`}>
                    {children}
                </pre>
            </div>
        </div>
    );
}
