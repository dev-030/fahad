
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const scheduleData = [
  { day: 'Monday', time: '06:00 AM', program: 'Morning BJJ', level: 'All Levels', type: 'BJJ' },
  { day: 'Monday', time: '12:00 PM', program: 'Lunch Muay Thai', level: 'All Levels', type: 'Muay Thai' },
  { day: 'Monday', time: '05:00 PM', program: 'Kids Jiu-Jitsu', level: 'Beginner', type: 'Kids' },
  { day: 'Tuesday', time: '06:00 AM', program: 'Morning Muay Thai', level: 'All Levels', type: 'Muay Thai' },
  { day: 'Tuesday', time: '12:00 PM', program: 'Lunch BJJ', level: 'All Levels', type: 'BJJ' },
  { day: 'Tuesday', time: '05:00 PM', program: 'Kids Muay Thai', level: 'Beginner', type: 'Kids' },
  { day: 'Wednesday', time: '06:00 AM', program: 'Morning BJJ', level: 'All Levels', type: 'BJJ' },
  { day: 'Wednesday', time: '12:00 PM', program: 'Lunch Muay Thai', level: 'All Levels', type: 'Muay Thai' },
  { day: 'Wednesday', time: '05:00 PM', program: 'Kids BJJ', level: 'Beginner', type: 'Kids' },
  { day: 'Thursday', time: '06:00 AM', program: 'Morning Muay Thai', level: 'All Levels', type: 'Muay Thai' },
  { day: 'Thursday', time: '12:00 PM', program: 'Lunch BJJ', level: 'All Levels', type: 'BJJ' },
  { day: 'Thursday', time: '05:00 PM', program: 'Kids Muay Thai', level: 'Beginner', type: 'Kids' },
  { day: 'Friday', time: '06:00 AM', program: 'Morning BJJ', level: 'All Levels', type: 'BJJ' },
  { day: 'Friday', time: '12:00 PM', program: 'Lunch Muay Thai', level: 'All Levels', type: 'Muay Thai' },
  { day: 'Friday', time: '05:00 PM', program: 'Open Mat', level: 'All Levels', type: 'All' },
  { day: 'Saturday', time: '10:00 AM', program: 'Open Mat', level: 'All Levels', type: 'All' },
];

export async function main() {
  for (const data of scheduleData) {
    await prisma.schedule.create({
      data,
    });
  }
}
