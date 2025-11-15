'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Using an SVG component for the icon to ensure it matches the style
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className=" size-7" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const SchedulePage = () => {
    const [scheduleData, setScheduleData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeDay, setActiveDay] = useState('Full Week');

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('/api/schedule');
                const data = await response.json();
                setScheduleData(data);
            } catch (error) {
                console.error("Failed to fetch schedule:", error);
            }
        };
        fetchSchedule();
    }, []);

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
            const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(day.slice(0, 3));
            date.setDate(date.getDate() - date.getDay() + dayIndex + 1);
            const formattedDate = format(date, 'MMM d');
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

    const topFilters = ['All', 'Kids', 'Adult', 'BJJ', 'Muay Thai'];

    return (
        <div className="bg-[#121212] text-white min-h-screen  py-16">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                    <div className="mb-6 md:mb-0">
                        <h1 className="text-5xl lg:text-6xl font-black tracking-tighter">SCHEDULE THIS WEEK</h1>
                        <div className="h-1.5 bg-red-600 w-3/4 mt-1"></div>
                    </div>
                    <button className="flex items-stretch bg-red-600  text-base hover:bg-white hover:text-red-600 transition-colors duration-300 self-start md:self-auto">
                        <span className="pl-8 pr-6 py-5 font-bold text-xl">PRINT SCHEDULE</span>
                        <span className="flex items-center px-6" style={{borderLeft: '2px solid rgba(0,0,0,0.2)'}}>
                            <DownloadIcon />
                        </span>
                    </button>
                </div>

                <div className="flex flex-col text-sm font-semibold">
                    <div className="grid grid-cols-2 sm:grid-cols-5 text-center">
                        {topFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`py-3 px-2 border-r border-b border-black transition-colors duration-200 ${activeFilter === filter ? 'bg-red-600 text-white' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-7 text-center">
                        {days.map((filter, index) => (
                            <button
                                key={filter}
                                onClick={() => setActiveDay(filter)}
                                className={`py-3 px-2 border-r border-black transition-colors duration-200 ${activeDay === filter ? 'bg-red-600 text-white' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-[#222222]">
                    {(activeDay === 'Full Week' ? Object.values(groupedSchedule).flat() : groupedSchedule[activeDay.split(',')[0]] || [])
                        .filter(item => activeFilter === 'All' || item.type === activeFilter)
                        .map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border-b border-[#333333]">
                           <div className="flex items-center gap-x-4 sm:gap-x-6">
                                <div className="w-20 sm:w-28 flex-shrink-0">
                                    <div className="font-bold text-base sm:text-lg">{item.time}</div>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        <span className="bg-[#4a4a4a] text-gray-200 text-xs font-bold px-2 py-0.5 rounded-md">
                                            {item.day.substring(0, 3)}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold">{item.program}</h3>
                                    <p className="text-gray-400 text-sm">{item.level}</p>
                                </div>
                           </div>
                            <div className="flex-shrink-0 ml-4">
                                <span className={`px-3 py-2 text-xs font-semibold rounded-md bg-[#6a617a]`}>
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;