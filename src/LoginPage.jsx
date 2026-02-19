import React, { useState } from 'react';
import { Mail, Lock, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mimic successful login, redirect to onboarding
        navigate('/onboarding/start');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 relative bg-gray-50 dark:bg-[#111118]">
            {/* Background Elements: Drifting Language Pills (Simplified for React) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
                <div className="absolute top-[10%] left-[5%] bg-blue-100 text-primary border border-primary px-4 py-2 rounded-full font-bold text-sm animate-float-slow transform -rotate-6 dark:bg-primary/20 dark:text-primary-light">Hola</div>
                <div className="absolute top-[20%] right-[10%] bg-white text-slate-800 border border-slate-300 px-6 py-3 rounded-full font-bold text-lg animate-float-fast transform rotate-12 dark:bg-slate-800 dark:text-white dark:border-slate-600">Bonjour</div>
                <div className="absolute bottom-[15%] left-[15%] bg-green-100 text-green-700 border border-green-500 px-5 py-2 rounded-full font-bold text-base animate-float-medium transform -rotate-3 dark:bg-green-900/30 dark:text-green-400">你好</div>
                <div className="absolute bottom-[30%] right-[20%] bg-purple-100 text-purple-700 border border-purple-400 px-4 py-2 rounded-full font-bold text-sm animate-float-slow transform rotate-6 dark:bg-purple-900/30 dark:text-purple-300">Guten Tag</div>
            </div>

            {/* Auth Card Container */}
            <div className="relative z-10 w-full max-w-[1200px] bg-white border-4 border-black shadow-brutalist grid lg:grid-cols-2 overflow-hidden rounded-lg dark:bg-[#1A1A24] dark:border-white">
                {/* Left Side: Branding */}
                <div className="relative bg-primary p-8 lg:p-16 flex flex-col justify-between overflow-hidden group">
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-bold text-white tracking-widest uppercase">Global Network Live</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6 selection:bg-white selection:text-primary">
                            SPEAK <br />
                            <span className="text-white/50">FREELY.</span><br />
                            READ <br />
                            <span className="text-black/60">LOCALLY.</span>
                        </h1>
                        <p className="text-white/90 text-lg font-medium max-w-md leading-relaxed">
                            Join the conversation where language is no barrier. Write in your native tongue, everyone reads in theirs.
                        </p>
                    </div>
                    <div className="relative z-10 mt-12 flex gap-4">
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded border border-white/10 flex-1 hover:bg-black/30 transition-colors">
                            <MessageSquare className="text-white mb-2" size={32} strokeWidth={1.5} />
                            <p className="text-sm font-bold text-white">Real-time Translation</p>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded border border-white/10 flex-1 hover:bg-black/30 transition-colors">
                            <Globe className="text-white mb-2" size={32} strokeWidth={1.5} />
                            <p className="text-sm font-bold text-white">100+ Languages</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="bg-white p-8 lg:p-12 flex flex-col justify-center dark:bg-[#1A1A24]">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 mb-2 dark:text-white">Welcome Back</h2>
                            <p className="text-slate-500 font-medium dark:text-slate-400">Enter your credentials to access the Echo.</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b-2 border-slate-200 mb-8 dark:border-slate-700">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 pb-3 text-sm font-black border-b-4 -mb-[2px] transition-all uppercase tracking-wider ${activeTab === 'login' ? 'text-primary border-primary dark:text-primary-light dark:border-primary-light' : 'text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 pb-3 text-sm font-black border-b-4 -mb-[2px] transition-all uppercase tracking-wider ${activeTab === 'signup' ? 'text-primary border-primary dark:text-primary-light dark:border-primary-light' : 'text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1 dark:text-slate-400">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary transition-colors dark:group-focus-within:text-primary-light" size={20} />
                                    <input
                                        type="email"
                                        placeholder="you@echo.board"
                                        className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 pl-12 pr-4 py-3 rounded font-medium focus:outline-none focus:border-black focus:ring-0 focus:shadow-brutalist-hover transition-all placeholder:text-slate-400 dark:bg-[#111118] dark:border-slate-700 dark:text-white dark:focus:border-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider dark:text-slate-400">Password</label>
                                    <a href="#" className="text-xs font-bold text-primary hover:underline dark:text-primary-light">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary transition-colors dark:group-focus-within:text-primary-light" size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 pl-12 pr-4 py-3 rounded font-medium focus:outline-none focus:border-black focus:ring-0 focus:shadow-brutalist-hover transition-all placeholder:text-slate-400 dark:bg-[#111118] dark:border-slate-700 dark:text-white dark:focus:border-white"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="mt-4 w-full bg-black text-white font-black py-4 px-6 rounded border-2 border-black hover:bg-white hover:text-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-widest flex items-center justify-center gap-2 dark:bg-primary dark:border-transparent dark:hover:bg-primary-dark dark:hover:text-white dark:shadow-none">
                                Enter The Echo
                                <ArrowRight size={20} strokeWidth={3} />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex py-8 items-center">
                            <div className="flex-grow border-t-2 border-slate-200 dark:border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Or connect with</span>
                            <div className="flex-grow border-t-2 border-slate-200 dark:border-slate-700"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex items-center justify-center p-3 border-2 border-slate-200 rounded bg-white hover:border-black hover:shadow-brutalist-hover transition-all group dark:bg-[#111118] dark:border-slate-700 dark:hover:border-white">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                            </button>
                            <button className="flex items-center justify-center p-3 border-2 border-slate-200 rounded bg-white hover:border-black hover:shadow-brutalist-hover transition-all group dark:bg-[#111118] dark:border-slate-700 dark:hover:border-white">
                                <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-6 h-6 grayscale opacity-60 group-hover:opacity-100 transition-all dark:invert" />
                            </button>
                            <button className="flex items-center justify-center p-3 border-2 border-slate-200 rounded bg-white hover:border-black hover:shadow-brutalist-hover transition-all group dark:bg-[#111118] dark:border-slate-700 dark:hover:border-white">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                            </button>
                        </div>

                        <p className="mt-8 text-center text-slate-500 text-sm font-medium">
                            By continuing, you agree to our <a href="#" className="text-primary font-bold hover:underline dark:text-primary-light">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
