import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDisciplines() {
  await prisma.discipline.upsert({
    where: { slug: 'mua-thai' },
    update: {},
    create: {
      name: 'Muay Thai',
      slug: 'mua-thai',
      imageUrl: '/next.svg',
      title: 'THE ART OF MUAY THAI',
      description: `Muay Thai, known as the “Art of Eight Limbs,” is one of the most versatile and effective striking systems in the world. Practitioners learn to use punches, kicks, knees, elbows, and clinch work to create a complete striking arsenal. This well-rounded approach not only builds physical skill and conditioning, but also provides a strong foundation for athletes pursuing success in combat sports, mixed martial arts, or overall fitness and self-defense. At Warrior, our Muay Thai program blends the traditional roots of the art with modern applications. Classes are structured to teach authentic striking techniques while also relating them to what has proven effective across other combat disciplines, such as MMA. We emphasize proper form, the development of solid movement patterns, and a safe training environment so that students of all ages and experience levels can progress with confidence. We are an official affiliate of Classic Muay Thai, led by coach Tyler Wombles. This system is built on ring-tested fundamentals—balanced stance and footwork, layered defense (parry/check/frame), clean kick and knee mechanics, efficient elbow entries, and disciplined clinch posture and off-balancing—producing success for athletes from beginners to high-level competitors. We incorporate Classic’s curriculum cycles, padwork templates, bag tasks, and sparring protocols, along with shared terminology, film study, and cornering standards, so your day-one fundamentals scale seamlessly into advanced tactics and MMA integration. This affiliation keeps our training current, consistent, and accountable, while giving students access to a proven roadmap for developing real fight IQ and results.Our philosophy of training is guided by the Warrior mission: to use martial arts as a vehicle for growth, both personally and professionally. Every class is designed to be practical, useful, and universally applicable. We view Muay Thai through three essential lenses: `,
      lenses: JSON.stringify([
        { title: 'STREET', content: 'Training is grounded in real-world applicability. While rules exist in sport and training for safety, our focus is on adaptability beyond any one ruleset, preparing students for practical scenarios.' },
        { title: 'SPORT', content: 'Competition provides structure and feedback. Whether in controlled drilling or live events, improvement takes priority over temporary outcomes, ensuring lasting growth.' },
        { title: 'ART', content: 'At its heart, Muay Thai is a journey. Students train not only for performance but for the joy of practice, the pursuit of truth in technique, and the challenge of self-discovery.' },
      ]),
    },
  });

  await prisma.discipline.upsert({
    where: { slug: 'fitness' },
    update: {},
    create: {
      name: 'Fitness',
      slug: 'fitness',
      imageUrl: '/next.svg',
      title: 'Fitness Training',
      description: 'Our comprehensive fitness program is designed to improve your strength, endurance, and overall well-being. We focus on functional movements and personalized training plans to help you achieve your health and performance goals.',
      lenses: JSON.stringify([
        { title: 'STRENGTH', content: 'Develop raw power and muscular endurance through targeted strength training exercises and progressive overload techniques.' },
        { title: 'ENDURANCE', content: 'Enhance your cardiovascular health and stamina with high-intensity interval training, circuit training, and long-duration workouts.' },
        { title: 'FLEXIBILITY', content: 'Improve your range of motion, prevent injuries, and aid recovery with dedicated stretching and mobility drills.' },
      ]),
    },
  });

  await prisma.discipline.upsert({
    where: { slug: 'jutsu' },
    update: {},
    create: {
      name: 'Jutsu',
      slug: 'jutsu',
      imageUrl: '/next.svg',
      title: 'Jutsu Training',
      description: 'Jutsu is a comprehensive martial art focusing on grappling, throws, and submissions. Our program emphasizes practical self-defense techniques, physical conditioning, and mental discipline, suitable for all skill levels.',
      lenses: JSON.stringify([
        { title: 'GRAPPLING', content: 'Master the art of ground fighting, including positions, escapes, and submissions, to control and neutralize opponents.' },
        { title: 'THROWS', content: 'Learn effective takedowns and throws to bring your opponent to the ground, gaining a dominant position.' },
        { title: 'SELF-DEFENSE', content: 'Develop practical techniques for real-world self-defense situations, focusing on leverage and technique over brute strength.' },
      ]),
    },
  });

  await prisma.discipline.upsert({
    where: { slug: 'mma' },
    update: {},
    create: {
      name: 'MMA',
      slug: 'mma',
      imageUrl: '/next.svg',
      title: 'Mixed Martial Arts',
      description: 'Mixed Martial Arts (MMA) is a full-contact combat sport that combines techniques from various martial arts and combat sports. Our program provides comprehensive training in striking, grappling, and wrestling, preparing athletes for competition and self-defense.',
      lenses: JSON.stringify([
        { title: 'STRIKING', content: 'Develop powerful and precise strikes using techniques from boxing, Muay Thai, and kickboxing.' },
        { title: 'GRAPPLING', content: 'Master ground control, submissions, and escapes with techniques from Brazilian Jiu-Jitsu and wrestling.' },
        { title: 'WRESTLING', content: 'Learn effective takedowns, clinching, and control techniques to dominate your opponent in close quarters.' },
      ]),
    },
  });
}
