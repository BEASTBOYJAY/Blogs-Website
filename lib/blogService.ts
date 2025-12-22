
import { supabase } from './supabaseClient';
import { BlogPost } from './blogData';

const mapDbPostToBlogPost = (post: any): BlogPost => {
    const slug = post.guid.split('/').pop() || post.guid;

    return {
        slug: slug,
        title: post.title,
        excerpt: post.description || '',
        content: post.content || '',
        tags: Array.isArray(post.categories) ? post.categories : [],
        date: post.pub_date ? new Date(post.pub_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : '',
        author: {
            name: "Team",
            avatar: ""
        },
        readTime: `${Math.ceil((post.content?.split(' ').length || 0) / 200)} min`, // Estimate read time
        imageUrl: post.thumbnail_url || '',
        featured: false // Default
    };
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_visible', true)
        .order('pub_date', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return (data || []).map(mapDbPostToBlogPost);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    // Since we only have the ID part of the GUID URL, we search for GUIDs ending with this ID
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .ilike('guid', `%${slug}`)
        .eq('is_visible', true)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
        console.error('Error fetching blog post by slug:', error);
    }

    if (!data) {
        return null;
    }

    return mapDbPostToBlogPost(data);
};
