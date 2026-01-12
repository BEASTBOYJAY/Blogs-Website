
import { logout } from '../actions'
import Link from 'next/link'
import { LayoutDashboard, LogOut } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b bg-muted/20">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
                        <LayoutDashboard className="w-5 h-5" />
                        Beast Master
                    </Link>

                    <form action={logout}>
                        <button type="submit" className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-red-500" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </header>
            <main className="container mx-auto py-8">
                {children}
            </main>
        </div>
    )
}
