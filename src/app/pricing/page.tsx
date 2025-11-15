"use client";


import React from 'react';
import { fetchApi } from '@/lib/api';

// --- INTERFACES --- //
interface PricingFeatureProps {
    text: string;
    included: boolean;
}

interface PricingTier {
    id: string;
    type: 'ADULTS' | 'KIDS';
    title: string;
    price: string;
    duration: string;
    highlighted?: boolean;
    features: PricingFeatureProps[];
}

interface AddOnPlan {
    id: string;
    name: string;
    description: string;
    price: string;
}

interface KidsPricingPlan {
    id: string;
    type: 'KIDS';
    title: string;
    price: string;
    duration: string; // Changed from 'term' to 'duration' for consistency
    monthly: string;
}

// --- ICON COMPONENTS --- //
const CheckIcon = () => (
    <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const ArrowIcon = () => (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
);

// --- REUSABLE COMPONENTS --- //
const PricingFeature = ({ text, included = true }: PricingFeatureProps) => (
    <li className={`flex items-center space-x-3 ${included ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
        {included ? <CheckIcon /> : <CrossIcon />}
        <span>{text}</span>
    </li>
);

const PricingCard = ({ plan }: { plan: PricingTier }) => (
    <div className="p-8">
        <h3 className="text-3xl font-black tracking-[0.1em]">{plan.title}</h3>
        <p className="text-gray-400 mt-4 mb-6 min-h-[110px]">{plan.description}</p>
        <ul className="space-y-3 mb-8">
            {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                <PricingFeature key={index} text={feature.text} included={feature.included} />
            ))}
        </ul>
        <div className="text-5xl font-black">${plan.price}</div>
        <p className="mt-2 text-gray-300">{plan.duration}</p>
        <p className="text-gray-500">or ${parseInt(plan.price) + 20} monthly</p>
    </div>
);

const AddOnCard = ({ plan }: { plan: AddOnPlan }) => (
    <div className="p-8 h-full flex flex-col">
        <h3 className="text-3xl font-black tracking-[0.1em]">{plan.name}</h3>
        <p className="text-gray-400 mt-4 mb-6">{plan.description}</p>
        <div className="mt-auto">
            <div className="text-5xl font-black">${plan.price}</div>
            <div className="flex items-center gap-x-4">
                <p className="mt-2 text-gray-300">Monthly</p>
            </div>
        </div>
    </div>
);

const KidsPricingCard = ({ plan }: { plan: KidsPricingPlan }) => (
    <div className="p-8">
        <h3 className="text-2xl font-black">{plan.title}</h3>
        <div className="mt-8 text-5xl font-black">${plan.price}</div>
        <p className="mt-2 text-gray-300">{plan.duration}</p>
        <p className="text-gray-500">{plan.monthly}</p>
    </div>
);

const SectionBanner = ({ title }: { title: string }) => (
    <div className="bg-red-600 text-white font-bold text-2xl py-3 px-8">
        {title}
    </div>
);


// --- MAIN PAGE COMPONENT --- //
const PricingPage = () => {
    const [adultPlansData, setAdultPlansData] = React.useState<PricingTier[]>([]);
    const [addOnPlansData, setAddOnPlansData] = React.useState<AddOnPlan[]>([]);
    const [kidsPlansData, setKidsPlansData] = React.useState<KidsPricingPlan[]>([]);

// ...
    React.useEffect(() => {
        const fetchPricing = async () => {
            try {
                const pricingData: PricingTier[] = await fetchApi('pricing');
                setAdultPlansData(pricingData.filter(p => p.type === 'ADULTS'));
                setKidsPlansData(pricingData.filter(p => p.type === 'KIDS'));

                const addonData: AddOnPlan[] = await fetchApi('addon');
                setAddOnPlansData(addonData);
            } catch (error) {
                console.error("Failed to fetch pricing data:", error);
            }
        };
        fetchPricing();
    }, []);
    return (
        <div className="bg-[#121212] text-white">
            <div className="container mx-auto max-w-8xl px-4 py-20">
                
                {/* Header */}
               <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
  <div>
    <h1 className="text-5xl lg:text-6xl font-black tracking-wider">PROGRAM PRICING</h1>
    <p className="text-lg text-gray-300 mt-2">
      Currently we have 48 Classes covering over 50 hours a week of instruction in class times.
    </p>
  </div>

  <a
    href="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f184a3ec261e1127d49e76_Warrior%20Price%20List%20(current%20as%20of%20Feb%202024).pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-stretch bg-red-600 text-base hover:bg-white hover:text-red-600 transition-colors duration-300 self-start md:self-auto"
  >
    <span className="pl-8 pr-6 py-5 font-bold text-xl">VIEW FULL PRICING</span>
    <span className="flex items-center px-4" style={{ borderLeft: '2px solid rgba(0,0,0,0.2)' }}>
      <ArrowIcon />
    </span>
  </a>
</div>


                {/* Adults Section */}
                <section>
                    <SectionBanner title="ADULTS" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-b gap-4 border-gray-800">
                        {adultPlansData.map((plan, index) => (
                            <div key={index} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <PricingCard plan={plan} />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-l border-b border-gray-800 mt-4 gap-4">
                        {addOnPlansData.map(plan => (
                             <div key={plan.id} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <AddOnCard plan={plan} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Kids Section */}
                <section className="mt-16">
                    <SectionBanner title="KIDS" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-b border-gray-800">
                        {kidsPlansData.map((plan, index) => (
                           <div key={index} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <KidsPricingCard plan={plan} />
                           </div>
                        ))}
                    </div>
                </section>
                
                {/* Disclaimer */}
                <footer className="text-center text-gray-400 mt-12 space-y-4 text-sm max-w-4xl mx-auto">
                    <p>
                        <strong className="text-white">Active Military / LEO / First Responder discounts are applied to the month-to-month price.</strong><br/>
                        BJJ: $20.00 off (14%) Muay Thai: its $20.00 (14%) All-Inclusive: $30.00 off (18%) Premiere: $30.00 (19%)
                    </p>
                    <p>
                        Family rates cap out at $350 monthly for all members. Immediate family only.<br/>
                        Must be active military, LEO, first responder or on a six-month commitment plan for discount to apply.
                    </p>
                    <p>**Premiere Membership cannot be combined with membership discount / family rates.</p>
                </footer>
            </div>
        </div>
    );
};

export default PricingPage;