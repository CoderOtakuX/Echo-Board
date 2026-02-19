import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Zap, Check } from 'lucide-react';

const LanguageSetup = () => {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState('jp');

    const languages = [
        { code: 'jp', flag: '🇯🇵', name: 'Japanese', native: '日本語', active: true },
        { code: 'en', flag: '🇺🇸', name: 'English', native: 'English', active: false },
        { code: 'es', flag: '🇪🇸', name: 'Spanish', native: 'Español', active: false },
        { code: 'hi', flag: '🇮🇳', name: 'Hindi', native: 'हिन्दी', active: false },
        { code: 'fr', flag: '🇫🇷', name: 'French', native: 'Français', active: false },
        { code: 'de', flag: '🇩🇪', name: 'German', native: 'Deutsch', active: false },
        { code: 'zh', flag: '🇨🇳', name: 'Chinese', native: '中文', active: false },
        { code: 'pt', flag: '🇧🇷', name: 'Portuguese', native: 'Português', active: false },
        { code: 'ar', flag: '🇸🇦', name: 'Arabic', native: 'العربية', active: false },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col font-sans selection:bg-primary selection:text-white">
            {/* Header */}
            <header className="w-full border-b-2 border-slate-800 px-6 py-5 flex items-center justify-between z-10 sticky top-0 bg-[#0A0A0F]/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary flex items-center justify-center text-white border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl tracking-tight uppercase">EchoBoard</span>
                </div>
                <div className="hidden md:flex items-center gap-4 text-sm font-bold font-mono">
                    <span className="text-slate-400 uppercase">Step 1/3</span>
                    <div className="w-32 h-3 bg-slate-800 border border-slate-700">
                        <div className="h-full w-1/3 bg-primary border-r-2 border-black"></div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm font-bold font-mono uppercase text-slate-400 hover:text-white hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors"
                >
                    Skip Intro
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="w-full max-w-5xl z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left Column: Info */}
                        <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-10">
                            <div className="inline-block self-start px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white shadow-[2px_2px_0px_0px_#FFF]">
                                Language Identity
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-white">
                                Choose<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark" style={{ WebkitTextStroke: '1px white' }}>Your Voice</span>
                            </h1>
                            <div className="bg-[#1A1A24] border-2 border-slate-700 p-6 shadow-brutalist relative mt-4">
                                <div className="absolute -top-3 -right-3 bg-white text-black font-bold px-2 py-0.5 text-xs border-2 border-black transform rotate-3">IMPORTANT</div>
                                <p className="text-lg text-slate-300 font-medium leading-relaxed">
                                    This is your <span className="text-white bg-primary/20 px-1 border-b-2 border-primary">native writing language</span>.
                                </p>
                                <p className="text-slate-500 mt-3 text-sm font-mono">
                                    // EchoBoard will automatically translate your posts to other users' native languages while preserving your unique tone and nuance.
                                </p>
                            </div>
                            <div className="hidden lg:flex gap-6 mt-8">
                                <div className="flex flex-col gap-2">
                                    <Lock size={32} className="text-primary" />
                                    <span className="font-mono text-xs uppercase text-slate-500 font-bold">End-to-End<br />Privacy</span>
                                </div>
                                <div className="w-px bg-slate-800"></div>
                                <div className="flex flex-col gap-2">
                                    <Zap size={32} className="text-primary" fill="currentColor" />
                                    <span className="font-mono text-xs uppercase text-slate-500 font-bold">Real-time<br />Translation</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Selection */}
                        <div className="lg:col-span-7 w-full">
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-end border-b-2 border-slate-800 pb-2 mb-2">
                                    <label className="font-mono text-sm text-primary font-bold uppercase">
                                        &gt; Select Primary Language_
                                    </label>
                                    <span className="text-xs text-slate-500 font-mono">124 Available</span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 pb-2">
                                    {languages.map((lang) => (
                                        <label key={lang.code} className="group relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="language"
                                                value={lang.code}
                                                checked={selectedLang === lang.code}
                                                onChange={() => setSelectedLang(lang.code)}
                                                className="peer sr-only"
                                            />
                                            <div className={`h-full flex flex-col items-center justify-center p-4 border-2 transition-all duration-100 ${selectedLang === lang.code ? 'border-primary bg-primary text-white translate-x-[2px] translate-y-[2px] shadow-none' : 'border-slate-700 bg-[#16161D] hover:border-primary hover:bg-[#1A1A24] shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'}`}>
                                                {selectedLang === lang.code && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="bg-white text-primary rounded-full p-0.5">
                                                            <Check size={12} strokeWidth={4} />
                                                        </div>
                                                    </div>
                                                )}
                                                <span className={`text-3xl mb-2 transition-all ${selectedLang === lang.code ? 'filter drop-shadow-md' : 'grayscale group-hover:grayscale-0'}`}>{lang.flag}</span>
                                                <span className={`font-bold text-lg uppercase tracking-tight ${selectedLang === lang.code ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{lang.name}</span>
                                                <span className={`font-mono text-xs ${selectedLang === lang.code ? 'opacity-75' : 'text-slate-600 group-hover:text-slate-400'}`}>{lang.native}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => navigate('/onboarding/profile')}
                                        className="w-full sm:w-auto relative group bg-primary hover:bg-primary-dark text-white font-black text-xl px-12 py-5 border-2 border-white transition-all shadow-[6px_6px_0px_0px_#FFF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-3 uppercase tracking-wider"
                                    >
                                        <span>Next: Verify Identity</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="w-full py-6 text-center text-xs font-mono text-slate-600 uppercase tracking-widest bg-[#0A0A0F]">
                <p>EchoBoard System v2.0 • Establish Connection</p>
            </footer>
        </div>
    );
};

export default LanguageSetup;
