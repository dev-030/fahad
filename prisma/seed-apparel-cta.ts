import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.apparelCTA.deleteMany({});
  await prisma.apparelCTA.create({
    data: {
      imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e6b3e3f604320d81e7c52f_warcollegeproducts.png',
      logoUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f42_warforgedwhite.png',
      title: 'Shop War Forged Apparel',
      description: "Based in Colorado Springs, we're a team of veterans, competitors, and fighters committed to providing exceptional, affordable gear and lifestyle clothing for athletes of all levels.",
      buttonText: 'SHOP NOW',
      buttonUrl: 'https://warforgedapparel.com/',
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
