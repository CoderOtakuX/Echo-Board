import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, MoreHorizontal,
    Monitor, Search, Moon, Sun, Plus, Image, Smile,
    ArrowUp, ArrowDown, MessageSquare, Share2, Globe, Lightbulb,
    Settings, MoreVertical, X, Coffee
} from 'lucide-react';

const FeedPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState('Hot');
    const [showCreatePost, setShowCreatePost] = useState(false);

    // Toggle dark class on html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 font-display selection:bg-[#6C63FF]/30 selection:text-white ${isDarkMode ? 'bg-[#0A0A0F] text-[#F0F0FF]' : 'bg-[#F5F5F0] text-slate-900'}`}>
            <div className="flex min-h-screen w-full flex-row">
                {/* Left Sidebar (Fixed) */}
                <div className={`hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 border-r z-20 ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-200 bg-white'}`}>
                    <div className="flex h-full flex-col justify-between p-6">
                        <div className="flex flex-col gap-8">
                            {/* Brand */}
                            <Link to="/feed" className="flex items-center gap-3 px-2">
                                <div className="bg-[#6C63FF] aspect-square rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/20">
                                    <Monitor size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-bold tracking-tight">EchoBoard</h1>
                                    <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Global conversations</p>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="flex flex-col gap-2">
                                {[
                                    { icon: Home, label: 'Home', active: true },
                                    { icon: TrendingUp, label: 'Trending', active: false },
                                    { icon: Users, label: 'Communities', active: false },
                                    { icon: Bell, label: 'Notifications', badge: 3, active: false },
                                    { icon: Bookmark, label: 'Saved', active: false },
                                    { icon: Settings, label: 'Settings', active: false },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href="#"
                                        className={`group flex items-center gap-4 px-4 py-3 rounded-full transition-all ${item.active
                                            ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                                            : `hover:bg-slate-200 dark:hover:bg-white/5 ${isDarkMode ? 'text-[#8888AA] hover:text-[#F0F0FF]' : 'text-slate-500 hover:text-slate-900'}`
                                            }`}
                                    >
                                        <item.icon size={24} className={item.active ? 'text-[#6C63FF]' : 'group-hover:text-[#6C63FF] transition-colors'} />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-[#6C63FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-[#6C63FF]/20">
                                                {item.badge}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* User Profile */}
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-200'}`}>
                            <img alt="User profile" className={`size-10 rounded-full object-cover border-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">Felix K.</span>
                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>@felix_dev</span>
                            </div>
                            <MoreHorizontal className={`ml-auto ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`} size={20} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 lg:pl-72 flex-col min-h-screen relative z-0">
                    {/* Top Navbar */}
                    <header className={`sticky top-0 z-30 flex h-[72px] items-center justify-between border-b px-6 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#0A0A0F]/80' : 'border-slate-200 bg-[#F5F5F0]/80'}`}>
                        <div className="flex-1 max-w-xl">
                            <div className="relative group">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-[#8888AA] group-focus-within:text-[#6C63FF]' : 'text-slate-400 group-focus-within:text-[#6C63FF]'}`} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    className={`w-full rounded-full border-none py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#6C63FF] transition-all ${isDarkMode ? 'bg-[#1A1A24] text-white placeholder-[#8888AA]' : 'bg-white text-slate-900 placeholder-slate-400 shadow-sm'}`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 ml-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className={`p-2 rounded-full transition-colors relative ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#6C63FF] rounded-full border-2 border-[#0A0A0F]"></span>
                            </button>
                            <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                                <MessageSquare size={20} />
                            </button>
                            <div className={`h-9 w-9 overflow-hidden rounded-full border-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}>
                                <img alt="User" className="h-full w-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb" />
                            </div>
                        </div>
                    </header>

                    <div className="w-full max-w-[1024px] mx-auto p-6 pt-6 flex gap-6 justify-center">
                        {/* Center Feed */}
                        <main className="w-full max-w-[680px] flex flex-col gap-6 pb-20">
                            {/* New Post Composer */}
                            <div
                                onClick={() => setShowCreatePost(true)}
                                className={`rounded-2xl border p-4 cursor-text transition-all group ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/50' : 'bg-white border-slate-200 hover:border-[#6C63FF]/50 shadow-sm'}`}
                            >
                                <div className="flex gap-4 items-center">
                                    <img alt="User" className={`size-10 rounded-full border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb" />
                                    <div className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium ${isDarkMode ? 'bg-[#111118] text-[#8888AA]' : 'bg-slate-50 text-slate-400'}`}>
                                        What's on your mind? Write in your language...
                                    </div>
                                    <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#6C63FF] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20' : 'text-[#6C63FF] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20'}`}>
                                        <Image size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Feed Filters */}
                            <div className="flex items-center justify-between">
                                <div className={`flex p-1 rounded-lg ${isDarkMode ? 'bg-[#1A1A24] border border-[#2A2A3A]' : 'bg-white border border-slate-200 shadow-sm'}`}>
                                    {['Hot', 'New', 'Top'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === tab
                                                ? 'bg-[#6C63FF] text-white shadow-md'
                                                : `text-slate-500 hover:text-slate-900 ${isDarkMode ? 'text-[#8888AA] hover:text-white' : ''}`
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Translate to:</span>
                                    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-white hover:bg-[#2A2A3A]' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm'}`}>
                                        <Globe size={16} className="text-[#6C63FF]" />
                                        <span>English (US)</span>
                                    </button>
                                </div>
                            </div>

                            {/* Post 1 */}
                            <article className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img alt="Ana Silva" className={`size-10 rounded-full border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src="https://api.dicebear.com/7.x/notionists/svg?seed=Ana&backgroundColor=e5e7eb" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold hover:underline cursor-pointer">Ana Silva</span>
                                                    <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>• 2h ago</span>
                                                </div>
                                                <span className={`text-xs font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                    Posted in <span className="text-[#6C63FF] hover:underline cursor-pointer">Startups</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-[#8888AA]' : 'hover:bg-slate-100 text-slate-400'}`}>
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>

                                    <Link to="/post" className="group">
                                        <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#6C63FF] transition-colors">
                                            Why remote work in São Paulo is changing the coffee culture fundamentally
                                        </h2>
                                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                            The traditional "cafezinho" break is evolving. As more tech workers move to remote setups, we are seeing a shift from quick standing espresso shots to prolonged stays in specialty coffee shops. This isn't just about coffee; it's about reclaiming public spaces.
                                        </p>
                                    </Link>

                                    {/* Cultural Context */}
                                    <div className={`relative overflow-hidden rounded-xl border p-4 ${isDarkMode ? 'bg-[#1A180A] border-[#FFD700]/40' : 'bg-yellow-50 border-[#FFD700]/40'}`}>
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700]"></div>
                                        <div className="flex gap-3 pl-2">
                                            <div className="mt-0.5 text-[#FFD700]">
                                                <Lightbulb size={20} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider block mb-1">Cultural Context</span>
                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                    In Brazil, the <span className={`font-bold italic ${isDarkMode ? 'text-white' : 'text-black'}`}>cafezinho</span> is traditionally a social ritual of hospitality, often free and quick. The shift described differs from collectivist hospitality towards individualistic utility.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className={`px-6 py-4 border-t flex items-center justify-between ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-100 bg-slate-50'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`flex items-center rounded-lg border overflow-hidden ${isDarkMode ? 'border-[#2A2A3A] bg-[#1A1A24]' : 'border-slate-200 bg-white'}`}>
                                            <button className={`px-3 py-1.5 hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] transition-colors border-r ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`}>
                                                <ArrowUp size={18} />
                                            </button>
                                            <span className="px-3 text-sm font-bold">1.2k</span>
                                            <button className={`px-3 py-1.5 hover:bg-red-500/10 hover:text-red-500 transition-colors border-l ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`}>
                                                <ArrowDown size={18} />
                                            </button>
                                        </div>
                                        <button className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}>
                                            <MessageSquare size={20} className="group-hover:text-[#6C63FF] transition-colors" />
                                            45
                                        </button>
                                        <button className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-green-500' : 'text-slate-500 hover:text-green-500'}`}>
                                            <Share2 size={20} className="group-hover:text-green-500 transition-colors" />
                                            Share
                                        </button>
                                    </div>
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${isDarkMode ? 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20' : 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20'}`}>
                                        <Globe size={16} />
                                        Reveal Original
                                    </button>
                                </div>
                            </article>

                            {/* Post 2 */}
                            <article className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img alt="Kenji" className={`size-10 rounded-full border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src="https://api.dicebear.com/7.x/notionists/svg?seed=Kenji&backgroundColor=e5e7eb" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold hover:underline cursor-pointer">Kenji M.</span>
                                                    <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>• 4h ago</span>
                                                </div>
                                                <span className={`text-xs font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                    Posted in <span className="text-[#6C63FF] hover:underline cursor-pointer">UrbanDesign</span>
                                                </span>
                                            </div>
                                        </div>
                                        <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-[#8888AA]' : 'hover:bg-slate-100 text-slate-400'}`}>
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-xl font-bold leading-tight group-hover:text-[#6C63FF] transition-colors cursor-pointer">
                                            Minimalism in Kyoto's new public library architecture
                                        </h2>
                                        <div className={`aspect-video w-full rounded-xl overflow-hidden border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}>
                                            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&q=80&w=2000" alt="Architecture" />
                                        </div>
                                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                            The use of negative space (Ma) is incredible here. It’s not just about empty space, but the potential of that space.
                                        </p>
                                    </div>

                                    {/* Cultural Context */}
                                    <div className={`relative overflow-hidden rounded-xl border p-4 ${isDarkMode ? 'bg-[#1A180A] border-[#FFD700]/40' : 'bg-yellow-50 border-[#FFD700]/40'}`}>
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700]"></div>
                                        <div className="flex gap-3 pl-2">
                                            <div className="mt-0.5 text-[#FFD700]">
                                                <Lightbulb size={20} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider block mb-1">Cultural Context</span>
                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                    "Ma" (間) is a Japanese concept referring to the space between things. It suggests that the interval is just as important as the object itself.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className={`px-6 py-4 border-t flex items-center justify-between ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-100 bg-slate-50'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`flex items-center rounded-lg border overflow-hidden ${isDarkMode ? 'border-[#2A2A3A] bg-[#1A1A24]' : 'border-slate-200 bg-white'}`}>
                                            <button className={`px-3 py-1.5 hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] transition-colors border-r ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`}>
                                                <ArrowUp size={18} />
                                            </button>
                                            <span className="px-3 text-sm font-bold">856</span>
                                            <button className={`px-3 py-1.5 hover:bg-red-500/10 hover:text-red-500 transition-colors border-l ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`}>
                                                <ArrowDown size={18} />
                                            </button>
                                        </div>
                                        <button className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}>
                                            <MessageSquare size={20} className="group-hover:text-[#6C63FF] transition-colors" />
                                            23
                                        </button>
                                        <button className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-green-500' : 'text-slate-500 hover:text-green-500'}`}>
                                            <Share2 size={20} className="group-hover:text-green-500 transition-colors" />
                                            Share
                                        </button>
                                    </div>
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${isDarkMode ? 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20' : 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20'}`}>
                                        <Globe size={16} />
                                        Reveal Original
                                    </button>
                                </div>
                            </article>
                        </main>

                        {/* Right Sidebar (Sticky) */}
                        <aside className="hidden xl:flex w-80 flex-col gap-6 sticky top-[100px] h-fit pl-6">
                            {/* Trending Communities */}
                            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <h3 className="font-bold text-base mb-4">Trending Communities</h3>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { name: 'FutureOfWork', members: '12.5k', icon: Monitor, color: 'text-emerald-500 bg-emerald-500/10' },
                                        { name: 'GlobalCuisine', members: '8.2k', icon: Coffee, color: 'text-pink-500 bg-pink-500/10' },
                                        { name: 'TechNomads', members: '22k', icon: Globe, color: 'text-blue-500 bg-blue-500/10' }
                                    ].map((item) => (
                                        <div key={item.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-lg flex items-center justify-center border border-white/5 ${item.color}`}>
                                                    <item.icon size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{item.name}</span>
                                                    <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>{item.members} members</span>
                                                </div>
                                            </div>
                                            <button className={`size-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-[#6C63FF] hover:text-white' : 'bg-slate-100 hover:bg-[#6C63FF] hover:text-white'}`}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-xs font-bold text-[#6C63FF] hover:underline">See All</button>
                            </div>

                            {/* Active Languages (Restyled) */}
                            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <h3 className="font-bold text-base mb-4">Active Languages</h3>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { lang: 'Japanese', flag: '🇯🇵', percent: 24, width: '70%' },
                                        { lang: 'Portuguese', flag: '🇧🇷', percent: 18, width: '55%' },
                                        { lang: 'French', flag: '🇫🇷', percent: 12, width: '40%' },
                                    ].map((item) => (
                                        <div key={item.lang} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{item.flag}</span>
                                                <span className="text-sm font-semibold">{item.lang}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2 w-20 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#111118]' : 'bg-slate-100'}`}>
                                                    <div className="h-full bg-[#6C63FF] rounded-full" style={{ width: item.width }}></div>
                                                </div>
                                                <span className={`text-xs font-bold w-6 text-right ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>{item.percent}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`}>
                                <a href="#" className="hover:underline">About</a>
                                <a href="#" className="hover:underline">Privacy</a>
                                <a href="#" className="hover:underline">Terms</a>
                                <span>© 2024 EchoBoard</span>
                            </div>
                        </aside>
                    </div>

                    {/* Create Post Modal (Simple Overlay) */}
                    {showCreatePost && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                            <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${isDarkMode ? 'bg-[#1A1A24] border border-[#2A2A3A]' : 'bg-white'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Create Post</h2>
                                    <button onClick={() => setShowCreatePost(false)} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
                                        <X size={24} />
                                    </button>
                                </div>
                                <textarea
                                    className={`w-full h-32 p-4 rounded-xl resize-none mb-4 ${isDarkMode ? 'bg-[#111118] text-white placeholder-[#8888AA]' : 'bg-slate-50 text-slate-900 placeholder-slate-400'}`}
                                    placeholder="What's on your mind?"
                                ></textarea>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowCreatePost(false)} className={`px-4 py-2 rounded-lg font-bold ${isDarkMode ? 'text-[#8888AA] hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Cancel</button>
                                    <button onClick={() => setShowCreatePost(false)} className="px-6 py-2 bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white rounded-lg font-bold shadow-lg shadow-[#6C63FF]/20">Post</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
