import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CoachDetail {
  name: string;
  imageUrl: string;
  specialties: string[];
  achievements: string[];
  bio: string[];
}

interface CoachDetailsData {
  [key: string]: CoachDetail;
}

async function main() {
  const jsonPath = path.resolve(__dirname, '../public/coachDetails.json');
  const coachesData: CoachDetailsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  for (const slug of Object.keys(coachesData)) {
    const coach = coachesData[slug];
    await prisma.coach.upsert({
      where: { slug: slug },
      update: {
        name: coach.name,
        image: coach.imageUrl,
        specialties: coach.specialties.join(','),
        achievements: coach.achievements.join(','),
        bio: JSON.stringify(coach.bio),
      },
      create: {
        slug: slug,
        name: coach.name,
        image: coach.imageUrl,
        specialties: coach.specialties.join(','),
        achievements: coach.achievements.join(','),
        bio: JSON.stringify(coach.bio),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });