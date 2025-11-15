
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function cleanImageUrl(url: string): string {
  if (!url) return url;

  // If it's an external URL, return as is (after stripping potential ?v=...)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.split('?')[0];
  }

  // If it's a local path, extract just the filename
  // Handles /api/images/filename.ext or /filename.ext
  const parts = url.split('/');
  let filename = parts[parts.length - 1];
  
  // Remove any ?v=... from the filename
  filename = filename.split('?')[0];

  return filename;
}

export async function GET() {
  const secondHero = await prisma.secondHero.findFirst();
  if (secondHero) {
    let finalImageUrl = secondHero.imageUrl;

    if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
      // It's an external URL, use as is
    } else {
      // It's a local filename, prepend the API route
      finalImageUrl = `/api/images/${finalImageUrl}`;
    }

    return NextResponse.json({
      ...secondHero,
      imageUrl: finalImageUrl,
    });
  }
  return NextResponse.json(null);
}



export async function PUT(request: Request) {
  const data = await request.json();
  console.log('data', data);
  const secondHero = await prisma.secondHero.findFirst();
  console.log('secondHero', secondHero);
  if (secondHero) {
    try {
      const cleanedImageUrl = cleanImageUrl(data.imageUrl);
      const updatedSecondHero = await prisma.secondHero.update({
        where: { id: secondHero.id },
        data: { ...data, imageUrl: cleanedImageUrl },
      });
      return NextResponse.json(updatedSecondHero);
    } catch (error) {
      console.error('Error updating second hero:', error);
      return NextResponse.json({ error: 'Error updating second hero' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Second hero not found' }, { status: 404 });
  }
}
