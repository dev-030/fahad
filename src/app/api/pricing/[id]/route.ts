import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const pricingTier = await prisma.pricingTier.findUnique({
      where: { id },
    });
    if (!pricingTier) {
      return NextResponse.json({ error: 'Pricing tier not found' }, { status: 404 });
    }
    let features = pricingTier.features;
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features);
      } catch (error) {
        console.error('Failed to parse features:', error);
        features = [];
      }
    }
    const parsedTier = {
      ...pricingTier,
      features,
    };
    return NextResponse.json(parsedTier);
  } catch (error) {
    console.error('Error fetching pricing tier:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing tier', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Convert price to float
    if (data.price) {
      data.price = parseFloat(data.price);
    }

    const updatedPricingTier = await prisma.pricingTier.update({
      where: { id },
      data: {
        ...data,
        features: JSON.stringify(data.features),
      },
    });
    return NextResponse.json(updatedPricingTier);
  } catch (error) {
    console.error('Error updating pricing tier:', error);
    return NextResponse.json({ error: 'Failed to update pricing tier', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.pricingTier.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting pricing tier:', error);
    return NextResponse.json({ error: 'Failed to delete pricing tier', details: error.message }, { status: 500 });
  }
}