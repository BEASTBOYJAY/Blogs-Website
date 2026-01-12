import { getAllBlogPosts } from '@/lib/blogService'
import AdminDashboardContent from './AdminDashboardContent'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const posts = await getAllBlogPosts()

    return <AdminDashboardContent initialPosts={posts} />
}
