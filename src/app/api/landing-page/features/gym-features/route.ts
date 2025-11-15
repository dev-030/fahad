import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const gymFeatures = await prisma.gymFeature.findMany();
    return NextResponse.json(gymFeatures);
  } catch (error) {
    console.error('Error fetching gym features:', error);
    return NextResponse.json({ message: 'Failed to fetch gym features' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, icon, text } = await request.json();
    if (!icon || !text) {
      return NextResponse.json({ message: 'Icon and text are required' }, { status: 400 });
    }

    if (id) {
      const gymFeature = await prisma.gymFeature.update({
        where: { id },
        data: { icon, text },
      });
      return NextResponse.json(gymFeature, { status: 200 });
    } else {
      const gymFeature = await prisma.gymFeature.create({
        data: { icon, text },
      });
      return NextResponse.json(gymFeature, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating/updating gym feature:', error);
    return NextResponse.json({ message: 'Failed to create/update gym feature' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, icon, text } = await request.json();
    if (!id || !icon || !text) {
      return NextResponse.json({ message: 'ID, icon, and text are required' }, { status: 400 });
    }

    const gymFeature = await prisma.gymFeature.update({
      where: { id },
      data: { icon, text },
    });
    return NextResponse.json(gymFeature, { status: 200 });
  } catch (error) {
    console.error('Error updating gym feature:', error);
    return NextResponse.json({ message: 'Failed to update gym feature' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const gymFeature = await prisma.gymFeature.update({
      where: { id },
      data,
    });
    return NextResponse.json(gymFeature, { status: 200 });
  } catch (error) {
    console.error('Error updating gym feature:', error);
    return NextResponse.json({ message: 'Failed to update gym feature' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await prisma.gymFeature.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Gym feature deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting gym feature:', error);
    return NextResponse.json({ message: 'Failed to delete gym feature' }, { status: 500 });
  }
}