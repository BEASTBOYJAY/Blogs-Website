"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlobalSpotlight } from "./GlobalSpotlight";
import './MagicBento.css';

const MOBILE_BREAKPOINT = 768;

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

interface BentoGridProps {
    className?: string;
    children?: React.ReactNode;
    enableSpotlight?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}

export const BentoGrid = ({
    className,
    children,
    enableSpotlight = true,
    spotlightRadius,
    glowColor
}: BentoGridProps) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();

    return (
        <>
            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={isMobile}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}
            <div
                ref={gridRef}
                className={cn("card-grid bento-section", className)}
            >
                {children}
            </div>
        </>
    );
};
