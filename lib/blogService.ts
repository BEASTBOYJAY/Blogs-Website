
import { supabase } from './supabaseClient';
import { BlogPost } from './blogData';

// Define the shape of the database response
interface DatabasePost {
    guid: string;
    title: string;
    description?: string;
    content?: string;
    categories?: string[];
    pub_date?: string;
    thumbnail_url?: string;
}

const mapDbPostToBlogPost = (post: DatabasePost): BlogPost => {
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
        featured: false, // Default
        guid: post.guid
    };
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('guid, title, description, content, categories, pub_date, thumbnail_url')
        .eq('is_visible', true)
        .order('pub_date', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return (data || []).map(mapDbPostToBlogPost);
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('guid, title, description, content, categories, pub_date, thumbnail_url, is_visible')
        .order('pub_date', { ascending: false });

    if (error) {
        console.error('Error fetching all blog posts:', error);
        return [];
    }

    return (data || []).map(post => ({
        ...mapDbPostToBlogPost(post),
        isVisible: post.is_visible // Add this property to BlogPost interface if needed, or handle locally.
    }));
};

export const getBlogPostBySlug = async (slug: string, includeHidden: boolean = false): Promise<BlogPost | null> => {
    // Since we only have the ID part of the GUID URL, we search for GUIDs ending with this ID
    let query = supabase
        .from('blog_posts')
        .select('guid, title, description, content, categories, pub_date, thumbnail_url')
        .ilike('guid', `%${slug}`);

    if (!includeHidden) {
        query = query.eq('is_visible', true);
    }

    const { data, error } = await query.single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
        console.error('Error fetching blog post by slug:', error);
    }

    if (!data) {
        return null;
    }

    return mapDbPostToBlogPost(data);
};
