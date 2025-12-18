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
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    useEffect(() => {
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const initVanta = () => {
        if (!vantaEffect && window.VANTA && vantaRef.current) {
            const effect = window.VANTA.TOPOLOGY({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x89964e,
                backgroundColor: 0x051d1d
            });
            setVantaEffect(effect);
        }
    };

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
                strategy="afterInteractive"
                onLoad={initVanta}
            />
            <div
                ref={vantaRef}
                className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
                style={{
                    position: "fixed",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }}
            />
        </>
    );
}
