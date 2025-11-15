import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const landingPage = await prisma.landingPage.upsert({
    where: { id: 'clp00000000000000000000000' }, // Use a fixed ID for the single landing page entry
    update: {
      coachSectionTitle: 'Our Coaches',
      coachSectionDescription: 'With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.\n\nOur coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.\n\nWe teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student',
      coachSectionBackgroundImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg',
    },
    create: {
      id: 'clp00000000000000000000000', // Use a fixed ID for the single landing page entry
      coachSectionTitle: 'Our Coaches',
      coachSectionDescription: 'With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.\n\nOur coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.\n\nWe teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student',
      coachSectionBackgroundImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg',
    },
  });

  // Create associated CoachLens entries
  await prisma.coachLens.upsert({
    where: { title: 'Lens 1 Title' },
    update: {
      subtitle: 'Lens 1 Subtitle',
      landingPageId: landingPage.id,
    },
    create: {
      title: 'Lens 1 Title',
      subtitle: 'Lens 1 Subtitle',
      landingPageId: landingPage.id,
    },
  });

  await prisma.coachLens.upsert({
    where: { title: 'Lens 2 Title' },
    update: {
      subtitle: 'Lens 2 Subtitle',
      landingPageId: landingPage.id,
    },
    create: {
      title: 'Lens 2 Title',
      subtitle: 'Lens 2 Subtitle',
      landingPageId: landingPage.id,
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
