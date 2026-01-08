import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

if (!process.env.SUPABASE_URL) {
    const envLocalPath = path.resolve(process.cwd(), '.env.local');
    const envPath = path.resolve(process.cwd(), '.env');
    dotenv.config({ path: envLocalPath });
    dotenv.config({ path: envPath });
}

const IMG_REGEX = /<img[^>]+src="([^">]+)"/;

function getMediumThumbnail(description: string): string {
    if (!description) return "";
    const match = description.match(IMG_REGEX);
    return match ? match[1] : "";
}

interface RssItem {
    guid: string;
    title: string;
    link: string;
    pubDate: string; // "2024-01-01 12:00:00"
    description: string;
    content: string;
    categories: string[];
    [key: string]: any;
}

export async function fetchAndStore() {
    console.log("Starting Medium RSS fetch...");

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const MEDIUM_URL = process.env.MEDIUM_URL;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !MEDIUM_URL) {
        throw new Error("Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or MEDIUM_URL");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    try {
        const response = await fetch(MEDIUM_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }

        const rawData = await response.json();
        const items: RssItem[] = rawData.items || [];

        if (items.length === 0) {
            console.log("No items found in RSS feed.");
            return { success: true, inserted: 0, skipped: 0, total: 0 };
        }

        console.log(`Parsed JSON response... items_count=${items.length}`);

        const feedGuids = items.map(item => item.guid).filter(Boolean);

        if (feedGuids.length === 0) {
            console.log("No valid GUIDs found in feed items.");
            return { success: true, inserted: 0, skipped: 0, total: items.length };
        }

        // Check for existing GUIDs
        const { data: existingData, error: selectError } = await supabase
            .from('blog_posts')
            .select('guid')
            .in('guid', feedGuids);

        if (selectError) {
            throw new Error(`Supabase select error: ${selectError.message}`);
        }

        const existingGuids = new Set((existingData || []).map((row: any) => row.guid));
        const newPostsToInsert = [];

        for (const item of items) {
            const guid = item.guid;
            if (!guid || existingGuids.has(guid)) {
                continue;
            }

            newPostsToInsert.push({
                guid: guid,
                title: item.title,
                post_link: item.link,
                pub_date: item.pubDate,
                thumbnail_url: getMediumThumbnail(item.description),
                description: item.description,
                content: item.content,
                categories: item.categories || [],
                is_visible: true
            });
        }

        const skippedCount = items.length - newPostsToInsert.length;
        let insertedCount = 0;

        if (newPostsToInsert.length > 0) {
            const { data: insertData, error: insertError } = await supabase
                .from('blog_posts')
                .insert(newPostsToInsert)
                .select();

            if (insertError) {
                throw new Error(`Supabase insert error: ${insertError.message}`);
            }
            insertedCount = insertData ? insertData.length : 0;
            console.log(`Batch insert complete. Added ${insertedCount} new posts.`);
        } else {
            console.log("No new posts to insert.");
        }

        console.log("Sync complete.", { inserted: insertedCount, skipped: skippedCount, total: items.length });

        return {
            success: true,
            inserted: insertedCount,
            skipped: skippedCount,
            total: items.length
        };

    } catch (error: any) {
        console.error("Error during sync:", error);
        return {
            success: false,
            error: error.message
        };
    }
}

if (require.main === module) {
    fetchAndStore()
        .then((result) => {
            if (!result.success) {
                process.exit(1);
            }
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}
