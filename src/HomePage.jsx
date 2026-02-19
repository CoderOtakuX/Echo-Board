// EchoBoard — HomePage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Globe, Lightbulb, Zap, ArrowRight } from 'lucide-react';

const HomePage = () => {
    // Access global state from Layout if needed, though for now we drift props
    // const { isDarkMode } = useOutletContext(); 
    // Actually, we can just use the 'dark' class on html, but let's grab context if we want specific conditional rendering
    // that relies on JS state rather than CSS classes. 
    // Ideally we should rely on CSS 'dark:' classes which we set in Layout.

    // However, some parts of previous HomePage used `isDarkMode ? ... : ...` logic for colors that Tailwind config might not cover easily 
    // without extensive 'dark:' overrides. 
    // Let's rely on standard Tailwind 'dark:' where possible, but for the specific inline conditionals we had,
    // we can use the context.

    const { isDarkMode } = useOutletContext();

    return (
        <div className="flex flex-col items-center justify-center w-full">

            {/* Inline Styles for specific animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
                .animate-float-slow { animation: float 6s ease-in-out infinite; }
                .animate-float-medium { animation: float 5s ease-in-out infinite 1s; }
                .animate-float-fast { animation: float 4s ease-in-out infinite 2s; }
            `}</style>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-20 text-center w-full max-w-7xl">

                {/* Floating Language Pills */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block mx-auto">
                    <div className={`absolute top-[15%] left-[5%] animate-float-slow transform -rotate-6 px-6 py-2 rounded-full text-xl font-black border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-[#F0F0FF]' : 'bg-white border-black text-slate-800'}`}>
                        日本語
                    </div>
                    <div className={`absolute top-[20%] right-[8%] animate-float-medium transform rotate-12 px-6 py-2 rounded-full text-xl font-black border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-[#F0F0FF]' : 'bg-white border-black text-slate-800'}`}>
                        Español
                    </div>
                    <div className={`absolute top-[55%] left-[10%] animate-float-fast transform rotate-3 px-5 py-1.5 rounded-full text-lg font-black border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-[#F0F0FF]' : 'bg-white border-black text-slate-800'}`}>
                        Français
                    </div>
                </div>

                {/* Mobile Pills (Inline) */}
                <div className="lg:hidden flex flex-wrap justify-center gap-3 mb-8">
                    {['日本語', 'Español', 'Français'].map((lang, i) => (
                        <span key={lang} className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-[#F0F0FF]' : 'bg-white border-black text-slate-800'}`}>
                            {lang}
                        </span>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-4 mb-8">
                    <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1] drop-shadow-sm">
                        <span className={isDarkMode ? 'text-white' : 'text-black'}>Every voice.</span> <br />
                        <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode ? 'from-[#6C63FF] to-[#8075FF]' : 'from-[#4F46E5] to-[#3b82f6]'}`}>Every language.</span> <br />
                        <span className={isDarkMode ? 'text-white' : 'text-black'}>One conversation.</span>
                    </h1>
                </div>

                <p className={`max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-relaxed mb-12 ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-600'}`}>
                    Write in your native tongue. The world reads in theirs. Experience the first social platform with invisible, real-time translation and deep cultural context.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 w-full sm:w-auto">
                    <button className={`relative w-full sm:w-auto h-16 px-10 rounded-full text-lg font-black border-2 shadow-brutalist-thick hover:shadow-brutalist-thick-hover hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center justify-center gap-2 group ${isDarkMode ? 'bg-[#6C63FF] border-white text-white' : 'bg-[#4F46E5] border-black text-white'}`}>
                        Start Talking
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className={`w-full sm:w-auto h-16 px-8 rounded-full text-lg font-bold border-2 shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center justify-center ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-white' : 'bg-white border-black text-black'}`}>
                        See How It Works
                    </button>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col items-center gap-4 animate-fade-in-up">
                    <div className="flex items-center -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-[#111118]' : 'border-black'} bg-gradient-to-br from-indigo-400 to-purple-400`}></div>
                        ))}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-white text-black border-[#111118]' : 'bg-black text-white border-black'}`}>
                            +2k
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 text-sm font-bold px-4 py-1 rounded-full border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-[#F0F0FF]' : 'bg-white border-black text-slate-800'}`}>
                        <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black"></span>
                            Active now in 140+ countries
                        </span>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className={`relative z-10 w-full border-t-2 ${isDarkMode ? 'bg-[#0A0A0F] border-[#2A2A3A]' : 'bg-white border-black'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

                        {/* Card 1 */}
                        <div className={`flex flex-col gap-4 group p-8 border-2 rounded-2xl shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${isDarkMode ? 'bg-[#1A1A2E] border-[#2A2A3A]' : 'bg-[#E8EDF5] border-black'}`}>
                            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-[#0A0A0F] border-white text-white' : 'bg-white border-black text-black'}`}>
                                <Globe size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Invisible Translation</h3>
                                <p className={`leading-relaxed font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-700'}`}>
                                    Zero friction language barriers. Messages are translated instantly as you read, preserving the flow of conversation.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className={`flex flex-col gap-4 group p-8 border-2 rounded-2xl shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 md:col-span-2 lg:col-span-1 ${isDarkMode ? 'bg-[#1A180E] border-[#2A2A3A]' : 'bg-[#FDF8E8] border-black'}`}>
                            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-[#0A0A0F] border-white text-white' : 'bg-white border-black text-black'}`}>
                                <Lightbulb size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Cultural Context</h3>
                                <p className={`leading-relaxed font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-700'}`}>
                                    Nuance, not just literal meaning. Our AI detects idioms and cultural references to help you truly understand.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className={`flex flex-col gap-4 group p-8 border-2 rounded-2xl shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 lg:col-span-1 md:col-span-2 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-[#1A1A24] border-black'}`}>
                            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-[#0A0A0F] border-white text-white' : 'bg-white border-white text-black'}`}>
                                <Zap size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-3">Real-Time</h3>
                                <p className="text-slate-300 leading-relaxed font-medium">
                                    Instant global connection. No loading spinners or "translating..." delays. Just pure, instant communication.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
