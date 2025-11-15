import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pricingTiers = await prisma.pricingTier.findMany();
    const parsedTiers = pricingTiers.map(tier => {
      let features = tier.features;
      if (typeof features === 'string') {
        try {
          features = JSON.parse(features);
        } catch (error) {
          console.error('Failed to parse features:', error);
          features = [];
        }
      }
      return {
        ...tier,
        features,
      };
    });
    return NextResponse.json(parsedTiers);
  } catch (error) {
    console.error('Error fetching pricing tiers:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing tiers', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Convert price to float
    if (data.price) {
      data.price = parseFloat(data.price);
    }

    const newPricingTier = await prisma.pricingTier.create({
      data: {
        ...data,
        features: JSON.stringify(data.features),
      },
    });
    return NextResponse.json(newPricingTier, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing tier' }, { status: 500 });
  }
}