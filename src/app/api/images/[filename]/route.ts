import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET(req: NextRequest, { params: { filename } }: { params: { filename: string } }) {
  try {
    
    const filePath = join(process.cwd(), 'uploads', filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);

    // Determine content type (basic example, can be expanded)
    let contentType = 'application/octet-stream';
    if (filename.endsWith('.png')) {
      contentType = 'image/png';
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (filename.endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (filename.endsWith('.webp')) {
      contentType = 'image/webp';
    } else if (filename.endsWith('.svg')) {
      contentType = 'image/svg+xml';
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Aggressive caching for production
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
