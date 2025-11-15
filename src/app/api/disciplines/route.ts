import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Helper function to extract just the filename from a URL
function cleanAssetFilename(url: string): string {
  if (!url) return url;

  // If it's an external URL, return as is (after stripping potential ?v=...)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.split('?')[0];
  }

  // For local paths, extract just the filename
  const lastSlashIndex = url.lastIndexOf('/');
  let filename = url;
  if (lastSlashIndex !== -1) {
    filename = url.substring(lastSlashIndex + 1);
  }
  
  // Remove any ?v=... from the filename
  filename = filename.split('?')[0];

  return filename;
}

export async function GET() {
  try {
    const disciplines = await prisma.discipline.findMany();
    const formattedDisciplines = disciplines.map(discipline => {
      let finalImageUrl = discipline.imageUrl;

      if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
        // It's an external URL, use as is
      } else if (!finalImageUrl.startsWith('/api/images/')) { // Added check to prevent double prefixing
        // It's a local filename, prepend the API route
        finalImageUrl = `/api/images/${finalImageUrl}`;
      }

      return {
        ...discipline,
        imageUrl: finalImageUrl,
      };
    });
    return NextResponse.json(formattedDisciplines);
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, imageUrl, title, description, lenses } = body;

    if (!name || !slug || !imageUrl || !title || !description || !lenses) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingDiscipline = await prisma.discipline.findUnique({
      where: { slug },
    });

    if (existingDiscipline) {
      return NextResponse.json({ message: 'Discipline with this slug already exists' }, { status: 409 });
    }

    const cleanedFilename = cleanAssetFilename(imageUrl);
    const formattedImageUrl = `/api/images/${cleanedFilename}`;

    const newDiscipline = await prisma.discipline.create({
      data: {
        name,
        slug,
        imageUrl: formattedImageUrl,
        title,
        description,
        lenses: JSON.stringify(lenses),
      },
    });

    return NextResponse.json(newDiscipline, { status: 201 });
  } catch (error) {
    console.error('Error creating discipline:', error);
    return NextResponse.json({ message: 'Failed to create discipline', error: (error as Error).message }, { status: 500 });
  }
}