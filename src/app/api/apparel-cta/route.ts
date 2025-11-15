import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const apparelCTA = await prisma.apparelCTA.findFirst();
    if (apparelCTA) {
      let finalImageUrl = apparelCTA.imageUrl;
      let finalLogoUrl = apparelCTA.logoUrl;

      // Process imageUrl
      if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
        finalImageUrl = finalImageUrl.split('?')[0];
      } else if (finalImageUrl.startsWith('/api/images/')) {
        finalImageUrl = finalImageUrl.split('?')[0];
      } else {
        finalImageUrl = `/api/images/${finalImageUrl.split('?')[0]}`;
      }

      // Process logoUrl
      if (finalLogoUrl.startsWith('http://') || finalLogoUrl.startsWith('https://')) {
        finalLogoUrl = finalLogoUrl.split('?')[0];
      } else if (finalLogoUrl.startsWith('/api/images/')) {
        finalLogoUrl = finalLogoUrl.split('?')[0];
      } else {
        finalLogoUrl = `/api/images/${finalLogoUrl.split('?')[0]}`;
      }

      return NextResponse.json({
        ...apparelCTA,
        imageUrl: finalImageUrl,
        logoUrl: finalLogoUrl,
      });
    }
    return NextResponse.json(null);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const apparelCTA = await prisma.apparelCTA.create({ data });
    return NextResponse.json(apparelCTA);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const apparelCTA = await prisma.apparelCTA.findFirst();
    if (!apparelCTA) {
      return new NextResponse('Not Found', { status: 404 });
    }
    const updatedApparelCTA = await prisma.apparelCTA.update({
      where: { id: apparelCTA.id },
      data,
    });
    return NextResponse.json(updatedApparelCTA);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
