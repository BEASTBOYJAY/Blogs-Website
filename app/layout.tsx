import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
    title: "BeastBlog",
    description: "Curated insights on design, technology, AI, and modern living.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            "name": "BeastBlog",
                            "url": "https://blogs.jaysinha.dev",
                            "description": "Curated insights on design, technology, AI, and modern living.",
                            "author": {
                                "@type": "Person",
                                "name": "Jay Sinha",
                                "alternateName": "Beast Boy Jay",
                                "url": "https://jaysinha.dev",
                                "sameAs": [
                                    "https://jaysinha.dev",
                                    "https://github.com/beastboyjay",
                                    "https://x.com/BEAST_BOY_JAY",
                                    "https://medium.com/@beastboyjay"
                                ]
                            }
                        })
                    }}
                />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased`}
            >
                <Providers>
                    <div className="relative flex flex-col min-h-screen">
                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
