
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const ourGym = await prisma.ourGym.findFirst();
    if (ourGym) {
      let finalImageUrl = ourGym.imageUrl;

      if (finalImageUrl.startsWith('http://') || finalImageUrl.startsWith('https://')) {
        // It's an external URL, use as is
        finalImageUrl = finalImageUrl.split('?')[0];
      } else if (finalImageUrl.startsWith('/api/images/')) {
        // Already has the prefix, use as is
        finalImageUrl = finalImageUrl.split('?')[0];
      } else {
        // It's a local filename, prepend the API route
        finalImageUrl = `/api/images/${finalImageUrl.split('?')[0]}`;
      }

      return NextResponse.json({
        ...ourGym,
        imageUrl: finalImageUrl,
      });
    }
    return NextResponse.json(null);
  } catch (error) {
    console.error('[OURGYM_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !content || !imageUrl) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const ourGym = await prisma.ourGym.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(ourGym);
  } catch (error) {
    console.error('[OURGYM_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, imageUrl } = body;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const ourGym = await prisma.ourGym.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(ourGym);
  } catch (error) {
    console.error('[OURGYM_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
