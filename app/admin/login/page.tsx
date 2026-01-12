'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import LoginForm from './LoginForm'

export default function LoginPage() {
    const vantaRef = useRef<HTMLDivElement>(null)
    const [vantaEffect, setVantaEffect] = useState<any>(null)
    const [scriptsLoaded, setScriptsLoaded] = useState(false)

    useEffect(() => {
        const loadVanta = () => {
            if (!vantaEffect && vantaRef.current && (window as any).VANTA) {
                try {
                    setVantaEffect((window as any).VANTA.TOPOLOGY({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0xe2e8e2,
                        backgroundColor: 0x121313
                    }))
                } catch (error) {
                    console.error("Vanta error:", error)
                }
            }
        }

        // Try loading immediately in case scripts are already there
        loadVanta()

        // Also depend on scriptsLoaded state for initial load
        if (scriptsLoaded) {
            loadVanta()
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [scriptsLoaded, vantaEffect])

    return (
        <div ref={vantaRef} className="flex min-h-screen items-center justify-center p-4">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
                strategy="afterInteractive"
                onLoad={() => setScriptsLoaded(true)}
            />

            <div className="w-full max-w-md space-y-8 rounded-lg border border-white/10 bg-black/30 backdrop-blur-md p-8 shadow-2xl text-card-foreground z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Sign in to manage beast blog's content
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
