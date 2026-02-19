import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShieldCheck, ArrowRight } from 'lucide-react';

const ProfileSetup = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-[#111118]">
            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-black dark:border-white"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-black dark:border-white rotate-12 bg-primary"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-black dark:bg-white rounded-lg transform -rotate-45"></div>
            </div>

            {/* Main Card Container */}
            <main className="relative w-full max-w-[580px] bg-white border-4 border-black rounded-xl shadow-brutalist-thick p-8 sm:p-12 z-10 transition-all duration-200 dark:bg-[#1A1A24] dark:border-white dark:shadow-[8px_8px_0px_0px_#ffffff]">
                {/* Header Section */}
                <header className="mb-10 text-center sm:text-left">
                    <h1 className="text-black text-5xl sm:text-6xl font-black tracking-tighter mb-3 uppercase leading-none dark:text-white">Who are you?</h1>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-md dark:text-slate-300">
                        Let the world hear your voice, in <span className="bg-primary/20 px-1 text-primary font-bold border border-black rounded-sm dark:border-white dark:text-primary-light">their</span> language.
                    </p>
                </header>

                {/* Form Section */}
                <form className="flex flex-col gap-8">
                    {/* Avatar Upload */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 group cursor-pointer">
                        <div className="relative w-24 h-24 shrink-0">
                            <div className="absolute inset-0 bg-slate-100 rounded-full border-4 border-black shadow-brutalist overflow-hidden flex items-center justify-center group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all duration-150 dark:bg-slate-800 dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff]">
                                <Camera size={32} className="text-black dark:text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col text-center sm:text-left">
                            <h3 className="text-xl font-bold text-black mb-1 dark:text-white">Upload Avatar</h3>
                            <p className="text-sm text-slate-500 font-medium dark:text-slate-400">JPG, PNG or GIF. Max 5MB.</p>
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-black font-bold text-lg uppercase tracking-tight dark:text-white">Display Name</span>
                            <input
                                type="text"
                                placeholder="e.g. Neo Anderson"
                                className="w-full bg-white border-4 border-black rounded-lg h-14 px-4 text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:ring-0 shadow-brutalist focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all duration-150 dark:bg-[#111118] dark:border-white dark:text-white dark:shadow-[4px_4px_0px_0px_#ffffff]"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-black font-bold text-lg uppercase tracking-tight dark:text-white">Username</span>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-black text-lg dark:text-white">@</span>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="w-full bg-white border-4 border-black rounded-lg h-14 pl-10 pr-4 text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:ring-0 shadow-brutalist focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all duration-150 dark:bg-[#111118] dark:border-white dark:text-white dark:shadow-[4px_4px_0px_0px_#ffffff]"
                                />
                            </div>
                        </label>
                    </div>

                    {/* Verification Section */}
                    <div className="mt-4 bg-primary/5 border-4 border-black rounded-xl p-5 shadow-brutalist sm:flex sm:items-center sm:justify-between gap-4 dark:bg-primary/10 dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff]">
                        <div className="flex gap-4 items-start sm:items-center">
                            <div className="bg-primary border-2 border-black rounded-full p-2 text-white shrink-0 shadow-sm flex items-center justify-center dark:border-white">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-lg text-black leading-tight dark:text-white">Native Language ID</h4>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Adds the Indigo badge to your profile</p>
                            </div>
                        </div>
                        {/* Custom Neo Toggle */}
                        <div className="mt-4 sm:mt-0 flex justify-end">
                            <label className="relative inline-flex items-center cursor-pointer group">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-14 h-8 bg-white peer-focus:outline-none border-4 border-black rounded-full peer peer-checked:bg-primary transition-colors duration-200 dark:border-white dark:bg-[#111118]"></div>
                                <div className="absolute left-1.5 top-1.5 bg-black w-5 h-5 rounded-full border border-black transition-transform duration-200 peer-checked:translate-x-6 peer-checked:bg-white peer-checked:border-black dark:border-white dark:bg-white dark:peer-checked:bg-black"></div>
                            </label>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/interests')}
                        className="mt-6 w-full bg-black text-white border-4 border-black rounded-xl h-16 text-xl font-bold uppercase tracking-wider shadow-brutalist hover:bg-primary hover:border-black hover:shadow-brutalist hover:-translate-y-1 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 flex items-center justify-center gap-2 group dark:bg-white dark:text-black dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff] dark:hover:bg-primary dark:hover:text-white dark:hover:border-white"
                    >
                        Enter EchoBoard
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} strokeWidth={3} />
                    </button>
                </form>

                {/* Progress Steps */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className="h-3 w-3 bg-black rounded-full border-2 border-black dark:bg-white dark:border-white"></div>
                    <div className="h-3 w-3 bg-black rounded-full border-2 border-black dark:bg-white dark:border-white"></div>
                    <div className="h-3 w-8 bg-primary rounded-full border-2 border-black shadow-sm dark:border-white"></div>
                    <div className="h-3 w-3 bg-white rounded-full border-2 border-black dark:bg-[#1A1A24] dark:border-white"></div>
                </div>
            </main>
        </div>
    );
};

export default ProfileSetup;
