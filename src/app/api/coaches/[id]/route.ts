import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function cleanImageUrl(url: string): string {
  if (!url) return url;

  // If it's an external URL, return as is (after stripping potential ?v=...)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.split('?')[0];
  }

  // For local paths, extract just the filename
  // This handles paths like 'filename.ext', '/filename.ext', '/uploads/filename.ext', '/api/images/filename.ext'
  const lastSlashIndex = url.lastIndexOf('/');
  let filename = url;
  if (lastSlashIndex !== -1) {
    filename = url.substring(lastSlashIndex + 1);
  }
  
  // Remove any ?v=... from the filename
  filename = filename.split('?')[0];

  return filename;
}

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const coach = await prisma.coach.findUnique({
    where: { id: id },
  });
  if (!coach) {
    return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
  }

  let finalImageUrl = coach.image;

  if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
    // It's an external URL, use as is
  } else {
    // It's a local filename, prepend the API route
    finalImageUrl = `/api/images/${finalImageUrl}`;
  }

  const coachDetails = {
    ...coach,
    bio: coach.bio ? coach.bio.split('\n') : [],
    specialties: coach.specialties ? coach.specialties.split(',') : [],
    achievements: coach.achievements ? coach.achievements.split(',') : [],
    imageUrl: finalImageUrl,
  };

  return NextResponse.json(coachDetails);
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { name, bio, imageUrl, specialties, achievements } = await req.json();
  const cleanedImageUrl = cleanImageUrl(imageUrl);
  const updatedCoach = await prisma.coach.update({
    where: { id: id },
    data: {
      name,
      bio: bio.join('\n'),
      image: cleanedImageUrl,
      specialties: specialties.join(','),
      achievements: achievements.join(','),
    },
  });
  return NextResponse.json(updatedCoach);
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.coach.delete({
    where: { id: id },
  });
  return NextResponse.json({ message: 'Coach deleted' });
}
