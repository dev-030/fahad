import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const coachesSection = await prisma.landingPageSection.findUnique({
      where: {
        name: "coaches",
      },
    });

    if (coachesSection) {
      console.log("Coaches Landing Page Section found:");
      console.log(JSON.stringify(coachesSection, null, 2));
    } else {
      console.log("Coaches Landing Page Section NOT found.");
    }
  } catch (error) {
    console.error("Error checking coaches landing page section:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
