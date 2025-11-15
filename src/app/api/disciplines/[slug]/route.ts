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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const discipline = await prisma.discipline.findUnique({
      where: { slug },
    });

    if (!discipline) {
      return NextResponse.json({ message: 'Discipline not found' }, { status: 404 });
    }

    let finalImageUrl = discipline.imageUrl;
    // Ensure imageUrl is correctly formatted when retrieved
    if (!(finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) && !finalImageUrl.startsWith('/api/images/')) {
      finalImageUrl = `/api/images/${finalImageUrl}`;
    }

    return NextResponse.json({ ...discipline, imageUrl: finalImageUrl });
  } catch (error) {
    console.error('Error fetching discipline:', error);
    return NextResponse.json({ message: 'Failed to fetch discipline' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug: oldSlug } = params;
    const body = await request.json();
    const { name, slug, imageUrl, title, description, lenses } = body;

    if (!name || !slug || !imageUrl || !title || !description || !lenses) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const cleanedFilename = cleanAssetFilename(imageUrl);
    const formattedImageUrl = `/api/images/${cleanedFilename}`;

    const updatedDiscipline = await prisma.discipline.update({
      where: { slug: oldSlug },
      data: {
        name,
        slug,
        imageUrl: formattedImageUrl,
        title,
        description,
        lenses: JSON.stringify(lenses),
      },
    });

    return NextResponse.json(updatedDiscipline);
  } catch (error) {
    console.error('Error updating discipline:', error);
    return NextResponse.json({ message: 'Failed to update discipline' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await prisma.discipline.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Discipline deleted successfully' });
  } catch (error) {
    console.error('Error deleting discipline:', error);
    return NextResponse.json({ message: 'Failed to delete discipline' }, { status: 500 });
  }
}