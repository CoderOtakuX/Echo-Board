import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, Settings, MoreHorizontal,
    Monitor, ArrowUp, ArrowDown, MessageSquare, Globe, ArrowLeft, Hash, Share2, Bookmark as BookmarkIcon
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
                const tTitle = await translate(post.title_original, post.locale, currentLangCode);
                const tBody = await translate(bodyPreview, post.locale, currentLangCode);
                setTitle(tTitle);
                setBody(tBody);
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
            <p className="dark:text-slate-300 text-slate-600 text-base leading-relaxed">
                {isTranslating && !hasTranslated ? <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-full block rounded"></span> : body}
            </p>
            {(needsTranslation || post.title_translated) && (
                <div className="mt-3 flex justify-end">
                    <button onClick={(e) => { e.preventDefault(); setShowOriginal(!showOriginal); }}
                        className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
                        <Globe size={14} />{showOriginal ? 'See Translation' : 'See Original'}
                    </button>
                </div>
            )}
        </div>
    );
};

const CommunityDetailPage = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const { id } = useParams();
    const location = useLocation();
    const currentLangCode = i18n.language.split('-')[0].toLowerCase();

    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    const mockCommunityData = {
        'mock-1': { name: 'Technology', description: 'Discuss the latest in AI, web dev, and emerging tech.', icon: '💻', color: 'from-blue-500 to-cyan-500' },
        'mock-2': { name: 'Philosophy', description: 'Existentialism, ethics, and the big questions of life.', icon: '🧠', color: 'from-purple-500 to-pink-500' },
        'mock-3': { name: 'Culture', description: 'Explore traditions, arts, and customs from around the world.', icon: '🌍', color: 'from-orange-500 to-red-500' },
        'mock-4': { name: 'Design', description: 'UI/UX, graphic design, architecture, and visual arts.', icon: '🎨', color: 'from-emerald-500 to-teal-500' },
        'mock-5': { name: 'Literature', description: 'Books, poetry, writing, and literary criticism.', icon: '📚', color: 'from-amber-500 to-yellow-500' },
        'mock-6': { name: 'Science', description: 'Physics, biology, chemistry, and breakthrough discoveries.', icon: '🔬', color: 'from-indigo-500 to-violet-500' },
        'mock-7': { name: 'Music', description: 'From classical compositions to underground beats.', icon: '🎵', color: 'from-rose-500 to-pink-500' },
        'mock-8': { name: 'Food & Drink', description: 'Recipes, restaurants, coffee culture, and culinary traditions.', icon: '☕', color: 'from-orange-400 to-amber-500' },
    };

    const getMockPosts = (communityName) => [
        {
            id: `${id}-post-1`, title_original: `Welcome to ${communityName}!`,
            body_original: `This is the official hub for all things ${communityName}. Share your thoughts, start discussions, and connect with fellow enthusiasts from around the world. 🌍`,
            upvotes: 89, comment_count: 12, created_at: new Date(Date.now() - 3600000).toISOString(),
            author: { username: 'community_mod', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=CommunityMod' },
            community: { name: communityName }, locale: 'en'
        },
        {
            id: `${id}-post-2`, title_original: `What got you interested in ${communityName}?`,
            body_original: `I'd love to hear everyone's origin story. What first drew you to this topic? Share in the comments below!`,
            upvotes: 56, comment_count: 34, created_at: new Date(Date.now() - 86400000).toISOString(),
            author: { username: 'curious_mind', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=CuriousMind' },
            community: { name: communityName }, locale: 'en'
        },
    ];

    useEffect(() => {
        const fetchCommunityData = async () => {
            setIsLoading(true);
            try {
                // Check if it's a mock community
                if (id.startsWith('mock-')) {
                    const mock = mockCommunityData[id];
                    if (mock) {
                        setCommunity({ id, ...mock });
                        setPosts(getMockPosts(mock.name));
                        setMemberCount(Math.floor(Math.random() * 20000) + 1000);
                    }
                    setIsLoading(false);
                    return;
                }

                // Fetch real community
                const { data: communityData, error: communityError } = await supabase
                    .from('communities')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (communityError) throw communityError;
                setCommunity(communityData);

                // Fetch posts for this community
                const { data: postsData, error: postsError } = await supabase
                    .from('posts')
                    .select(`*, author:profiles!posts_author_id_fkey(username, avatar_url), community:communities!posts_community_id_fkey(name)`)
                    .eq('community_id', id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (postsError) throw postsError;
                const realPosts = postsData || [];
                setPosts(realPosts.length > 0 ? realPosts : getMockPosts(communityData?.name || 'Community'));

                // Check membership
                if (user) {
                    const { data: memberData } = await supabase
                        .from('community_members')
                        .select('id')
                        .eq('community_id', id)
                        .eq('user_id', user.id)
                        .single();
                    if (memberData) setIsJoined(true);
                }

                // Get member count
                const { count } = await supabase
                    .from('community_members')
                    .select('*', { count: 'exact', head: true })
                    .eq('community_id', id);
                setMemberCount(count || 0);

            } catch (err) {
                console.error('[CommunityDetailPage] Error:', err);
                const mock = mockCommunityData[id];
                if (mock) {
                    setCommunity({ id, ...mock });
                    setPosts(getMockPosts(mock.name));
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCommunityData();
    }, [id, user]);

    const handleJoin = async () => {
        if (!user) return;
        if (id.startsWith('mock-')) {
            setIsJoined(!isJoined);
            setMemberCount(prev => isJoined ? prev - 1 : prev + 1);
            return;
        }
        try {
            if (isJoined) {
                await supabase.from('community_members').delete().eq('community_id', id).eq('user_id', user.id);
                setIsJoined(false);
                setMemberCount(prev => Math.max(0, prev - 1));
            } else {
                await supabase.from('community_members').upsert({ community_id: id, user_id: user.id, role: 'member' });
                setIsJoined(true);
                setMemberCount(prev => prev + 1);
            }
        } catch (err) {
            console.error('[CommunityDetailPage] Join error:', err);
            setIsJoined(!isJoined);
        }
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
            </div>
        );
    }

    if (!community) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0F] text-white gap-4">
                <h1 className="text-2xl font-bold">Community not found</h1>
                <Link to="/communities" className="text-[#6C63FF] font-bold hover:underline">Back to Communities</Link>
            </div>
        );
    }

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
                    {/* Community Header */}
                    <div className={`relative overflow-hidden`}>
                        <div className={`h-36 w-full bg-gradient-to-r ${community.color || 'from-[#6C63FF] to-purple-500'}`}>
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        <div className={`px-6 pb-6 pt-0 -mt-10 relative z-10 ${isDarkMode ? 'bg-[#0A0A0F]' : 'bg-[#F5F5F0]'}`}>
                            <div className="flex items-end gap-5 mb-4">
                                <div className={`size-20 rounded-2xl bg-gradient-to-br ${community.color || 'from-[#6C63FF] to-purple-500'} flex items-center justify-center text-3xl shadow-xl border-4 ${isDarkMode ? 'border-[#0A0A0F]' : 'border-[#F5F5F0]'}`}>
                                    {community.icon || <Hash size={32} className="text-white" />}
                                </div>
                                <div className="flex-1 flex items-end justify-between">
                                    <div>
                                        <h1 className="text-2xl font-extrabold">{community.name}</h1>
                                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                            <Users size={14} className="inline mr-1" />{memberCount.toLocaleString()} members • {posts.length} posts
                                        </p>
                                    </div>
                                    <button onClick={handleJoin}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${isJoined
                                            ? `border ${isDarkMode ? 'border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF]/10' : 'border-[#6C63FF] text-[#6C63FF]'}`
                                            : 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 shadow-lg shadow-[#6C63FF]/20'
                                            }`}>
                                        {isJoined ? 'Joined ✓' : 'Join Community'}
                                    </button>
                                </div>
                            </div>
                            <p className={`text-sm max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{community.description || 'Welcome to this community!'}</p>
                        </div>
                        <div className={`border-b ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}></div>
                    </div>

                    {/* Posts */}
                    <main className="max-w-[680px] w-full mx-auto py-6 px-4 flex flex-col gap-4">
                        <Link to="/communities" className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDarkMode ? 'text-[#8888AA] hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                            <ArrowLeft size={16} /> Back to Communities
                        </Link>

                        {posts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                <MessageSquare size={48} className="text-slate-300" />
                                <h2 className="text-xl font-bold">No posts yet</h2>
                                <p className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Be the first to post in {community.name}!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <article key={post.id} className={`rounded-2xl border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                    <div className="p-6 flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <img alt={post.author?.username} className="size-8 rounded-full" src={post.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${post.author?.username}`} />
                                            <div>
                                                <span className="font-bold text-sm">{post.author?.username || 'Anonymous'}</span>
                                                <span className={`text-xs ml-2 ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>• {new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Link to={`/post/${post.id}`} className="group block">
                                            <PostContentRenderer post={post} currentLangCode={currentLangCode} />
                                        </Link>
                                        <div className={`flex items-center gap-6 pt-3 border-t ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-100'}`}>
                                            <button onClick={() => handleLike(post.id)}
                                                className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${post.is_upvoted ? 'text-[#6C63FF]' : isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}>
                                                <ArrowUp size={18} />{post.upvotes}
                                            </button>
                                            <Link to={`/post/${post.id}`} className={`flex items-center gap-1.5 text-sm font-bold ${isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'} transition-colors`}>
                                                <MessageSquare size={18} />{post.comment_count}
                                            </Link>
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

export default CommunityDetailPage;
