'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '../actions'
import { Loader2, Lock, Mail } from 'lucide-react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="group relative flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-70"
        >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
        </button>
    )
}

export default function LoginForm() {
    const [state, dispatch] = useFormState(login, null)

    return (
        <form className="mt-8 space-y-6" action={dispatch}>
            <div className="space-y-4 rounded-md shadow-sm">
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border bg-transparent p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border bg-transparent p-3 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            {state?.error && (
                <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md">
                    {state.error}
                </div>
            )}

            <div>
                <SubmitButton />
            </div>
        </form>
    )
}
