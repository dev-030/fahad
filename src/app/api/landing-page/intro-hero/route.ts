import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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
    const introHeroSection = await prisma.landingPageSection.findUnique({
      where: {
        name: "intro-hero",
      },
    });
    if (introHeroSection) {
      // Ensure videoUrl is correctly formatted when retrieved
      const content = JSON.parse(introHeroSection.content);
      if (content.videoUrl && !(content.videoUrl.startsWith('http://') || content.videoUrl.startsWith('https://')) && !content.videoUrl.startsWith('/api/images/')) {
        content.videoUrl = `/api/images/${content.videoUrl}`;
      }
      return NextResponse.json({ ...introHeroSection, content: JSON.stringify(content) });
    } else {
      return NextResponse.json({ content: "{}" }, { status: 404 });
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
    let { heroText, videoUrl } = body;

    if (!heroText || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Clean the videoUrl to get just the filename
    const cleanedFilename = cleanAssetFilename(videoUrl);
    // Prepend the API path for serving assets
    const formattedVideoUrl = `/api/images/${cleanedFilename}`;

    const content = JSON.stringify({ heroText, videoUrl: formattedVideoUrl });

    const updatedSection = await prisma.landingPageSection.upsert({
      where: { name: "intro-hero" },
      update: { content },
      create: { name: "intro-hero", content },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
