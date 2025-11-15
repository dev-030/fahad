'use client';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import {
  FaDumbbell, FaBatteryFull, FaCalendarAlt, FaUserFriends, FaMedal, FaSmile,
  FaChevronRight, FaCheckCircle, FaTimesCircle, FaInstagram, FaFacebookF, FaArrowRight,
} from 'react-icons/fa';
import Image from "next/image";
import { ValueBlock } from "@/components/Landing/LandingCard";
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';

//=================================================================
// INTERFACES & TYPES
//=================================================================
interface Coach {
    id: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

//=================================================================
//  HELPER COMPONENTS & ANIMATION VARIANTS
//=================================================================
const PricingFeature = ({ text, included = true }) => (
  <li className={`flex items-center space-x-3 ${included ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
    {included ? <FaCheckCircle className="text-red-500" /> : <FaTimesCircle className="text-gray-700" />}
    <span>{text}</span>
  </li>
);

// Animation variants for text elements
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


//=================================================================
//  SECTION COMPONENTS
//=================================================================
const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative h-[calc(100vh-100px)] w-full overflow-hidden">
      {/* The video background remains the same */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
        src={data.videoUrl}
      />

      {/* This container still creates the "transparent" text effect */}
      <div className="relative h-full mix-blend-screen flex flex-col justify-center items-center text-center">
        <div className="absolute w-full top-0 text-start">
          <div className="bg-white">
            <h1 className="text-6xl md:text-[16vw] lg:text-[12vw] font-clashDisplay font-black uppercase leading-tight md:leading-none text-black p-4">
              {data.heroText}
            </h1>
          </div>
        </div>
        <div className="hidden sm:block absolute bottom-10 left-4 sm:left-10 z-20 text-sm uppercase tracking-[0.5em] text-white">
          S C R O L L
        </div>
      </div>

      {/* The icon is now outside the mix-blend-screen container */}
      <Image
        src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f16_warrioricon.svg"
        alt="Warrior Logo"
        width={1920}
        height={1080}
        // Positioning is adjusted to be relative to the main section
        className="hidden lg:block absolute top-48 right-20 transform -translate-y-[5%] translate-x-[15%] w-[35%] h-auto"
      />
    </section>
  );
};

const SecondHeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.imageUrl}
          alt="MMA fighters grappling in a gym"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
      </div>
      <div className="container mx-auto relative z-10 py-16 sm:py-24 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            {/* Animated Title */}
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data.title}
            </motion.h2>
            {/* Animated Description */}
            <motion.p 
              className="mt-8 text-gray-300 leading-relaxed max-w-lg"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              {data.description}
            </motion.p>
            {/* Animated Subtitle */}
            <motion.div 
              className="mt-12"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold uppercase tracking-wide">
                {data.subtitle}
              </h3>
              <div className="w-48 h-1.5 bg-red-600 mt-2"></div>
            </motion.div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetch('/api/video')
      .then((res) => res.json())
      .then((data) => setVideoUrl(data.url));
  }, []);

  return (
    <section className="bg-black py-12 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="relative h-0 pb-[56.25%]">
          {videoUrl && (
            <video
              className="absolute top-0 left-0 w-full h-full rounded-2xl md:rounded-[3rem]"
              controls={false}
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src={videoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = ({ data }) => {
  if (!data) return null;
  const SectionTitle = ({ title }) => (
    <div>
      <h2 className="text-3xl font-black uppercase tracking-wider">{title}</h2>
      <div className="w-24 h-1.5 bg-red-600 mt-2"></div>
    </div>
  );
  const DisciplineLink = ({ href, children }) => (
    <li>
      <Link href={href} className="flex items-center justify-between text-lg text-gray-300 hover:text-white transition-colors group max-w-xs">
        <h4 className="text-xl">{children}</h4>
        <FaChevronRight className="text-red-500 opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
      </Link>
    </li>
  );
  const GymFeature = ({ icon, text }) => (
    <li className="flex items-center space-x-4 text-lg text-gray-300">
      <div className="w-6 text-center">{iconComponents[icon] || <FaDumbbell />}</div>
      <span>{text}</span>
    </li>
  );

  // Map icon names to actual React components
  const iconComponents = {
    FaDumbbell: <FaDumbbell />,
    FaBatteryFull: <FaBatteryFull />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaUserFriends: <FaUserFriends />,
    FaMedal: <FaMedal />,
    FaSmile: <FaSmile />,
  };

  return (
    <section id="disciplines" className="bg-[#121212] text-white py-16 sm:py-24 px-4 overflow-hidden scroll-mt-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col space-y-16">
            <div>
              <SectionTitle title="Disciplines" />
              <ul className="mt-8 space-y-4">
                {data.disciplines.map(d => <DisciplineLink key={d.name} href={d.href}>{d.name}</DisciplineLink>)}
              </ul>
            </div>
            <div>
              <SectionTitle title="Gym Features" />
              <ul className="mt-8 space-y-4">
                {data.gymFeatures.map((f, i) => <GymFeature key={i} icon={f.icon} text={f.text} />)}
              </ul>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f16_warrioricon.svg"
              alt="Warrior Logo background"
              className="hidden lg:block absolute bottom-0 right-0 w-[80%] h-auto opacity-10 pointer-events-none -mr-24"
            />
            <div className="relative z-10 space-y-6 text-gray-300 leading-relaxed">
              <p>
                {data.description}
              </p>
              <div className="pt-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                  {data.subtitle}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreValuesSection = ({ data }) => {
  if (!data) return null;
  
  const gridContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="who-we-are" className="bg-black text-white py-16 sm:py-24 px-4 scroll-mt-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 
              className="text-4xl sm:text-5xl font-black mb-4 uppercase"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data.title}
            </motion.h2>
            <motion.div 
              className="w-44 h-1.5 bg-red-600 mb-12"
              initial={{ width: 0 }}
              whileInView={{ width: '11rem' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <motion.div 
              className="space-y-6 text-white-400 leading-relaxed max-w-xl"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.5 }}
            >
              <p>{data.description}</p>
            </motion.div>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {data.values && data.values.map(v => 
              <motion.div key={v.title} variants={textVariants}>
                  <ValueBlock title={v.title}>{v.description}</ValueBlock>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const ApparelCTASection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="py-16 sm:py-24 px-4 bg-black relative text-center" style={{ backgroundImage: `url('${data.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="container mx-auto relative z-10 flex flex-col items-center">
        <img src={data.logoUrl} alt="War Forged Apparel" className="w-36 sm:w-48 h-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4 text-white">{data.title}</h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-8">
          {data.description}
        </p>
        <a href={data.buttonUrl} className="bg-red-600 text-white font-bold py-4 px-10 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors rounded-md">
          <span>{data.buttonText}</span>
          <FaArrowRight />
        </a>
      </div>
    </section>
  )
}


//=================================================================
//  MAIN CONTENT COMPONENT
//=================================================================
const MainContent = ({
  heroData,
  secondHeroData,
  features,
  coreValues,
  coachesSectionData,
  coachesData,
  scheduleData,
  schedulePdfUrl,
  selectedId,
  selectedCoachDetails,
  handleCoachClick,
  setSelectedId,
  pricingTiers,
  apparelCTAData
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDay, setActiveDay] = useState('Full Week');

  const groupedSchedule = scheduleData.reduce((acc, item) => {
    const day = item.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const days = [
    'Full Week',
    ...Object.keys(groupedSchedule).map(day => {
      const date = new Date();
      const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day.slice(0, 3));
      date.setDate(date.getDate() - date.getDay() + dayIndex + 1);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${day}, ${formattedDate}`;
    })
  ];

  useEffect(() => {
    const todayShort = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const todayLong = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayDay = Object.keys(groupedSchedule).find(day => day.startsWith(todayShort) || day.startsWith(todayLong));
    if (todayDay) {
      setActiveDay(todayDay);
    }
  }, [scheduleData]);
  // FIX: Added explicit return and wrapped content in a <main> tag
  return (
    <main>
      <HeroSection data={heroData} />
      <SecondHeroSection data={secondHeroData} />
      <VideoSection />
      <FeaturesSection data={features} />
      <CoreValuesSection data={coreValues} />

      {/* Coaches Section */}
      {coachesSectionData && (
        <section id="coaches" className="bg-black scroll-mt-28">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <div
              className="absolute inset-0 bg-cover bg-top filter grayscale"
              style={{
                backgroundImage: `url(${coachesSectionData.backgroundImage})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div> 
          </div>
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-12 mb-16">
              <div className="w-full md:w-1/2 space-y-4 text-gray-300">
                <motion.h2 
                  className="text-5xl md:text-7xl font-black mb-12 uppercase text-white border-b-[6px] border-b-red-600 w-fit"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {coachesSectionData.title}
                </motion.h2>
                <motion.div 
                  className="max-w-[550px] space-y-8 text-justify"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                >
                  <motion.p className="font-semibold text-white text-xl font-exo" variants={textVariants}>
                    {coachesSectionData.description}
                  </motion.p>
                </motion.div>
              </div>
              <motion.div 
                className="w-full md:w-1/2 flex flex-col gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
              >

                {
                  coachesSectionData.lenses.map((item, index) =>

                    <motion.div key={index} className="w-full" variants={textVariants}>
                      <ValueBlock title={item.title}>
                        {item.subtitle}
                      </ValueBlock>
                    </motion.div>
                  )
                }
              </motion.div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/ to-transparent"></div>
                    
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
          </div>
        </section>
      )}

      {/* Schedule Section */}
      <section id="schedule" className="py-16 sm:py-24 px-4 bg-black scroll-mt-28">
        <div className="container mx-auto">
          {/* Header section with title and print button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
              SCHEDULE
            </h2>
            <a
              href={schedulePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-bold py-3 px-6 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors rounded-md"
            >
              <span className="hidden sm:inline">PRINT SCHEDULE</span>
              <span className="sm:hidden">PRINT</span>
              <FaArrowRight className="transform -rotate-90 sm:rotate-0" />
            </a>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-800">
            {['All', 'Kids', 'Adult', 'BJJ', 'Muay Thai'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`py-2 px-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors border-b-2 ${filter === activeFilter
                    ? 'border-red-600 text-white'
                    : 'border-transparent'}`}>
                {filter}
              </button>
            ))}
          </div>

          {/* Day buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`py-3 px-5 text-sm font-bold rounded-md ${day.includes(today)
                    ? 'bg-red-600 text-white'
                    : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'}`}>
                                                {day}
                              </button>            ))}
          </div>

          {/* Schedule content */}
          <div className="bg-[#1a1a1a] p-1 rounded-lg">
            <div className="space-y-1">
              {(activeDay === 'Full Week' ? Object.values(groupedSchedule).flat() : groupedSchedule[activeDay.split(',')[0]] || [])
                .filter(item => activeFilter === 'All' || item.type === activeFilter)
                .map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-2 items-center bg-[#2d2d2d] p-3 rounded-md"
                >
                  <div className="col-span-full sm:col-span-2 font-bold text-lg text-gray-400">
                    {item.time}
                  </div>
                  <div className="col-span-full sm:col-span-6">
                    <h4 className="font-bold text-xl text-white">{item.program}</h4>
                    <p className="text-gray-400 text-sm">{item.level}</p>
                  </div>
                  <div className="col-span-full sm:col-span-4 text-left sm:text-right">
                    <span
                      className={`text-xs font-bold py-2 px-3 rounded-full bg-purple-900 text-purple-300`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-[#0d0d0d] scroll-mt-28">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2 uppercase text-white">Program Pricing</h2>
              <p className="text-gray-400">Currently we have 48 Classes covering over 50 hours a week of instruction in class times.</p>
            </div>
            <a href={schedulePdfUrl}  target="_blank"
  rel="noopener noreferrer" className="bg-red-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors rounded-md">
              <span>VIEW FULL PRICING</span>
              <FaArrowRight />
            </a>
          </div>

          {/* Adults Pricing */}
          <div className="mb-12">
            <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">ADULTS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.filter(tier => tier.type === 'ADULTS').map(tier => (
                <div key={tier.id} className={`bg-black p-8 border ${tier.highlighted ? 'border-red-500' : 'border-gray-800'} flex flex-col justify-between rounded-lg`}>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{tier.title}</h3>
                    <ul className="space-y-2 my-6 text-sm">
                      {Array.isArray(tier.features) && tier.features.map((feature, index) => (
                        <PricingFeature key={index} text={feature.text} included={feature.included} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white">{tier.price}</div>
                    <p className="text-xs text-gray-400">{tier.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kids Pricing */}
          <div>
            <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">KIDS</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.filter(tier => tier.type === 'KIDS').map(tier => (
                <div key={tier.id} className="bg-black p-8 border border-gray-800 text-center rounded-lg">
                  <h3 className="text-2xl font-bold mb-2 text-white">{tier.title}</h3>
                  <div className="text-4xl font-black my-4 text-white">${tier.price}</div>
                  <p className="text-xs text-gray-400">{tier.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apparel CTA Section */}
      <ApparelCTASection data={apparelCTAData} />
      
      <AnimatePresence>
        {selectedId && selectedCoachDetails && (
          <AnimatedCoachModal 
            id={selectedId} 
            coach={selectedCoachDetails} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
};


//=================================================================
//  FINAL EXPORTED PAGE
//=================================================================
export default function Home() {
  // --- ADDED: State management for the modal ---
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCoachDetails, setSelectedCoachDetails] = useState<CoachDetail | null>(null);

  // --- ADDED: Placeholder data ---
  const [heroData, setHeroData] = useState(null);
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/landing-page/intro-hero');
        if (response.ok) {
          const data = await response.json();
          setHeroData(JSON.parse(data.content));
        }
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
      }
    };
    fetchHeroData();
  }, []);

  const [secondHeroData, setSecondHeroData] = useState(null);

  useEffect(() => {
    const fetchSecondHeroData = async () => {
      try {
        const response = await fetch('/api/landing-page/second-hero');
        if (response.ok) {
          const data = await response.json();
          setSecondHeroData(data);
        }
      } catch (error) {
        console.error('Failed to fetch second hero data:', error);
      }
    };
    fetchSecondHeroData();
  }, []);

  const [coreValuesData, setCoreValuesData] = useState(null); // New state for core values

  useEffect(() => {
    const fetchCoreValuesData = async () => {
      try {
        const res = await fetch('/api/landing-page/core-values');
        const data = await res.json();
        setCoreValuesData(data);
      } catch (error) {
        console.error('Failed to fetch core values data:', error);
      }
    };
    fetchCoreValuesData();
  }, []);
  const [coachesData, setCoachesData] = useState<Coach[]>([]);
  const [allCoachDetails, setAllCoachDetails] = useState<{[key: string]: CoachDetail}>({});

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const coachesResponse = await fetch('/api/coaches');
        if (!coachesResponse.ok) {
          throw new Error('Failed to fetch coaches');
        }
        const coaches: Coach[] = await coachesResponse.json();
        setCoachesData(coaches);

        const details: {[key: string]: CoachDetail} = {};
        await Promise.all(coaches.map(async (coach) => {
          const coachDetailResponse = await fetch(`/api/coaches/${coach.id}`);
          if (!coachDetailResponse.ok) {
            console.error(`Failed to fetch details for coach: ${coach.id}`);
            return;
          }
          const coachDetail: CoachDetail = await coachDetailResponse.json();
          details[coach.id] = coachDetail;
        }));
        setAllCoachDetails(details);
      } catch (error) {
        console.error('Error fetching coaches data:', error);
      }
    };

    fetchCoaches();
  }, []);

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch('/api/schedule');
        if (response.ok) {
          const data = await response.json();
          setScheduleData(data);
        }
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      }
    };
    fetchScheduleData();
  }, []);


  // --- ADDED: Click handler function ---
  const handleCoachClick = (coachId: string) => {
    const details = allCoachDetails[coachId];
    if (details) {
      setSelectedCoachDetails(details);
      setSelectedId(coachId);
    }
  };

  const [featuresData, setFeaturesData] = useState(null); // New state for features

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const [disciplinesRes, gymFeaturesRes, descriptionRes] = await Promise.all([
          fetch('/api/landing-page/features/disciplines'),
          fetch('/api/landing-page/features/gym-features'),
          fetch('/api/landing-page/features/description'),
        ]);

        const disciplines = await disciplinesRes.json();
        const gymFeatures = await gymFeaturesRes.json();
        const { description, subtitle } = await descriptionRes.json();

        setFeaturesData({ disciplines, gymFeatures, description, subtitle });
      } catch (error) {
        console.error('Failed to fetch features data:', error);
      }
    };
    fetchFeaturesData();
  }, []);

  const [coachesSectionData, setCoachesSectionData] = useState(null);

  useEffect(() => {
    const fetchCoachesSectionData = async () => {
      try {
        const res = await fetch('/api/landing-page/coaches');
        const data = await res.json();
        setCoachesSectionData(data);
      } catch (error) {
        console.error('Failed to fetch coaches section data:', error);
      }
    };
    fetchCoachesSectionData();
  }, []);

  const [schedulePdfUrl, setSchedulePdfUrl] = useState('');

  useEffect(() => {
    const fetchSchedulePdfUrl = async () => {
      try {
        const response = await fetch('/api/schedule-pdf');
        if (response.ok) {
          const data = await response.json();
          setSchedulePdfUrl(data.url);
        }
      } catch (error) {
        console.error('Failed to fetch schedule PDF URL:', error);
      }
    };
    fetchSchedulePdfUrl();
  }, []);

  const [pricingTiers, setPricingTiers] = useState([]);

  useEffect(() => {
    const fetchPricingTiers = async () => {
      try {
        const response = await fetch('/api/pricing');
        if (response.ok) {
          const data = await response.json();
          setPricingTiers(data);
        }
      } catch (error) {
        console.error('Failed to fetch pricing tiers:', error);
      }
    };
    fetchPricingTiers();
  }, []);

  const [apparelCTAData, setApparelCTAData] = useState(null);

  useEffect(() => {
    const fetchApparelCTAData = async () => {
      try {
        const response = await fetch('/api/apparel-cta');
        if (response.ok) {
          const data = await response.json();
          setApparelCTAData(data);
        }
      } catch (error) {
        console.error('Failed to fetch apparel CTA data:', error);
      }
    };
    fetchApparelCTAData();
  }, []);

  useEffect(() => {
    const scrollToId = sessionStorage.getItem('scrollTo');
    if (scrollToId) {
      sessionStorage.removeItem('scrollTo');

      // Wait for a generous amount of time for the page to load and layout to stabilize.
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const headerOffset = 150; // Fixed offset for the sticky header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 1200); // Wait 1.2 seconds
    }
  }, []);

  return (
    <>
      <MainContent
        heroData={heroData}
        secondHeroData={secondHeroData}
        features={featuresData}
        coreValues={coreValuesData}
        coachesSectionData={coachesSectionData}
        coachesData={coachesData}
        scheduleData={scheduleData}
        schedulePdfUrl={schedulePdfUrl}
        selectedId={selectedId}
        selectedCoachDetails={selectedCoachDetails}
        handleCoachClick={handleCoachClick}
        setSelectedId={setSelectedId}
        pricingTiers={pricingTiers}
        apparelCTAData={apparelCTAData}
      />
    </>
  );
}
