
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';



export async function GET() {
  try {
    const schedulePdf = await prisma.schedulePdf.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(schedulePdf);
  } catch (error) {
    console.error('Failed to fetch schedule PDF URL:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule PDF URL' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const url = formData.get('url') as string;

    let pdfUrl = '';

    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Sanitize filename
        const sanitizedFilename = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
        const publicDir = path.join(process.cwd(), 'public');
        
        // Ensure public directory exists
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const filePath = path.join(publicDir, sanitizedFilename);
        await fs.promises.writeFile(filePath, buffer);
        pdfUrl = `/${sanitizedFilename}`;
      } catch (writeError) {
        console.error('Error writing file to disk:', writeError);
        return NextResponse.json({ error: 'Failed to write file to disk' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'A PDF file must be provided' }, { status: 400 });
    }

    const newSchedulePdf = await prisma.schedulePdf.create({
      data: {
        url: pdfUrl,
      },
    });

    return NextResponse.json(newSchedulePdf);
  } catch (error) {
    console.error('Failed to save schedule PDF:', error);
    return NextResponse.json({ error: 'Failed to save schedule PDF' }, { status: 500 });
  }
}
