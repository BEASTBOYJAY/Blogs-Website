"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);


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
                        const container = e.currentTarget.parentElement?.parentElement;
                        const codeElement = container?.querySelector("code") || container?.querySelector("pre");

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

                <pre className={`m-0 font-mono text-sm leading-relaxed ${className || ""}`}>
                    {children}
                </pre>
            </div>
        </div>
    );
}
