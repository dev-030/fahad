
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
    const video = await prisma.video.findFirst(); // Assuming we want the first video for the landing page
    if (video) {
      let finalVideoUrl = video.url;
      // Ensure videoUrl is correctly formatted when retrieved
      if (!(finalVideoUrl.startsWith('http://') || finalVideoUrl.startsWith('https://')) && !finalVideoUrl.startsWith('/api/images/')) {
        finalVideoUrl = `/api/images/${finalVideoUrl}`;
      }
      return NextResponse.json({ videoUrl: finalVideoUrl });
    } else {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
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
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields: videoUrl" },
        { status: 400 }
      );
    }

    // Clean the videoUrl to get just the filename
    const cleanedFilename = cleanAssetFilename(videoUrl);
    // Prepend the API path for serving assets
    const formattedVideoUrl = `/api/images/${cleanedFilename}`;

    let video;
    const existingVideo = await prisma.video.findFirst();

    if (existingVideo) {
      video = await prisma.video.update({
        where: { id: existingVideo.id },
        data: { url: formattedVideoUrl },
      });
    } else {
      video = await prisma.video.create({
        data: { url: formattedVideoUrl },
      });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
