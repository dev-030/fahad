import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
  const programs = await prisma.program.findMany();
  const formattedPrograms = programs.map(program => {
    let finalImageUrl = program.image;

    if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
      // It's an external URL, use as is
    } else {
      // It's a local filename, prepend the API route
      finalImageUrl = `/api/images/${finalImageUrl}`;
    }

    return {
      ...program,
      image: finalImageUrl,
    };
  });
  return NextResponse.json(formattedPrograms);
}

export async function POST(req: Request) {
  const { name, description, image } = await req.json();
  const cleanedImage = cleanImageUrl(image);
  const newProgram = await prisma.program.create({
    data: {
      name,
      description,
      image: cleanedImage,
    },
  });
}
