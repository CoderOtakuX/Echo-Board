import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Hexagon, CheckCircle, ArrowRight, Circle,
    Cpu, BookOpen, Globe, Clapperboard,
    Utensils, Gamepad2, FlaskConical, Music,
    Palette, Dumbbell, Plane, Briefcase
} from 'lucide-react';

const InterestSetup = () => {
    const navigate = useNavigate();
    const [selectedInterests, setSelectedInterests] = useState(['tech', 'phil', 'news']);

    const interests = [
        { id: 'tech', name: 'Technology', icon: Cpu, activeLang: 12, global: true },
        { id: 'phil', name: 'Philosophy', icon: BookOpen, activeLang: 8, global: true },
        { id: 'news', name: 'World News', icon: Globe, activeLang: 45, global: true },
        { id: 'cinema', name: 'Cinema', icon: Clapperboard, activeLang: 15, global: true },
        { id: 'food', name: 'Culinary Arts', icon: Utensils, activeLang: 20, global: true },
        { id: 'gaming', name: 'Gaming', icon: Gamepad2, activeLang: 50, global: true },
        { id: 'science', name: 'Science', icon: FlaskConical, activeLang: 22, global: true },
        { id: 'music', name: 'Music', icon: Music, activeLang: 30, global: true },
    ];

    const toggleInterest = (id) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121022] text-slate-900 dark:text-slate-100 font-display flex flex-col">
            {/* Top Navigation / Progress */}
            <header className="w-full px-6 py-6 max-w-7xl mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <Hexagon className="text-primary fill-current dark:text-primary-light" size={32} strokeWidth={2.5} />
                            <span className="text-xl font-bold tracking-tight">EchoBoard</span>
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Step 4 of 4</p>
                    </div>
                    {/* Brutalist Progress Bar */}
                    <div className="h-4 w-full border-2 border-slate-700 bg-slate-900 relative">
                        <div className="absolute top-0 left-0 h-full bg-primary w-full transition-all duration-500 dark:bg-primary-light"></div>
                        {/* Stripes pattern overlay */}
                        <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-6 pb-24 max-w-7xl mx-auto w-full flex flex-col gap-8">
                {/* Header Text */}
                <div className="mt-4 md:mt-8 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase dark:text-white">
                        What do you want<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-400 dark:from-white dark:to-slate-400">to talk about?</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl dark:text-slate-400">
                        Define your EchoBoard. Select at least <span className="text-primary font-bold dark:text-primary-light">3 communities</span> to populate your global feed.
                    </p>
                </div>

                {/* Filter/Tags Row */}
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 border-2 border-primary bg-primary text-white font-bold uppercase text-sm shadow-brutalist transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all dark:bg-primary-light dark:border-primary-light dark:text-black">
                        All Topics
                    </button>
                    <button className="px-4 py-2 border-2 border-slate-700 hover:border-slate-500 bg-transparent text-slate-500 font-bold uppercase text-sm hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:bg-slate-800">
                        Trending
                    </button>
                    <button className="px-4 py-2 border-2 border-slate-700 hover:border-slate-500 bg-transparent text-slate-500 font-bold uppercase text-sm hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:bg-slate-800">
                        New
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {interests.map((interest) => {
                        const isSelected = selectedInterests.includes(interest.id);
                        return (
                            <div
                                key={interest.id}
                                onClick={() => toggleInterest(interest.id)}
                                className={`group cursor-pointer relative border-2 p-5 flex flex-col justify-between aspect-[4/3] transition-all duration-200 hover:-translate-y-1 ${isSelected
                                    ? 'border-primary bg-white shadow-brutalist dark:border-primary-light dark:bg-[#1a1828] dark:shadow-[4px_4px_0px_0px_#4f46e5]'
                                    : 'bg-white border-slate-300 hover:border-primary hover:shadow-brutalist dark:bg-[#1a1828] dark:border-slate-700 dark:hover:border-primary-light'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className={`w-12 h-12 flex items-center justify-center border transition-colors ${isSelected
                                        ? 'bg-primary/10 border-primary/20 dark:bg-white/10 dark:border-white/20'
                                        : 'bg-slate-100 border-slate-200 group-hover:bg-primary/5 group-hover:border-primary/50 dark:bg-slate-800 dark:border-slate-700'
                                        }`}>
                                        <interest.icon size={24} className={isSelected ? 'text-primary dark:text-white' : 'text-slate-500 group-hover:text-primary dark:text-slate-300'} />
                                    </div>
                                    {isSelected ? (
                                        <CheckCircle size={24} className="text-primary fill-current dark:text-primary-light" />
                                    ) : (
                                        <Circle size={24} className="text-slate-300 group-hover:text-primary dark:text-slate-700" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider border ${isSelected
                                            ? 'bg-primary/10 text-primary border-primary/20 dark:text-primary-light dark:border-primary-light/50'
                                            : 'bg-slate-100 text-slate-500 border-slate-200 group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            }`}>
                                            Global
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1 dark:text-white">{interest.name}</h3>
                                    <p className={`text-xs font-mono ${isSelected ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                        {interest.activeLang}+ Languages Active
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t-2 border-slate-200 p-4 md:p-6 z-50 dark:bg-[#121022]/95 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-primary dark:text-primary-light" size={24} fill="currentColor" />
                                <p className="text-slate-900 text-lg font-bold dark:text-white">{selectedInterests.length} Selected</p>
                            </div>
                            <p className="text-slate-500 text-sm hidden md:block dark:text-slate-400">Great start! You can always add more later.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-auto">
                        <button
                            onClick={() => navigate('/feed')}
                            className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 border-2 border-primary shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-wide dark:bg-primary-light dark:border-primary-light dark:hover:bg-primary dark:text-black"
                        >
                            Finish Setup
                            <ArrowRight size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterestSetup;
