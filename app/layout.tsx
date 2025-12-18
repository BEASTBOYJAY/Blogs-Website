import type { Metadata } from "next";
import { Noto_Sans, Spline_Sans } from "next/font/google"; // Corrected font import
import "./globals.css";
import { Providers } from "./providers";

// Using Noto Sans for body and Spline Sans for display as per placeholder preference
const notoSans = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-noto-sans",
});

const splineSans = Spline_Sans({
    subsets: ["latin"],
    variable: "--font-spline-sans",
});

export const metadata: Metadata = {
    title: "BentoBlog",
    description: "Curated insights on design, technology, and modern living.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`${notoSans.variable} ${splineSans.variable} font-body bg-background text-foreground antialiased`}
            >
                <Providers>
                    <div className="relative flex flex-col min-h-screen">
                        {/* Header will be part of page content or component if needed, but per requirements "No navbar on main blog listing page", but placeholder DOES have a header. 
                 However, user requirement says: "No navbar on the main blog listing page". 
                 But placeholder has a header. 
                 I will stick to the USER REQUIREMENT "No navbar on the main blog listing page" but maybe include the search bar there?
                 Actually, looking at "Centered search bar at the top", maybe that's what replaces the navbar.
                 I will keep layout clean.
             */}
                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
