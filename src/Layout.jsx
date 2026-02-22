import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, MessageCircle } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const Layout = () => {
    const { t } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user } = useUser();

    const onboardingComplete = user?.publicMetadata?.onboardingComplete || user?.unsafeMetadata?.onboardingComplete;

    // Check system preference on mount
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    // Toggle dark class on html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#111118] text-[#F0F0FF]' : 'bg-[#F5F5F0] text-[#0A0A0F]'} font-sans selection:bg-black selection:text-white`}>

            {/* Navbar */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-2 ${isDarkMode ? 'bg-[#111118]/90 border-[#2A2A3A] backdrop-blur-md' : 'bg-white/90 border-black/5 backdrop-blur-md'}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className={`flex items-center justify-center size-10 rounded-lg border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105 ${isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
                                <MessageCircle size={24} fill="currentColor" />
                            </div>
                            <span className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>EchoBoard</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/features" className={`text-sm font-bold hover:underline decoration-2 underline-offset-4 transition-all ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                                {t('features')}
                            </Link>
                            <Link to="/about" className={`text-sm font-bold hover:underline decoration-2 underline-offset-4 transition-all ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                                {t('about')}
                            </Link>
                            <Link to="/pricing" className={`text-sm font-bold hover:underline decoration-2 underline-offset-4 transition-all ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                                {t('pricing')}
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-yellow-300' : 'hover:bg-black/5 text-slate-600'}`}>
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <SignedOut>
                                {/* Login Button */}
                                <Link to="/login" className={`hidden md:flex h-10 items-center justify-center rounded-lg border-2 border-black bg-white px-6 text-sm font-bold text-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-gray-50 dark:bg-[#1A1A24] dark:text-white dark:border-white`}>
                                    {t('login')}
                                </Link>
                                <Link
                                    to="/login?mode=signup"
                                    className={`hidden sm:flex h-10 items-center justify-center rounded-lg border-2 px-6 text-sm font-bold shadow-brutalist hover:shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${isDarkMode ? 'bg-[#6C63FF] border-white text-white' : 'bg-[#4F46E5] border-black text-white'}`}
                                >
                                    {t('joinFree')}
                                </Link>
                            </SignedOut>

                            <SignedIn>
                                <div className="flex items-center gap-4">
                                    {onboardingComplete && (
                                        <Link to="/feed" className={`text-sm font-bold hover:underline decoration-2 underline-offset-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                            {t('goToFeed')}
                                        </Link>
                                    )}
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </SignedIn>

                            {/* Mobile Menu Button */}
                            <button className="md:hidden p-2" onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden absolute top-20 left-0 w-full border-b-2 p-4 flex flex-col gap-4 shadow-xl ${isDarkMode ? 'bg-[#111118] border-[#2A2A3A]' : 'bg-white border-black/5'}`}>
                        <Link to="/" className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            Features
                        </Link>
                        <Link to="/about" className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            About
                        </Link>
                        <Link to="/pricing" className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            Pricing
                        </Link>
                        <div className="h-px bg-slate-200 w-full my-2"></div>

                        <SignedOut>
                            <Link to="/login" className={`text-left font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Sign In</Link>
                            <Link
                                to="/login?mode=signup"
                                className={`h-12 w-full flex items-center justify-center rounded-lg border-2 font-bold shadow-brutalist active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all ${isDarkMode ? 'bg-[#6C63FF] border-white text-white' : 'bg-[#4F46E5] border-black text-white'}`}
                            >
                                Join Free
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            {onboardingComplete && (
                                <Link to="/feed" className={`text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Go to Feed</Link>
                            )}
                            <div className="flex justify-start py-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col pt-20 relative overflow-hidden min-h-screen">
                {/* Background Pattern - Global */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-40 fixed">
                    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDarkMode ? 'opacity-20' : 'opacity-100'}`}></div>
                </div>

                <Outlet context={{ isDarkMode }} />
            </main>

            {/* Footer */}
            <footer className={`relative z-10 border-t-2 py-12 mt-auto ${isDarkMode ? 'bg-[#111118] border-[#2A2A3A]' : 'bg-slate-50 border-black'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-600'}`}>© 2024 EchoBoard. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        {['Privacy', 'Terms', 'Contact'].map((item) => (
                            <a key={item} href="#" className={`text-sm font-bold hover:underline decoration-2 underline-offset-4 transition-all ${isDarkMode ? 'text-[#8888AA] hover:text-white' : 'text-slate-600 hover:text-black'}`}>
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
