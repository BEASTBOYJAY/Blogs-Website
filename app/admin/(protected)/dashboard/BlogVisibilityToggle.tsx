'use client'

import { toggleVisibility } from './actions'
import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

export default function BlogVisibilityToggle({
    guid,
    initialIsVisible
}: {
    guid: string,
    initialIsVisible: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const [isVisible, setIsVisible] = useState(initialIsVisible)

    const handleToggle = async () => {
        // Optimistic update
        const newState = !isVisible
        setIsVisible(newState)

        startTransition(async () => {
            try {
                await toggleVisibility(guid, isVisible)
            } catch (error) {
                // Revert on error
                setIsVisible(!newState)
                console.error("Failed to update visibility", error)
            }
        })
    }

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`
                relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${isVisible ? 'bg-primary' : 'bg-input'}
            `}
        >
            <span className="sr-only">Toggle visibility</span>
            <span
                className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out
                    ${isVisible ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
            {isPending && (
                <span className="absolute right-[-24px] top-0.5">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </span>
            )}
        </button>
    )
}
