import { Program } from './types';

export const programs: Program[] = [
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    tagline: 'The Art of Eight Limbs',
    imageUrl: '/placeholders/1920x1080.svg',
    description: 'Muay Thai is a combat sport of Thailand that uses stand-up striking along with various clinching techniques.',
    detailedDescription: 'Our Muay Thai program is designed for all levels, from beginners to advanced fighters. We focus on proper technique, conditioning, and strategy. Whether you want to get in shape, learn self-defense, or compete, our program will help you achieve your goals.',
    keyTechniques: [
      { icon: 'FaFistRaised', name: 'Boxing', description: 'Master the fundamentals of punches, footwork, and head movement.' },
      { icon: 'FaBolt', name: 'Kicks', description: 'Develop powerful and precise kicks to all levels of the body.' },
      { icon: 'FaShieldAlt', name: 'Clinch', description: 'Learn to control your opponent in close quarters with knees and elbows.' },
    ],
    schedule: [
      { day: 'Monday', time: '5:00-6:00 PM', class: 'Beginner' },
      { day: 'Wednesday', time: '5:00-6:00 PM', class: 'Beginner' },
      { day: 'Friday', time: '5:00-6:00 PM', class: 'All Levels' },
    ],
    gear: ['Boxing Gloves (16oz)', 'Shin Guards', 'Mouthguard', 'Hand Wraps'],
    testimonial: {
      quote: 'The best Muay Thai gym in town! The coaches are knowledgeable and supportive.',
      author: '- John Doe',
    },
  },
];