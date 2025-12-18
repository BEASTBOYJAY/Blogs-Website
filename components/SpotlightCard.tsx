"use client"

import { useRef, useState, MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.15)", // Default spotlight color
}: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Tilt State
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)

        // Tilt Logic
        const x = clientX - left
        const y = clientY - top
        const centerX = width / 2
        const centerY = height / 2

        // Max rotation in degrees
        const maxRotation = 10

        // Calculate rotation (-max to +max)
        const rotateXValue = ((y - centerY) / centerY) * -maxRotation // Invert Y for tilt
        const rotateYValue = ((x - centerX) / centerX) * maxRotation

        setRotateX(rotateXValue)
        setRotateY(rotateYValue)
    }

    function onMouseLeave() {
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <motion.div
            className={`group relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark overflow-hidden rounded-[2rem] ${className}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                // Apply tilt
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.1s ease-out" // smooth return
            }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </motion.div>
    )
}
