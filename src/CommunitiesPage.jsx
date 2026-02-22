import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, Settings, MoreHorizontal,
    Monitor, Globe, Search, Plus, Hash, Sparkles, MessageSquare, UserPlus
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/clerk-react';
import { supabase } from './lib/supabase';

const CommunitiesPage = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const location = useLocation();

    const [communities, setCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [joinedCommunities, setJoinedCommunities] = useState(new Set());

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    const mockCommunities = [
        { id: 'mock-1', name: 'Technology', description: 'Discuss the latest in AI, web dev, and emerging tech.', icon: '💻', members: '24.5k', posts: 1280, color: 'from-blue-500 to-cyan-500' },
        { id: 'mock-2', name: 'Philosophy', description: 'Existentialism, ethics, and the big questions of life.', icon: '🧠', members: '12.8k', posts: 640, color: 'from-purple-500 to-pink-500' },
        { id: 'mock-3', name: 'Culture', description: 'Explore traditions, arts, and customs from around the world.', icon: '🌍', members: '18.2k', posts: 920, color: 'from-orange-500 to-red-500' },
        { id: 'mock-4', name: 'Design', description: 'UI/UX, graphic design, architecture, and visual arts.', icon: '🎨', members: '15.1k', posts: 810, color: 'from-emerald-500 to-teal-500' },
        { id: 'mock-5', name: 'Literature', description: 'Books, poetry, writing, and literary criticism.', icon: '📚', members: '9.4k', posts: 520, color: 'from-amber-500 to-yellow-500' },
        { id: 'mock-6', name: 'Science', description: 'Physics, biology, chemistry, and breakthrough discoveries.', icon: '🔬', members: '21.7k', posts: 1100, color: 'from-indigo-500 to-violet-500' },
        { id: 'mock-7', name: 'Music', description: 'From classical compositions to underground beats.', icon: '🎵', members: '16.3k', posts: 740, color: 'from-rose-500 to-pink-500' },
        { id: 'mock-8', name: 'Food & Drink', description: 'Recipes, restaurants, coffee culture, and culinary traditions.', icon: '☕', members: '13.9k', posts: 680, color: 'from-orange-400 to-amber-500' },
    ];

    useEffect(() => {
        const fetchCommunities = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('communities')
                    .select('*');
                if (error) throw error;
                setCommunities([...(data || []), ...mockCommunities]);

                if (user) {
                    const { data: memberData } = await supabase
                        .from('community_members')
                        .select('community_id')
                        .eq('user_id', user.id);
                    if (memberData) {
                        setJoinedCommunities(new Set(memberData.map(m => m.community_id)));
                    }
                }
            } catch (err) {
                console.error('[CommunitiesPage] Error:', err);
                setCommunities(mockCommunities);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCommunities();
    }, [user]);

    const handleJoin = async (e, communityId) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return;
        if (communityId.startsWith('mock-')) {
            setJoinedCommunities(prev => {
                const next = new Set(prev);
                if (next.has(communityId)) next.delete(communityId);
                else next.add(communityId);
                return next;
            });
            return;
        }
        try {
            if (joinedCommunities.has(communityId)) {
                await supabase.from('community_members').delete().eq('community_id', communityId).eq('user_id', user.id);
                setJoinedCommunities(prev => { const n = new Set(prev); n.delete(communityId); return n; });
            } else {
                await supabase.from('community_members').upsert({ community_id: communityId, user_id: user.id, role: 'member' });
                setJoinedCommunities(prev => new Set(prev).add(communityId));
            }
        } catch (err) {
            console.error('[CommunitiesPage] Error joining:', err);
            setJoinedCommunities(prev => {
                const next = new Set(prev);
                if (next.has(communityId)) next.delete(communityId);
                else next.add(communityId);
                return next;
            });
        }
    };

    const filteredCommunities = communities.filter(c =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navItems = [
        { icon: Home, label: t('navHome', 'Home'), path: '/feed' },
        { icon: TrendingUp, label: t('navTrending', 'Trending'), path: '/trending' },
        { icon: Users, label: t('navCommunities', 'Communities'), path: '/communities' },
        { icon: Bell, label: t('navNotifications', 'Notifications'), path: '/notifications', badge: 3 },
        { icon: Bookmark, label: t('navSaved', 'Saved'), path: '/saved' },
        { icon: Settings, label: t('navSettings', 'Settings'), path: '/settings' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 font-display selection:bg-[#6C63FF]/30 selection:text-white ${isDarkMode ? 'bg-[#0A0A0F] text-[#F0F0FF]' : 'bg-[#F5F5F0] text-slate-900'}`}>
            <div className="flex min-h-screen w-full flex-row">
                {/* Left Sidebar */}
                <div className={`hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 border-r z-20 ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-200 bg-white'}`}>
                    <div className="flex h-full flex-col justify-between p-6">
                        <div className="flex flex-col gap-8">
                            <Link to="/feed" className="flex items-center gap-3 px-2">
                                <div className="bg-[#6C63FF] aspect-square rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/20"><Monitor size={24} /></div>
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-bold tracking-tight">EchoBoard</h1>
                                    <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Global conversations</p>
                                </div>
                            </Link>
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link key={item.label} to={item.path}
                                        className={`group flex items-center gap-4 px-4 py-3 rounded-full transition-all ${location.pathname === item.path
                                            ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                                            : `hover:bg-slate-200 dark:hover:bg-white/5 ${isDarkMode ? 'text-[#8888AA] hover:text-[#F0F0FF]' : 'text-slate-500 hover:text-slate-900'}`
                                            }`}>
                                        <item.icon size={24} className={location.pathname === item.path ? 'text-[#6C63FF]' : 'group-hover:text-[#6C63FF] transition-colors'} />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && <span className="ml-auto bg-[#6C63FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-200'}`}>
                            <img alt="User" className={`size-10 rounded-full object-cover border-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user?.fullName || 'User'}</span>
                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>@{user?.username || 'user'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 lg:pl-72 flex-col min-h-screen">
                    <header className={`sticky top-0 z-30 flex h-[72px] items-center justify-between border-b px-6 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#0A0A0F]/80' : 'border-slate-200 bg-[#F5F5F0]/80'}`}>
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-[#6C63FF] to-purple-500 p-2.5 rounded-xl text-white shadow-lg shadow-[#6C63FF]/20"><Users size={24} /></div>
                            <div>
                                <h1 className="text-xl font-bold">{t('navCommunities', 'Communities')}</h1>
                                <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Discover and join communities around the world</p>
                            </div>
                        </div>
                        <div className="relative group max-w-xs w-full">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-[#8888AA] group-focus-within:text-[#6C63FF]' : 'text-slate-400 group-focus-within:text-[#6C63FF]'}`} size={18} />
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search communities..."
                                className={`w-full rounded-full border-none py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#6C63FF] transition-all ${isDarkMode ? 'bg-[#1A1A24] text-white placeholder-[#8888AA]' : 'bg-white text-slate-900 placeholder-slate-400 shadow-sm'}`} />
                        </div>
                    </header>

                    <main className="max-w-[900px] w-full mx-auto py-6 px-4">
                        <div className={`flex items-center gap-6 mb-6 p-4 rounded-xl border ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-[#6C63FF]" />
                                <span className="text-sm font-bold">{filteredCommunities.length} Communities</span>
                            </div>
                            <div className={`h-4 w-px ${isDarkMode ? 'bg-[#2A2A3A]' : 'bg-slate-200'}`}></div>
                            <div className="flex items-center gap-2">
                                <UserPlus size={16} className="text-emerald-500" />
                                <span className="text-sm font-bold">{joinedCommunities.size} Joined</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
                                <p className={`text-sm ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Loading communities...</p>
                            </div>
                        ) : filteredCommunities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                <Search size={48} className="text-slate-300" />
                                <h2 className="text-xl font-bold">No communities found</h2>
                                <p className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Try a different search term</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredCommunities.map((community) => {
                                    const isJoined = joinedCommunities.has(community.id);
                                    return (
                                        <Link to={`/community/${community.id}`} key={community.id}
                                            className={`group relative rounded-2xl border transition-all hover:shadow-lg overflow-hidden block ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                            <div className={`h-1.5 w-full bg-gradient-to-r ${community.color || 'from-[#6C63FF] to-purple-500'}`}></div>
                                            <div className="p-5">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-12 rounded-xl bg-gradient-to-br ${community.color || 'from-[#6C63FF] to-purple-500'} flex items-center justify-center text-white text-xl shadow-lg`}>
                                                            {community.icon || <Hash size={22} />}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-bold group-hover:text-[#6C63FF] transition-colors">{community.name}</h3>
                                                            <div className="flex items-center gap-3 mt-0.5">
                                                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                                    <Users size={12} className="inline mr-1" />{community.members || community.member_count || '0'} members
                                                                </span>
                                                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                                    <MessageSquare size={12} className="inline mr-1" />{community.posts || '0'} posts
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button onClick={(e) => handleJoin(e, community.id)}
                                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${isJoined
                                                            ? `border ${isDarkMode ? 'border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10' : 'border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10'}`
                                                            : 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20'
                                                            }`}>
                                                        {isJoined ? 'Joined ✓' : 'Join'}
                                                    </button>
                                                </div>
                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                    {community.description || 'Explore discussions in this community.'}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CommunitiesPage;
