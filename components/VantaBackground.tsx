"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
    interface Window {
        VANTA: any;
    }
}

export default function VantaBackground() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        if (!isScriptLoaded) return;

        // Access VANTA safely
        if (!window.VANTA) return;

        try {
            const effect = window.VANTA.TOPOLOGY({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: true,
                minHeight: 1000.00,
                minWidth: 1000.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x89964e, // Olive
                backgroundColor: 0x051d1d // Deep Teal
            });

            return () => {
                if (effect) effect.destroy();
            };
        } catch (error) {
            console.error("Failed to initialize Vanta:", error);
        }
    }, [isScriptLoaded]);

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
                strategy="afterInteractive"
                onLoad={() => setIsScriptLoaded(true)}
            />
            <div
                ref={vantaRef}
                className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
                style={{
                    position: "fixed",
                    zIndex: -10, // Vanta at the very back
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }}
            />
            {/* Haze Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[-5]"
                style={{
                    backgroundColor: 'rgba(5, 29, 29, 0.4)', // Slightly transparent Deep Teal
                    backdropFilter: 'blur(1px)',
                    WebkitBackdropFilter: 'blur(1px)', // Safari support
                }}
            />
        </>
    );
}
