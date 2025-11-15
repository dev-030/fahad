// src/app/coaches/page.tsx
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
// This is the data for the small cards
const coachesData = [
{
slug: 'angela-hayes', name: 'Angela Hayes', specialties: ['Muay Thai', 'MMA'],
imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f3c_67f9a7a48dea388609cd7c33_AngieStaffPhoto.jpeg',
},
{
slug: 'ben-westrich', name: 'Ben Westrich', specialties: ['Brazilian Jiu-Jitsu', 'MMA'],
imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f3d_67f98256486dddbebb682a94_BenStaffPhoto.jpeg',
},
{
slug: 'kay-hansen', name: 'Kay Hansen', specialties: ['Brazilian Jiu-Jitsu', 'MMA', 'Muay Thai'],
imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f56_IMG_20250922_183529.jpg',
},
{
slug: 'larry-ruiz', name: 'Larry Ruiz', specialties: ['Brazilian Jiu-Jitsu', 'MMA'],
imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f55_67f9a6a3e5c4a366b4034f55_LarryStaffPhoto.jpeg',
},
{
slug: 'natalie-salcedo', name: 'Natalie Salcedo', specialties: ['Brazilian Jiu-Jitsu', 'Muay Thai', 'MMA'],
imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f54_67f9a48c2f2816a346c54aa7_NatalieStaffPhoto-1.jpeg',
},
];
interface CoachDetailsData { [key: string]: CoachDetail; }
const CoachesPage = () => {
const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
const [allCoachDetails, setAllCoachDetails] = useState<CoachDetailsData>({});
// Find the full details for the selected coach
const selectedCoachDetails = selectedSlug ? allCoachDetails[selectedSlug] : null;
const handleCoachClick = async (slug: string) => {
// Fetch details if they haven't been fetched yet
if (Object.keys(allCoachDetails).length === 0) {
try {
const response = await fetch('/coachDetails.json');
const data: CoachDetailsData = await response.json();
setAllCoachDetails(data);
} catch (error) {
console.error("Failed to fetch coach details:", error);
return;
}
}
setSelectedSlug(slug);
};
return (
<div className="bg-black text-white font-sans">
<main className="container mx-auto px-6 lg:px-8 py-24">
<div className="max-w-xl mb-16">
<h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-tight">Our Coaches</h1>
<div className="w-32 h-1.5 bg-red-600 mt-4"></div>
</div>
code
Code
{/* Coaches Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {coachesData.map(coach => (
        <motion.div
          key={coach.slug}
          layoutId={coach.slug} // This is the magic link!
          onClick={() => handleCoachClick(coach.slug)}
          className="group relative rounded-lg cursor-pointer bg-gray-900"
        >
          <div className="relative h-80 rounded-lg overflow-hidden">
            <motion.img
              src={coach.imageUrl} alt={coach.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-4">
              <motion.h3 className="font-black text-lg text-white uppercase tracking-wider mb-2">{coach.name}</motion.h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </main>

  <AnimatePresence>
    {selectedSlug && selectedCoachDetails && (
      <AnimatedCoachModal 
        slug={selectedSlug} 
        coach={selectedCoachDetails} 
        onClose={() => setSelectedSlug(null)} 
      />
    )}
  </AnimatePresence>
</div>
);
};
export default CoachesPage;