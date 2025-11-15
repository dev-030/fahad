import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const landingPage = await prisma.landingPage.findFirst({
      include: {
        coachLenses: true,
      },
    });

    if (landingPage) {
      let finalBackgroundImageUrl = landingPage.coachSectionBackgroundImage;

      if (finalBackgroundImageUrl && (finalBackgroundImageUrl.startsWith('http://') || finalBackgroundImageUrl.startsWith('https://'))) {
        // It's an external URL, use as is
        finalBackgroundImageUrl = finalBackgroundImageUrl.split('?')[0];
      } else if (finalBackgroundImageUrl && finalBackgroundImageUrl.startsWith('/api/images/')) {
        // Already has the prefix, use as is
        finalBackgroundImageUrl = finalBackgroundImageUrl.split('?')[0];
      } else if (finalBackgroundImageUrl) {
        // It's a local filename, prepend the API route
        finalBackgroundImageUrl = `/api/images/${finalBackgroundImageUrl.split('?')[0]}`;
      }

      return NextResponse.json({
        title: landingPage.coachSectionTitle,
        description: landingPage.coachSectionDescription,
        backgroundImage: finalBackgroundImageUrl,
        lenses: landingPage.coachLenses,
      });
    } else {
      return NextResponse.json({
        title: "",
        description: "",
        backgroundImage: "",
        lenses: [],
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, backgroundImage, lenses } = body;

    if (!title || !description || !backgroundImage || !lenses) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let landingPage = await prisma.landingPage.findFirst();

    if (!landingPage) {
      landingPage = await prisma.landingPage.create({
        data: {
          coachSectionTitle: title,
          coachSectionDescription: description,
          coachSectionBackgroundImage: backgroundImage,
        },
      });
    } else {
      await prisma.landingPage.update({
        where: { id: landingPage.id },
        data: {
          coachSectionTitle: title,
          coachSectionDescription: description,
          coachSectionBackgroundImage: backgroundImage,
        },
      });
    }

    const existingLensIds = (await prisma.coachLens.findMany({
      where: { landingPageId: landingPage.id },
      select: { id: true },
    })).map(lens => lens.id);

    const incomingLensIds = lenses.filter((lens: any) => lens.id).map((lens: any) => lens.id);

    const lensesToDelete = existingLensIds.filter(id => !incomingLensIds.includes(id));
    const lensesToUpdate = lenses.filter((lens: any) => existingLensIds.includes(lens.id));
    const lensesToCreate = lenses.filter((lens: any) => !lens.id);

    if (lensesToDelete.length > 0) {
      await prisma.coachLens.deleteMany({
        where: {
          id: { in: lensesToDelete },
        },
      });
    }

    for (const lens of lensesToUpdate) {
      await prisma.coachLens.update({
        where: { id: lens.id },
        data: {
          title: lens.title,
          subtitle: lens.subtitle,
        },
      });
    }

    if (lensesToCreate.length > 0) {
      await prisma.coachLens.createMany({
        data: lensesToCreate.map((lens: any) => ({
          title: lens.title,
          subtitle: lens.subtitle,
          landingPageId: landingPage!.id,
        })),
      });
    }

    return NextResponse.json({ message: "Coaches section updated successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}