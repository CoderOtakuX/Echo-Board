import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, Settings, MoreHorizontal,
    Monitor, ArrowUp, MessageSquare, Globe, Flame, Clock, Star, Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/clerk-react';
import { supabase } from './lib/supabase';
import { useTranslationEngine } from './hooks/useTranslationEngine';

const PostContentRenderer = ({ post, currentLangCode }) => {
    const { translate, isTranslating } = useTranslationEngine();
    const [title, setTitle] = useState(post.title_translated || post.title_original);
    const [body, setBody] = useState(post.body_translated || post.body_original);
    const [showOriginal, setShowOriginal] = useState(false);
    const [hasTranslated, setHasTranslated] = useState(false);
    const translatingRef = React.useRef(false);
    const needsTranslation = post.locale && post.locale !== currentLangCode && !post.title_translated;

    useEffect(() => {
        setTitle(post.title_translated || post.title_original);
        setBody(post.body_translated || post.body_original);
        setHasTranslated(false);
        setShowOriginal(false);
        translatingRef.current = false;
    }, [currentLangCode, post.id, post.title_translated, post.title_original]);

    useEffect(() => {
        const fetchTranslation = async () => {
            if (needsTranslation && !translatingRef.current && !showOriginal) {
                translatingRef.current = true;
                const bodyPreview = post.body_original?.length > 200 ? post.body_original.substring(0, 200) + '...' : post.body_original;
                const translatedTitle = await translate(post.title_original, post.locale, currentLangCode);
                const translatedBody = await translate(bodyPreview, post.locale, currentLangCode);
                setTitle(translatedTitle);
                setBody(translatedBody);
                setHasTranslated(true);
            }
        };
        if (!showOriginal && needsTranslation && !hasTranslated) fetchTranslation();
        else if (showOriginal) {
            setTitle(post.title_original);
            setBody(post.body_original?.length > 200 ? post.body_original.substring(0, 200) + '...' : post.body_original);
        }
    }, [currentLangCode, post.id, needsTranslation, showOriginal, hasTranslated]);

    return (
        <div className="relative">
            <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#6C63FF] transition-colors">
                {isTranslating && !hasTranslated ? <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-6 w-3/4 block rounded"></span> : title}
            </h2>
            <div className={`text-base leading-relaxed ${isTranslating && !hasTranslated ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
                {isTranslating && !hasTranslated ? (
                    <div className="space-y-2 mt-2">
                        <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-full block rounded"></span>
                        <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-5/6 block rounded"></span>
                    </div>
                ) : (
                    <p className="dark:text-slate-300 text-slate-600">{body}</p>
                )}
            </div>
            {(needsTranslation || post.title_translated) && (
                <div className="mt-3 flex justify-end">
                    <button onClick={(e) => { e.preventDefault(); setShowOriginal(!showOriginal); }}
                        className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
                        <Globe size={14} />
                        {showOriginal ? 'See Translation' : 'See Original'}
                    </button>
                </div>
            )}
        </div>
    );
};

const TrendingPage = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const location = useLocation();
    const currentLangCode = i18n.language.split('-')[0].toLowerCase();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [timeFilter, setTimeFilter] = useState('week');

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    const getFallbacks = () => [
        {
            id: 'trending-1', title_original: "AI is rewriting the rules of creative work",
            body_original: "From generative art to AI-composed music, the creative landscape is shifting faster than anyone predicted. What does this mean for human artists?",
            upvotes: 4230, comment_count: 187, created_at: new Date(Date.now() - 86400000).toISOString(),
            author: { username: 'tech_visionary', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=TechVision' },
            community: { name: 'Technology' }, locale: 'en'
        },
        {
            id: 'trending-2', title_original: "日本の四季と文学の関係",
            body_original: "日本文学における四季の表現は、西洋文学とは根本的に異なります。その美学的差異について深く考察します。",
            upvotes: 3100, comment_count: 95, created_at: new Date(Date.now() - 172800000).toISOString(),
            author: { username: 'bunka_lover', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Bunka' },
            community: { name: 'Literature' }, locale: 'ja'
        },
        {
            id: 'trending-3', title_original: "La revolución del café de especialidad en América Latina",
            body_original: "Colombia, Brasil y Costa Rica lideran una nueva era del café. ¿Cómo la cultura del café está transformando economías locales? ☕🌎",
            upvotes: 2800, comment_count: 112, created_at: new Date(Date.now() - 259200000).toISOString(),
            author: { username: 'cafe_mundial', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=CafeMundial' },
            community: { name: 'Culture' }, locale: 'es'
        },
    ];

    useEffect(() => {
        const fetchTrending = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select(`*, author:profiles!posts_author_id_fkey(username, avatar_url), community:communities!posts_community_id_fkey(name)`)
                    .order('upvotes', { ascending: false })
                    .limit(20);

                if (error) throw error;
                setPosts([...(data || []), ...getFallbacks()]);
            } catch (err) {
                console.error('[TrendingPage] Error:', err);
                setPosts(getFallbacks());
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrending();
    }, [timeFilter]);

    const handleLike = (postId) => {
        setPosts(prev => prev.map(p => {
            if (p.id !== postId) return p;
            return p.is_upvoted
                ? { ...p, upvotes: Math.max(0, p.upvotes - 1), is_upvoted: false }
                : { ...p, upvotes: p.upvotes + 1, is_upvoted: true };
        }));
    };

    const navItems = [
        { icon: Home, label: t('navHome', 'Home'), path: '/feed' },
        { icon: TrendingUp, label: t('navTrending', 'Trending'), path: '/trending' },
        { icon: Users, label: t('navCommunities', 'Communities'), path: '/communities' },
        { icon: Bell, label: t('navNotifications', 'Notifications'), path: '/notifications' },
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
                                <div className="bg-[#6C63FF] aspect-square rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/20">
                                    <Monitor size={24} />
                                </div>
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
                    {/* Header */}
                    <header className={`sticky top-0 z-30 flex h-[72px] items-center justify-between border-b px-6 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#0A0A0F]/80' : 'border-slate-200 bg-[#F5F5F0]/80'}`}>
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/20">
                                <Flame size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{t('navTrending', 'Trending')}</h1>
                                <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Most upvoted discussions globally</p>
                            </div>
                        </div>
                        <div className={`flex p-1 rounded-lg ${isDarkMode ? 'bg-[#1A1A24] border border-[#2A2A3A]' : 'bg-white border border-slate-200 shadow-sm'}`}>
                            {[
                                { key: 'day', label: 'Today', icon: Clock },
                                { key: 'week', label: 'This Week', icon: Star },
                                { key: 'all', label: 'All Time', icon: Flame },
                            ].map((f) => (
                                <button key={f.key} onClick={() => setTimeFilter(f.key)}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${timeFilter === f.key
                                        ? 'bg-[#6C63FF] text-white shadow-md'
                                        : `text-slate-500 ${isDarkMode ? 'text-[#8888AA] hover:text-white' : 'hover:text-slate-900'}`
                                        }`}>
                                    <f.icon size={14} />
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </header>

                    <main className="max-w-[680px] w-full mx-auto py-6 px-4 flex flex-col gap-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
                                <p className={`text-sm ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Loading trending posts...</p>
                            </div>
                        ) : (
                            posts.map((post, index) => (
                                <article key={post.id} className={`rounded-2xl border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                    <div className="p-6 flex gap-5">
                                        {/* Rank Badge */}
                                        <div className={`flex-shrink-0 flex flex-col items-center justify-center w-12 ${index < 3 ? 'text-orange-500' : isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`}>
                                            <span className={`text-2xl font-extrabold ${index < 3 ? 'bg-gradient-to-b from-orange-400 to-red-500 bg-clip-text text-transparent' : ''}`}>#{index + 1}</span>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <img alt={post.author?.username} className="size-6 rounded-full" src={post.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${post.author?.username}`} />
                                                <span className="font-bold">{post.author?.username || 'Anonymous'}</span>
                                                <span className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>in</span>
                                                <span className="text-[#6C63FF] font-bold">{post.community?.name || 'General'}</span>
                                                <span className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>• {new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <Link to={`/post/${post.id}`} className="group block">
                                                <PostContentRenderer post={post} currentLangCode={currentLangCode} />
                                            </Link>
                                            <div className="flex items-center gap-6 mt-1">
                                                <button onClick={() => handleLike(post.id)}
                                                    className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${post.is_upvoted ? 'text-[#6C63FF]' : isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}>
                                                    <ArrowUp size={18} />
                                                    {post.upvotes}
                                                </button>
                                                <Link to={`/post/${post.id}`} className={`flex items-center gap-1.5 text-sm font-bold ${isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'} transition-colors`}>
                                                    <MessageSquare size={18} />
                                                    {post.comment_count}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TrendingPage;
