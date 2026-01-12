'use client'

import { useState, useTransition } from 'react'
import { BlogPost } from '@/lib/blogData'
import Editor from '@/components/Editor'
import { updateBlog } from './actions'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BlogEditorForm({ post }: { post: BlogPost }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const handleSave = () => {
        if (!post.guid) {
            setMessage({ text: 'Error: Post ID not found', type: 'error' })
            return
        }

        setMessage(null)
        startTransition(async () => {
            try {
                await updateBlog(post.guid!, {
                    title,
                    content
                })
                setMessage({ text: 'Blog post updated successfully!', type: 'success' })
                router.push('/admin/dashboard')
            } catch (error) {
                setMessage({ text: 'Failed to update blog post.', type: 'error' })
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between sticky top-4 z-50 bg-background/95 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <h1 className="text-xl font-bold truncate max-w-[300px] md:max-w-md">
                        {title || 'Untitled Post'}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-muted-foreground px-0"
                        placeholder="Enter post title..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Content</label>
                    <Editor content={content} onChange={setContent} />
                </div>
            </div>
        </div>
    )
}
