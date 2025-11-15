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
//  HELPER COMPONENTS & DATA
//=================================================================
const PricingFeature = ({ text, included = true }) => (
  <li className={`flex items-center space-x-3 ${included ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
    {included ? <FaCheckCircle className="text-red-500" /> : <FaTimesCircle className="text-gray-700" />}
    <span>{text}</span>
  </li>
);

const scheduleData = {
  'Sat, Oct 18': [
    { time: '9:00-10:00', name: 'Muay Thai', level: 'All Levels', category: 'Muay Thai Adult' },
    { time: '10:00-11:00', name: 'BJJ Fundamentals', level: 'Adults and Children', category: 'BJJ Adult' },
    { time: '10:00-11:00', name: 'Kids Muay Thai', level: 'All Ages, All Levels', category: 'Muay Thai Kids' },
    { time: '11:00-12:00', name: 'Fighter Practice', level: 'MMA / Muay Thai', category: 'All-Inclusive' },
    { time: '11:00-13:00', name: 'No-Gi Open Mat', level: 'All Levels', category: 'BJJ Adult' },
  ]
};

interface Coach {
    slug: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

interface CoachDetailsData { [key: string]: CoachDetail; }



//=================================================================
//  SECTION COMPONENTS
//=================================================================

const IntroSection = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e95350c431166c54c51460_warrior_01.jpg"
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Join our world class mma training programs for all levels - from <span className="text-red-600">beginners</span> to <span className="text-red-600">pros.</span>
            </h2>
            <p className="mt-8 text-gray-300 leading-relaxed max-w-lg">
              Our gym has had both a local and a national presence since its founding in 2011, <strong className="text-white">however its roots go much deeper.</strong> Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community.
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold uppercase tracking-wide">
                We are a family, and we are a team.
              </h3>
              <div className="w-48 h-1.5 bg-red-600 mt-2"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="bg-black py-12 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="relative h-0 pb-[56.25%]">
          <video
            className="absolute top-0 left-0 w-full h-full rounded-2xl md:rounded-[3rem]"
            controls={false}
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/123.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
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
      <div className="w-6 text-center">{icon}</div>
      <span>{text}</span>
    </li>
  );
  return (
    // FIX APPLIED HERE
    <section id="disciplines" className="bg-[#121212] text-white py-16 sm:py-24 px-4 overflow-hidden scroll-mt-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col space-y-16">
            <div>
              <SectionTitle title="Disciplines" />
              <ul className="mt-8 space-y-4">
                <DisciplineLink href="/disciplines/jutsu">Brazillian Jiu-Jitsu</DisciplineLink>
                <DisciplineLink href="/disciplines/mua-thai">Muay Thai</DisciplineLink>
                <DisciplineLink href="/disciplines/mma">Mixed Martial Arts</DisciplineLink>
                <DisciplineLink href="/disciplines/fitness">Fitness</DisciplineLink>
              </ul>
            </div>
            <div>
              <SectionTitle title="Gym Features" />
              <ul className="mt-8 space-y-4">
                <GymFeature icon={<FaDumbbell />} text="Access to Open Gym" />
                <GymFeature icon={<FaBatteryFull />} text="Recovery and Wellness Facilities" />
                <GymFeature icon={<FaCalendarAlt />} text="Open 6 Days / Week" />
                <GymFeature icon={<FaUserFriends />} text="12 Trainers" />
                <GymFeature icon={<FaMedal />} text="23 World Medals" />
                <GymFeature icon={<FaSmile />} text="1478 Happy Clients" />
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
                We are students, athletes, and builders of our team. <strong className="text-white">Warrior Fitness Center</strong> is home to a diverse and dedicated community united by our shared pursuit of growth through martial arts. Our training blends Brazillian Jiu-Jitsu, Muay Thai, Wrestling, Judo, and MMA to foster personal development, confidence, and discipline in an atmosphere that feels like family.
              </p>
              <p>
                Our coaching staff reflects the diversity of our community, each bringing a wealth of experience from different walks of life. This variety isn’t just a point of pride; it’s a strength that enriches our students’ learning. With coaches who’ve lived through high-level competition, military service, and personal transformation, we offer perspectives that go beyond the technical and into the mental, emotional, and strategic dimensions of martial arts.
              </p>
              <p>
                Whether you’re just starting your journey or looking to sharpen your edge, you’ll find guidance, accountability, and support here. We are a team that trains, learns, and grows together—while pushing each other toward the next accomplishment in life.
              </p>
              <div className="pt-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                  We are a family, and we are a team.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreValuesSection = () => {

  return (
    // FIX APPLIED HERE
    <section id="who-we-are" className="bg-black text-white py-16 sm:py-24 px-4 scroll-mt-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase">Are We Right For You</h2>
            <div className="w-44 h-1.5 bg-red-600 mb-12"></div>
            <div className="space-y-6 text-white-400 leading-relaxed max-w-xl">
              <p>
                At Warrior, we recognize that every student walks through our doors with a unique set of goals, motivations, and reasons for training. Some come to compete, some to get in shape, some for self-defense, and others to find structure or community. We believe wholeheartedly that these goals don’t need to be the same for us to support one another. In fact, it’s the diversity of those goals—and the shared commitment to growth—that makes our community strong.
              </p>
              <p>
                We approach training with a mindset rooted in collaboration, not transaction. It’s not about what you get in return—it’s about how we all grow stronger by investing in each other. When one person levels up, we all benefit. When one person struggles, we all step in.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            <ValueBlock title="Realism">
              We train for real life. The foundation of our practice is self-defense and practical application—not gamesmanship.
            </ValueBlock>
            <ValueBlock title="Growth Mindset">
              We believe that who you are today doesn’t define who you can become.
            </ValueBlock>
            <ValueBlock title="Respect">
              Even when it’s not obvious, respect is always present.
            </ValueBlock>
            <ValueBlock title="Safety">
              Training is only sustainable when we take care of each other.
            </ValueBlock>
            <ValueBlock title="Diversity">
              We embrace different styles, and perspectives.
            </ValueBlock>
            <ValueBlock title="Cohesion">
              We are individuals, but we train as one team.
            </ValueBlock>
          </div>
        </div>
      </div>
    </section>
  );
};


//=================================================================
//  MAIN CONTENT COMPONENT
//=================================================================
const MainContent = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [allCoachDetails, setAllCoachDetails] = useState<CoachDetailsData>({});
  const [coachesData, setCoachesData] = useState<Coach[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
        try {
            const response = await fetch('/coachDetails.json');
            const data: CoachDetailsData = await response.json();
            setAllCoachDetails(data);
            const coachesList = Object.keys(data).map(slug => ({
                slug,
                name: data[slug].name,
                specialties: data[slug].specialties,
                imageUrl: data[slug].imageUrl,
            }));
            setCoachesData(coachesList);
        } catch (error) {
            console.error("Failed to fetch coach details:", error);
        }
    };
    fetchCoaches();
  }, []);

  const selectedCoachDetails = selectedSlug ? allCoachDetails[selectedSlug] : null;
  
  const handleCoachClick = (slug: string) => {
    setSelectedSlug(slug);
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative h-[calc(100vh-100px)] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
          src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f43_homepageclipwarrior-transcode.mp4"
        />
        <div className="relative h-full mix-blend-screen flex flex-col justify-center items-center text-center">
          <div className="absolute w-full top-0 text-start">
            <div className="bg-white ">
              <h1 className="text-6xl md:text-[16vw] lg:text-[12vw] font-clashDisplay font-black uppercase leading-tight md:leading-none text-black p-4">
                Train like a<br />Champion
              </h1>
            </div>
          </div>
        </div>
        <Image
          src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f16_warrioricon.svg"
          alt="Warrior Logo"
          width={1920}
          height={1080}
          className="hidden lg:block absolute top-48 right-20 transform -translate-y-[5%] translate-x-[15%] w-[35%] h-auto"
        />
        <div className="hidden sm:block absolute bottom-10 left-4 sm:left-10 z-20 text-sm uppercase tracking-[0.5em] text-white">
          S C R O L L
        </div>
      </section>

      <IntroSection />
      <VideoSection />
      <FeaturesSection />
      <CoreValuesSection />

      {/* Coaches Section */}
      {/* FIX APPLIED HERE */}
      <section id="coaches" className="bg-black scroll-mt-28">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <div
            className="absolute inset-0 bg-cover bg-top filter grayscale"
            style={{
              backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div> 
        </div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-12 mb-16">
            <div className="w-full md:w-1/2 space-y-4 text-gray-300">
              <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase text-white border-b-[6px] border-b-red-600 w-fit">Our Coaches</h2>
              <div className="max-w-[550px] space-y-8 text-justify">
                <p className="font-semibold text-white text-xl font-exo">With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.</p>
                <p className="text-gray-400 text-xl">Our coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.</p>
                <p className="text-gray-400 text-xl">We teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">

              {
                [{
                  title: "STREET",
                  subtitle: `Training should be grounded in real-life efficacy. We prioritize practical applicability over sport-specific rulesets or "gaming" the system.`,
                },
                {
                  title: "SPORT",
                  subtitle: "Sport offers structure, feedback, and challenge. Competing isn't the only goal—growth is. From drilling to tournaments, every layer is an opportunity to refine your skills.",
                },
                {
                  title: "ART",
                  subtitle: "Martial arts is also a path of self-discovery. Through the joy of training, we strive to uncover personal truth and embrace continuous improvement.",
                },].map((item, index) =>

                  <div key={index} className="w-full">
                    <ValueBlock title={item.title}>
                      {item.subtitle}
                    </ValueBlock>
                  </div>
                )
              }


            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coachesData.map(coach => (
              <motion.div 
                key={coach.slug} 
                layoutId={coach.slug}
                onClick={() => handleCoachClick(coach.slug)}
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

      {/* Schedule Section */}
      {/* FIX APPLIED HERE */}
      <section id="schedule" className="py-16 sm:py-24 px-4 bg-black scroll-mt-28">
  <div className="container mx-auto">
    {/* Header section with title and print button */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
        SCHEDULE
      </h2>
      <a
        href="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f44_schedule-june-2025%20(2)%20(1).pdf"
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
          className={`py-2 px-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors border-b-2 ${
            filter === 'All'
              ? 'border-red-600 text-white'
              : 'border-transparent'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Day buttons */}
    <div className="flex flex-wrap gap-2 mb-8">
      {[
        'Full Week',
        'Mon, Oct 13',
        'Tue, Oct 14',
        'Wed, Oct 15',
        'Thu, Oct 16',
        'Fri, Oct 17',
        'Today: Sat, Oct 18',
      ].map(day => (
        <button
          key={day}
          className={`py-3 px-5 text-sm font-bold rounded-md ${
            day.includes('Today')
              ? 'bg-red-600 text-white'
              : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
          }`}
        >
          {day.split(':')[0]}
        </button>
      ))}
    </div>

    {/* Schedule content */}
    <div className="bg-[#1a1a1a] p-1 rounded-lg">
      <div className="space-y-1">
        {scheduleData['Sat, Oct 18'].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-2 items-center bg-[#2d2d2d] p-3 rounded-md"
          >
            <div className="col-span-full sm:col-span-2 font-bold text-lg text-gray-400">
              {item.time}
            </div>
            <div className="col-span-full sm:col-span-6">
              <h4 className="font-bold text-xl text-white">{item.name}</h4>
              <p className="text-gray-400 text-sm">{item.level}</p>
            </div>
            <div className="col-span-full sm:col-span-4 text-left sm:text-right">
              <span
                className={`text-xs font-bold py-2 px-3 rounded-full ${
                  item.category.includes('Muay Thai')
                    ? 'bg-purple-900 text-purple-300'
                    : 'bg-blue-900 text-blue-300'
                }`}
              >
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Pricing Section */}
      {/* FIX APPLIED HERE */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-[#0d0d0d] scroll-mt-28">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2 uppercase text-white">Program Pricing</h2>
              <p className="text-gray-400">Currently we have 48 Classes covering over 50 hours a week of instruction in class times.</p>
            </div>
            <a href="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f184a3ec261e1127d49e76_Warrior%20Price%20List%20(current%20as%20of%20Feb%202024).pdf"  target="_blank"
  rel="noopener noreferrer" className="bg-red-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors rounded-md">
              <span>VIEW FULL PRICING</span>
              <FaArrowRight />
            </a>
          </div>

          {/* Adults Pricing */}
          <div className="mb-12">
            <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">ADULTS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pricing cards are already responsive with grid-cols-1 default */}
              <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between rounded-lg">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">MUAY THAI ONLY</h3>
                  <ul className="space-y-2 my-6 text-sm">
                    <PricingFeature text="Access Fitness Equipment" />
                    <PricingFeature text="Access to Open Gym" />
                    <PricingFeature text="Access 6 Days / Week" />
                    <PricingFeature text="Style Specific Group Classes" />
                    <PricingFeature text="Recovery Room" included={false} />
                    <PricingFeature text="Included Private Lessons" included={false} />
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">$119.99</div>
                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                </div>
              </div>
              <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between rounded-lg">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">JIU JITSU ONLY</h3>
                  <ul className="space-y-2 my-6 text-sm">
                    <PricingFeature text="Access Fitness Equipment" />
                    <PricingFeature text="Access to Open Gym" />
                    <PricingFeature text="Access 6 Days / Week" />
                    <PricingFeature text="Style Specific Group Classes" />
                    <PricingFeature text="Recovery Room" included={false} />
                    <PricingFeature text="Included Private Lessons" included={false} />
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">$119.99</div>
                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                </div>
              </div>
              <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between rounded-lg">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">ALL INCLUSIVE</h3>
                  <ul className="space-y-2 my-6 text-sm">
                    <PricingFeature text="Access Fitness Equipment" />
                    <PricingFeature text="Access to Open Gym" />
                    <PricingFeature text="Access 6 Days / Week" />
                    <PricingFeature text="All Group Classes" />
                    <PricingFeature text="Access All Available Classes" />
                    <PricingFeature text="Recovery Room" included={false} />
                    <PricingFeature text="Included Private Lessons" included={false} />
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">$139.99</div>
                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                </div>
              </div>
              <div className="bg-black p-8 border-2 border-red-500 flex flex-col justify-between rounded-lg">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">PREMIER**</h3>
                  <ul className="space-y-2 my-6 text-sm">
                    <PricingFeature text="Access Fitness Equipment" />
                    <PricingFeature text="Access to Open Gym" />
                    <PricingFeature text="Access 6 Days / Week" />
                    <PricingFeature text="All Group Classes" />
                    <PricingFeature text="Access All Available Classes" />
                    <PricingFeature text="Recovery Room" />
                    <PricingFeature text="One Private Lesson per Month" />
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">$199.99</div>
                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kids Pricing */}
          <div>
            <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">KIDS</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black p-8 border border-gray-800 text-center rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-white">MUAY THAI ONLY</h3>
                <div className="text-4xl font-black my-4 text-white">$99.99</div>
                <p className="text-xs text-gray-400">Per Month for 6 Months</p>
              </div>
              <div className="bg-black p-8 border border-gray-800 text-center rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-white">JIU JITSU ONLY</h3>
                <div className="text-4xl font-black my-4 text-white">$99.99</div>
                <p className="text-xs text-gray-400">Per Month for 6 Months</p>
              </div>
              <div className="bg-black p-8 border border-gray-800 text-center rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-white">ALL INCLUSIVE</h3>
                <div className="text-4xl font-black my-4 text-white">$119.99</div>
                <p className="text-xs text-gray-400">Per Month for 6 Months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apparel CTA Section */}
      <section className="py-16 sm:py-24 px-4 bg-black relative text-center" style={{ backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e6b3e3f604320d81e7c52f_warcollegeproducts.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center">
          <img src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f42_warforgedwhite.png" alt="War Forged Apparel" className="w-36 sm:w-48 h-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4 text-white">Shop War Forged Apparel</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Based in Colorado Springs, we're a team of veterans, competitors, and fighters committed to providing exceptional, affordable gear and lifestyle clothing for athletes of all levels.
          </p>
          <a href="https://warforgedapparel.com/" className="bg-red-600 text-white font-bold py-4 px-10 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors rounded-md">
            <span>SHOP NOW</span>
            <FaArrowRight />
          </a>
        </div>
      </section>
      <AnimatePresence>
        {selectedSlug && selectedCoachDetails && (
          <AnimatedCoachModal 
            slug={selectedSlug} 
            coach={selectedCoachDetails} 
            onClose={() => setSelectedSlug(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

//=================================================================
//  FINAL EXPORTED PAGE
//=================================================================
export default function Home() {
  return (
    <>
      <MainContent />
    </>
  );
}