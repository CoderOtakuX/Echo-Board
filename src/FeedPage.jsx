import React, { useState, useEffect } from 'react';
import {
    Search, Bell, MessageSquare, Home, TrendingUp, Users, Bookmark, Settings,
    Plus, Globe, Lightbulb, Zap, MoreHorizontal, ArrowUp, ArrowDown, Share2,
    Moon, Sun, Check, ExternalLink, Filter, ChevronDown, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeedPage = () => {
    // Basic state for theme toggle, though ideally this comes from a global context/provider
    // Since we are not using the main Layout.jsx, we need our own wrapper or context.
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark class on html element for global theme support
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-pink-500 selection:text-white ${isDarkMode ? 'bg-[#0A0A0F] text-slate-100' : 'bg-[#f0f0f2] text-slate-900'}`}>

            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 border-b-2 transition-colors px-6 py-3 ${isDarkMode ? 'bg-[#1A1A24] border-white' : 'bg-white border-black'}`}>
                <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black dark:border-white bg-primary text-white shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff]">
                            <Monitor size={24} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-black dark:text-white hidden sm:block">EchoBoard</h1>
                    </Link>

                    <div className="hidden md:flex max-w-md flex-1 px-8">
                        <div className="relative w-full group">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-black dark:text-white">
                                <Search size={20} strokeWidth={3} />
                            </div>
                            <input
                                className="block w-full rounded-xl border-2 border-black dark:border-white bg-white dark:bg-[#111118] py-2.5 pl-10 pr-3 text-sm font-bold text-black dark:text-white placeholder-slate-500 focus:border-black dark:focus:border-white focus:outline-none focus:ring-0 shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] transition-all"
                                placeholder="Search discussions..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="rounded-lg border-2 border-black dark:border-white p-2 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                            {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                        </button>

                        <button className="relative rounded-lg border-2 border-black dark:border-white p-2 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                            <Bell size={20} strokeWidth={2.5} />
                            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-black dark:border-white bg-pink-500"></span>
                        </button>

                        <button className="rounded-lg border-2 border-black dark:border-white p-2 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                            <MessageSquare size={20} strokeWidth={2.5} />
                        </button>

                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-black dark:border-white bg-slate-200 dark:bg-slate-700 shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff]">
                            <img alt="User profile" className="h-full w-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="mx-auto flex w-full max-w-[1280px] flex-1 gap-6 px-6 pt-24 pb-8">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-[260px] flex-col gap-6 shrink-0 sticky top-[80px] h-fit">
                    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1A1A24] p-5 border border-slate-200 dark:border-[#2A2A3A] shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff]">
                        <div className="flex items-start justify-between">
                            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-black dark:border-white bg-slate-100 dark:bg-slate-800">
                                <img alt="Profile" className="h-full w-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Hiro&backgroundColor=e5e7eb" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                                <span>🇯🇵</span> Native
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-black dark:text-white">Hiroshi Tanaka</h2>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">@hiro_tanaka</p>
                        </div>
                        <div className="flex gap-4 border-t-2 border-black dark:border-slate-700 pt-4">
                            <div className="text-center">
                                <span className="block text-lg font-black text-black dark:text-white">1.2k</span>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Reputation</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-black text-black dark:text-white">45</span>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Posts</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {[
                            { icon: Home, label: 'Home Feed', active: true },
                            { icon: TrendingUp, label: 'Trending', active: false },
                            { icon: Users, label: 'Communities', active: false },
                            { icon: Bookmark, label: 'Saved', active: false },
                            { icon: Settings, label: 'Settings', active: false },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className={`group flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-bold transition-all ${item.active
                                    ? 'bg-primary border-black dark:border-white text-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-[#1A1A24] hover:border-black dark:hover:border-white hover:shadow-brutalist dark:hover:shadow-[4px_4px_0px_0px_#ffffff]'
                                    }`}
                            >
                                <item.icon size={24} strokeWidth={2.5} />
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black dark:border-white bg-pink-500 px-6 py-3.5 text-sm font-black text-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] hover:bg-pink-400 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none uppercase tracking-wide">
                        <Plus size={24} strokeWidth={3} />
                        CREATE POST
                    </button>
                </aside>

                {/* Main Feed */}
                <main className="flex flex-1 flex-col gap-6 w-full max-w-[680px]">
                    {/* Filters & Language */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white dark:bg-[#1A1A24] p-3 border-2 border-black dark:border-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] sticky top-[80px] z-40 transition-colors">
                        <div className="flex w-full sm:w-auto p-1 gap-1">
                            {['Hot', 'New', 'Top'].map((filter, i) => (
                                <button
                                    key={filter}
                                    className={`flex-1 sm:flex-none rounded-lg border-2 px-6 py-2 text-sm font-bold transition-all ${i === 0
                                        ? 'bg-primary border-black dark:border-white text-white shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-y-0.5 hover:shadow-none'
                                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-slate-200 dark:hover:border-slate-700'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 px-2 w-full sm:w-auto">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:block">Translate to:</span>
                            <div className="relative group flex-1 sm:flex-none">
                                <button className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-[#111118] px-3 py-2 text-sm font-bold text-black dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]">
                                    <div className="flex items-center gap-2">
                                        <Globe size={20} className="text-primary" />
                                        <span>English (US)</span>
                                    </div>
                                    <ChevronDown size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Feed Items */}
                    <div className="flex flex-col gap-8">
                        {/* Post 1 */}
                        {/* Post Card 1 - Expanded with Cultural Context */}
                        <article className="rounded-xl border-2 border-black dark:border-white bg-white dark:bg-[#1A1A24] p-6 shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutalist-hover dark:hover:shadow-[6px_6px_0px_0px_#ffffff] group relative overflow-hidden">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-black dark:border-white">
                                        <img alt="Ana Silva" src="https://api.dicebear.com/7.x/notionists/svg?seed=Ana&backgroundColor=e5e7eb" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-black dark:text-white">Ana Silva</h3>
                                            <span className="text-xs font-bold text-slate-500">• 2h ago</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold">
                                            <span className="text-slate-500">Posted in</span>
                                            <span className="flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 text-xs font-bold">
                                                🇧🇷 Português
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-black dark:hover:text-white">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <Link to="/post" className="group">
                                <h2 className="mb-2 text-xl font-black leading-tight text-black dark:text-white group-hover:text-primary transition-colors">
                                    Why remote work in São Paulo is changing the coffee culture fundamentally
                                </h2>
                            </Link>

                            <p className="mb-4 font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                                The traditional "cafezinho" break is evolving. As more tech workers move to remote setups, we are seeing a shift from quick standing espresso shots to prolonged stays in specialty coffee shops. This isn't just about coffee; it's about reclaiming public spaces for work and socialization in a city that never stops.
                            </p>
                            <div className="flex items-start gap-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 p-4 border-2 border-black dark:border-white shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] mt-2 relative">
                                <div className="absolute -top-3 -left-3 bg-yellow-400 dark:bg-yellow-600 border-2 border-black dark:border-white text-black p-1 rounded-lg shadow-sm">
                                    <Lightbulb size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-1 ml-2">
                                    <span className="text-xs font-black text-black dark:text-white uppercase tracking-widest bg-yellow-400/20 self-start px-2 py-0.5 rounded border border-black/10 dark:border-white/10">Cultural Context</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-normal font-medium mt-1">
                                        In Brazil, the <span className="font-bold italic text-black dark:text-white">cafezinho</span> is traditionally a social ritual of hospitality, often free and quick. The shift described here represents a significant departure from collectivist hospitality towards a more individualistic, utility-based use of space common in Western tech hubs.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t-2 border-black/10 dark:border-white/10 mt-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded-lg border-2 border-black dark:border-white bg-white dark:bg-[#1A1A24] shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] overflow-hidden">
                                        <button className="px-3 py-1.5 text-slate-500 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-r-2 border-black/10 dark:border-white/10">
                                            <ArrowUp size={20} strokeWidth={3} />
                                        </button>
                                        <span className="text-sm font-black text-black dark:text-white px-3 min-w-[3rem] text-center">1.2k</span>
                                        <button className="px-3 py-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-l-2 border-black/10 dark:border-white/10">
                                            <ArrowDown size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-[#1A1A24] hover:shadow-brutalist-sm dark:hover:shadow-[2px_2px_0px_0px_#ffffff] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all group/btn h-[42px]">
                                        <MessageSquare size={20} className="group-hover/btn:text-primary" strokeWidth={2.5} />
                                        <span className="text-sm font-bold">45</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-[#1A1A24] hover:shadow-brutalist-sm dark:hover:shadow-[2px_2px_0px_0px_#ffffff] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all group/btn h-[42px]">
                                        <Share2 size={20} className="group-hover/btn:text-primary" strokeWidth={2.5} />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 rounded-full border-2 border-black dark:border-white bg-primary px-4 py-2 text-xs font-black text-white hover:translate-y-[2px] hover:translate-x-[2px] shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] hover:shadow-none transition-all w-full sm:w-auto justify-center uppercase tracking-wider">
                                    <Globe size={16} strokeWidth={2.5} />
                                    REVEAL ORIGINAL
                                </button>
                            </div>
                        </article>

                        {/* Post 2 */}
                        <article className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1A1A24] p-5 sm:p-6 border-2 border-black dark:border-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-brutalist-thick dark:hover:shadow-[6px_6px_0px_0px_#ffffff] transition-all duration-300 relative overflow-hidden group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-black dark:border-white bg-slate-200 dark:bg-slate-700 shadow-sm">
                                        <img alt="User avatar" className="h-full w-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Kenji&backgroundColor=e5e7eb" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-base font-black text-black dark:text-white hover:underline cursor-pointer">Kenji M.</span>
                                            <span className="text-xs font-bold text-slate-400">•</span>
                                            <a className="text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 px-2 py-0.5 rounded border border-primary/20" href="#">b/UrbanDesign</a>
                                            <span className="text-xs font-bold text-slate-400 hidden sm:inline">• 4h ago</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Posted in</span>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-black dark:border-white shadow-[1px_1px_0px_0px_#000] dark:shadow-[1px_1px_0px_0px_#ffffff]">
                                                🇯🇵 日本語
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white hover:shadow-brutalist-sm dark:hover:shadow-[2px_2px_0px_0px_#ffffff]">
                                    <MoreHorizontal size={20} strokeWidth={2.5} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-black leading-tight text-black dark:text-white group-hover:text-primary transition-colors cursor-pointer">
                                    Minimalism in Kyoto's new public library architecture
                                </h3>
                                <div className="relative w-full overflow-hidden rounded-xl border-2 border-black dark:border-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff] group/img cursor-pointer">
                                    <img className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&q=80&w=2000" alt="Architecture" />
                                    <div className="absolute bottom-3 left-3 bg-black text-white px-3 py-1 text-xs font-bold border border-white rounded shadow-sm opacity-0 group-hover/img:opacity-100 transition-opacity">
                                        Kyoto, Japan
                                    </div>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base font-medium">
                                    The use of negative space (Ma) is incredible here. It’s not just about empty space, but the potential of that space.
                                </p>
                            </div>

                            <div className="flex items-start gap-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 p-4 border-2 border-black dark:border-white shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] mt-2 relative">
                                <div className="absolute -top-3 -left-3 bg-yellow-400 dark:bg-yellow-600 border-2 border-black dark:border-white text-black p-1 rounded-lg shadow-sm">
                                    <Lightbulb size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-1 ml-2">
                                    <span className="text-xs font-black text-black dark:text-white uppercase tracking-widest bg-yellow-400/20 self-start px-2 py-0.5 rounded border border-black/10 dark:border-white/10">Cultural Context</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-normal font-medium mt-1">
                                        "Ma" (間) is a Japanese concept referring to the space between things. It suggests that the interval is just as important as the object itself, fostering imagination and pause.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t-2 border-black/10 dark:border-white/10 mt-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded-lg border-2 border-black dark:border-white bg-white dark:bg-[#1A1A24] shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] overflow-hidden">
                                        <button className="px-3 py-1.5 text-slate-500 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-r-2 border-black/10 dark:border-white/10">
                                            <ArrowUp size={20} strokeWidth={3} />
                                        </button>
                                        <span className="text-sm font-black text-black dark:text-white px-3 min-w-[3rem] text-center">856</span>
                                        <button className="px-3 py-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-l-2 border-black/10 dark:border-white/10">
                                            <ArrowDown size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-[#1A1A24] hover:shadow-brutalist-sm dark:hover:shadow-[2px_2px_0px_0px_#ffffff] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all group/btn h-[42px]">
                                        <MessageSquare size={20} className="group-hover/btn:text-primary" strokeWidth={2.5} />
                                        <span className="text-sm font-bold">23</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-[#1A1A24] hover:shadow-brutalist-sm dark:hover:shadow-[2px_2px_0px_0px_#ffffff] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all group/btn h-[42px]">
                                        <Share2 size={20} className="group-hover/btn:text-primary" strokeWidth={2.5} />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 rounded-full border-2 border-black dark:border-white bg-primary px-4 py-2 text-xs font-black text-white hover:translate-y-[2px] hover:translate-x-[2px] shadow-brutalist-sm dark:shadow-[2px_2px_0px_0px_#ffffff] hover:shadow-none transition-all w-full sm:w-auto justify-center uppercase tracking-wider">
                                    <Globe size={16} strokeWidth={2.5} />
                                    REVEAL ORIGINAL
                                </button>
                            </div>
                        </article>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="hidden xl:flex w-[280px] flex-col gap-6 shrink-0 sticky top-[80px] h-fit">
                    {/* Global Pulse Widget */}
                    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1A1A24] p-5 border-2 border-black dark:border-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff]">
                        <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2">
                            <h3 className="font-black text-lg text-black dark:text-white">Global Pulse</h3>
                            <span className="flex h-3 w-3 rounded-full bg-green-500 border-2 border-black dark:border-white animate-pulse"></span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Active Languages</p>
                        <div className="flex flex-col gap-3">
                            {[
                                { lang: 'Japanese', flag: '🇯🇵', percent: 24, width: '70%' },
                                { lang: 'Portuguese', flag: '🇧🇷', percent: 18, width: '55%' },
                                { lang: 'French', flag: '🇫🇷', percent: 12, width: '40%' },
                                { lang: 'Korean', flag: '🇰🇷', percent: 9, width: '30%' }
                            ].map((item) => (
                                <div key={item.lang} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{item.flag}</span>
                                        <span className="text-sm font-bold text-black dark:text-white">{item.lang}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700 border border-black dark:border-white overflow-hidden relative">
                                            <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: item.width }}></div>
                                        </div>
                                        <span className="text-xs font-black text-black dark:text-white w-8 text-right">{item.percent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Widget */}
                    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1A1A24] p-5 border-2 border-black dark:border-white shadow-brutalist dark:shadow-[4px_4px_0px_0px_#ffffff]">
                        <div className="flex items-center justify-between pb-2 border-b-2 border-black dark:border-white">
                            <h3 className="font-black text-lg text-black dark:text-white">Trending</h3>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {[
                                { name: 'FutureOfWork', members: '12.5k', color: 'bg-primary' },
                                { name: 'GlobalCuisine', members: '8.2k', color: 'bg-pink-500' },
                                { name: 'Minimalism', members: '45k', color: 'bg-amber-400' },
                                { name: 'TechNomads', members: '22k', color: 'bg-blue-500' }
                            ].map((tag, i) => (
                                <li key={tag.name}>
                                    <a href="#" className="flex items-center justify-between rounded-lg p-2 hover:bg-primary/5 dark:hover:bg-primary/10 hover:translate-x-1 transition-all group border border-transparent hover:border-black/10 dark:hover:border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg ${tag.color} text-white flex items-center justify-center font-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#ffffff] text-sm`}>#</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-black dark:text-white group-hover:text-primary transition-colors">{tag.name}</span>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{tag.members} members</span>
                                            </div>
                                        </div>
                                        {i % 2 === 0 && (
                                            <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-0.5 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800">
                                                <ArrowUp size={14} strokeWidth={3} />
                                            </span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full text-center text-xs font-black uppercase text-black dark:text-white hover:text-primary bg-slate-100 dark:bg-slate-800 py-2 rounded border border-black dark:border-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            View all
                        </button>
                    </div>

                    <div className="px-2">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                            <a href="#" className="hover:underline hover:text-black dark:hover:text-white">About</a>
                            <a href="#" className="hover:underline hover:text-black dark:hover:text-white">Privacy</a>
                            <a href="#" className="hover:underline hover:text-black dark:hover:text-white">Terms</a>
                            <a href="#" className="hover:underline hover:text-black dark:hover:text-white">Careers</a>
                            <span>© 2024 EchoBoard Inc.</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default FeedPage;
