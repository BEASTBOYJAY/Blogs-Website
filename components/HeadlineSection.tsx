"use client";

import React from "react";
import Link from "next/link";
import PixelBlast from "./PixelBlast";
import StarBorder from "./StarBorder";

export const HeadlineSection = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
            <PixelBlast
                variant="diamond"
                color="#cfd2d6"
                pixelSize={4}
                enableRipples={true}
                className="absolute inset-0 w-full h-full"
                transparent={false}
                style={{}}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-4">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference mb-6 text-center">
                    BeastBlogs
                </h1>
                <p className="text-2xl md:text-3xl text-white/80 font-light tracking-wide text-center max-w-lg px-4 mix-blend-difference">
                    Discover New Perspectives
                </p>

                <div className="mt-8 pointer-events-auto">
                    <StarBorder as={Link as any} href="https://jaysinha.dev" className="text-white text-lg px-8 py-2">
                        About Me !
                    </StarBorder>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-none">
                <span className="material-symbols-outlined text-white/50 text-4xl">keyboard_arrow_down</span>
            </div>
        </section>
    );
};
