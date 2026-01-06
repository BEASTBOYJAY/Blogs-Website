import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const isWindows = process.platform === 'win32';
    const pythonExecutable = isWindows ? 'Scripts/python.exe' : 'bin/python';

    const pythonPath = path.join(process.cwd(), 'scripts', 'venv', pythonExecutable);
    const scriptPath = path.join(process.cwd(), 'scripts', 'fetch_medium_rss.py');

    return new Promise((resolve) => {
        exec(`"${pythonPath}" "${scriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                resolve(NextResponse.json({
                    success: false,
                    error: error.message,
                    stderr: stderr
                }, { status: 500 }));
                return;
            }

            resolve(NextResponse.json({
                success: true,
                message: 'Sync executed successfully',
                output: stdout
            }));
        });
    });
}
