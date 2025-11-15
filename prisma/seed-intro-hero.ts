import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const introHeroData = {
    heroText: 'Train To Win',
    videoUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f43_homepageclipwarrior-transcode.mp4',
  };

  await prisma.landingPageSection.upsert({
    where: { name: 'intro-hero' },
    update: { content: JSON.stringify(introHeroData) },
    create: {
      name: 'intro-hero',
      content: JSON.stringify(introHeroData),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
