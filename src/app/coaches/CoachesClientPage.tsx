'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
import { ValueBlock } from '@/components/Landing/LandingCard';

interface Coach {
    id: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

interface CoachDetailsData { [key: string]: CoachDetail; }

interface Lens {
  title: string;
  subtitle: string;
}

interface CoachesSectionData {
  backgroundImage: string;
  title: string;
  description: string;
  lenses: Lens[];
}

interface CoachesClientPageProps {
    coachesData: Coach[];
    allCoachDetails: { [key: string]: CoachDetail };
    coachesSectionData: CoachesSectionData;
}

// Animation Variants
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const CoachesClientPage: React.FC<CoachesClientPageProps> = ({ coachesData, allCoachDetails, coachesSectionData }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleCoachClick = (id: string) => {
        setSelectedId(id);
    };

    const selectedCoachDetails = selectedId ? allCoachDetails[selectedId] : null;

  return (
    <div className="bg-black text-white font-sans">
      
      {/* Responsive Hero Section */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
        <div
          className="absolute inset-0 bg-cover bg-top filter grayscale"
          style={
            {backgroundImage: `url(${coachesSectionData.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/6 to-black"></div>
        </div>
      </div>

      {/* Responsive Main Content */}
      <main className="relative z-10 -mt-24 sm:-mt-48 container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-12 mb-16">
            <div className="w-full md:w-1/2 space-y-6 text-gray-300 leading-relaxed">
                <div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight">
                        {coachesSectionData.title}
                    </h1>
                    <div className="w-32 h-1.5 bg-red-600 mt-4"></div>
                </div>
                <p className="font-bold text-white text-lg">{coachesSectionData.description}</p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {coachesSectionData.lenses.map((item, index) =>
                  <div key={index} className="w-full">
                    <ValueBlock title={item.title}>
                      {item.subtitle}
                    </ValueBlock>
                  </div>
                )
              }
            </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-24">
          {coachesData.map(coach => (
            <motion.div 
              key={coach.id} 
              layoutId={coach.id}
              onClick={() => handleCoachClick(coach.id)}
              className="group relative rounded-lg cursor-pointer"
            >
              <div className="relative h-80 bg-black rounded-lg overflow-hidden">
                <motion.img 
                  src={coach.imageUrl} 
                  alt={coach.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/ to-transparent"></div>
                
                {/* Red line hover effect */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <motion.h3 className="font-black text-lg text-white uppercase tracking-wider mb-2">
                        {coach.name}
                    </motion.h3>
                    <div className="flex flex-wrap gap-2">
                        {coach.specialties.map(spec => (
                            <span key={spec} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <AnimatePresence>
        {selectedId && selectedCoachDetails && (
          <AnimatedCoachModal 
            id={selectedId} 
            coach={selectedCoachDetails} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachesClientPage;
