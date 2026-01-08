import { NextResponse } from 'next/server';
import { fetchAndStore } from '../../../scripts/sync-rss';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await fetchAndStore();

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Sync executed successfully',
            output: `Inserted: ${result.inserted}, Skipped: ${result.skipped}`
        });

    } catch (error: any) {
        console.error("Sync API error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
