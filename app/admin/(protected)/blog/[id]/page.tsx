
import { getBlogPostBySlug } from '@/lib/blogService'
import { notFound } from 'next/navigation'
import BlogEditorForm from './BlogEditorForm'

export const dynamic = 'force-dynamic'

export default async function BlogEditorPage({ params }: { params: { id: string } }) {
    // Ideally we fetch by GUID, but our routing uses the slug (ID part).
    // getBlogPostBySlug handles this.
    const post = await getBlogPostBySlug(params.id, true)

    if (!post) {
        notFound()
    }

    return <BlogEditorForm post={post} />
}
