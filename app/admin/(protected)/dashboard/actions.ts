'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function toggleVisibility(guid: string, currentStatus: boolean) {
    const supabase = createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        throw new Error('Unauthorized')
    }

    // Use Service Role key to bypass RLS if available, otherwise fall back to authenticated client
    // Note: We use the raw supabase-js client for the admin operation to avoid cookie handling issues with service role
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const dbClient = serviceRoleKey
        ? createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey)
        : supabase

    console.log(`[toggleVisibility] Toggling ${guid} from ${currentStatus} to ${!currentStatus}`)

    const { error } = await dbClient
        .from('blog_posts')
        .update({ is_visible: !currentStatus })
        .eq('guid', guid)

    if (error) {
        console.error('[toggleVisibility] Error:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/dashboard')
    revalidatePath('/')
    const slug = guid.split('/').pop() || guid
    revalidatePath(`/blog/${slug}`)
}
