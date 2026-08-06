'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function updateBlog(guid: string, data: { title: string, content: string, isVisible?: boolean }) {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        throw new Error('Unauthorized')
    }

    // Admin client for update
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const dbClient = serviceRoleKey
        ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey)
        : supabase

    const updates: any = {
        title: data.title,
        content: data.content,
        // updated_at: new Date().toISOString(), // Optional: if you want to track edit time
    }

    if (data.isVisible !== undefined) {
        updates.is_visible = data.isVisible
    }

    const { error } = await dbClient
        .from('blog_posts')
        .update(updates)
        .eq('guid', guid)

    if (error) {
        console.error('[updateBlog] Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/dashboard')
    revalidatePath('/')
    // We can't easily revalidate the specific blog page by SLUG here without knowing the slug logic again or if slug changed (though we are not changing slug).
    // The slug is derived from guid, so it is static.
    const slug = guid.split('/').pop() || guid
    revalidatePath(`/blog/${slug}`)
    revalidatePath(`/admin/blog/${slug}`) // Assuming slug is the ID used in the route params
}
