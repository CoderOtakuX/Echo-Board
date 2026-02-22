import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, MoreHorizontal,
    Monitor, Search, Moon, Sun, Plus, Image, Smile,
    ArrowUp, ArrowDown, MessageSquare, Share2, Globe, Lightbulb,
    Settings, MoreVertical, X, Coffee, Menu
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

    // Reset states when post or language changes (critical for re-translation)
    useEffect(() => {
        console.log('[PostContentRenderer] Reset triggered:', { postId: post.id, lang: currentLangCode, locale: post.locale });
        setTitle(post.title_translated || post.title_original);
        setBody(post.body_translated || post.body_original);
        setHasTranslated(false);
        setShowOriginal(false);
        translatingRef.current = false;
    }, [currentLangCode, post.id, post.title_translated, post.title_original]);

    // Translation effect — only depends on needsTranslation, showOriginal, and the actual content
    useEffect(() => {
        const fetchTranslation = async () => {
            if (needsTranslation && !translatingRef.current && !showOriginal) {
                translatingRef.current = true;
                console.log('[PostContentRenderer] Starting translation:', { postId: post.id, from: post.locale, to: currentLangCode });

                const bodyPreview = post.body_original?.length > 200 ? post.body_original.substring(0, 200) + '...' : post.body_original;

                const translatedTitle = await translate(post.title_original, post.locale, currentLangCode);
                const translatedBody = await translate(bodyPreview, post.locale, currentLangCode);

                console.log('[PostContentRenderer] Translation result:', {
                    postId: post.id,
                    originalTitle: post.title_original?.substring(0, 30),
                    translatedTitle: translatedTitle?.substring(0, 30),
                    changed: translatedTitle !== post.title_original
                });

                setTitle(translatedTitle);
                setBody(translatedBody);
                setHasTranslated(true);
            }
        };

        if (!showOriginal && needsTranslation && !hasTranslated) {
            fetchTranslation();
        } else if (showOriginal) {
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
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={(e) => { e.preventDefault(); setShowOriginal(!showOriginal); }}
                        className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1"
                    >
                        <Globe size={14} />
                        {showOriginal ? 'See Translation' : 'See Original'}
                    </button>
                </div>
            )}
        </div>
    );
};

const FeedPage = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState('Hot');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [communities, setCommunities] = useState([]);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    console.log('[FeedPage] Render:', {
        userId: user?.id,
        isLoading,
        postsCount: posts.length,
        error
    });

    // Get current language details
    const currentLangCode = (i18n.language || 'en').split('-')[0];
    console.log('[FeedPage] Language Sync:', { i18n_lang: i18n.language, base_code: currentLangCode });
    const languages = [
        { code: 'en', flag: '🇺🇸', name: 'English' },
        { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
        { code: 'es', flag: '🇪🇸', name: 'Spanish' },
        { code: 'fr', flag: '🇫🇷', name: 'French' },
        { code: 'de', flag: '🇩🇪', name: 'German' },
        { code: 'zh', flag: '🇨🇳', name: 'Mandarin' },
        { code: 'ko', flag: '🇰🇷', name: 'Korean' },
        { code: 'it', flag: '🇮🇹', name: 'Italian' },
        { code: 'hi', flag: '🇮🇳', name: 'Hindi' },
    ];
    const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const fetchCommunities = async () => {
        try {
            const { data, error: communityError } = await supabase
                .from('communities')
                .select('*')
                .limit(5);
            if (communityError) throw communityError;
            setCommunities(data || []);
        } catch (err) {
            console.error('[FeedPage] Error fetching communities:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCommunities();

        // Real-time subscription
        let subscription;
        const setupSubscription = async () => {
            try {
                subscription = supabase
                    .channel('public:posts')
                    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
                        console.log('[FeedPage] Real-time update received:', payload);
                        fetchPosts();
                    })
                    .subscribe();
            } catch (err) {
                console.error('[FeedPage] Failed to setup subscription:', err);
            }
        };

        setupSubscription();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [activeTab, currentLangCode]);

    const handleLanguageChange = async (langCode) => {
        try {
            console.log('[FeedPage] Changing language to:', langCode);
            await i18n.changeLanguage(langCode);
            setIsLangMenuOpen(false);

            if (user) {
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        preferredLanguage: langCode
                    }
                });
            }
        } catch (err) {
            console.error('[FeedPage] Error changing language:', err);
        }
    };

    const [newPostContent, setNewPostContent] = useState('');

    const getFallbacks = () => [
        {
            id: 'fallback-1',
            title_original: "O cafézinho da tarde em São Paulo",
            title_translated: t('post1_title'),
            body_original: "O cafézinho da tarde é sagrado em São Paulo. 🇧🇷",
            body_translated: t('post1_body'),
            is_saved: false,
            upvotes: 1240,
            comment_count: 45,
            created_at: new Date().toISOString(),
            author: { username: 'ana_silva', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ana' },
            community: { name: 'Culture' },
            locale: 'pt'
        },
        {
            id: 'fallback-2',
            title_original: "Existence precedes essence?",
            title_translated: t('post2_title'),
            body_original: "Does existence precede essence? Exploring Sartrean thoughts in modern era.",
            body_translated: t('post2_body'),
            upvotes: 850,
            comment_count: 32,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            author: { username: 'marcus_a', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus' },
            community: { name: 'Philosophy' },
            locale: 'en'
        },
        {
            id: 'fallback-3',
            title_original: "京都の庭園における『間』の概念について。",
            title_translated: t('post3_title'),
            body_original: "京都の庭園における『間』の概念について。🇯🇵",
            body_translated: t('post3_body'),
            upvotes: 2100,
            comment_count: 89,
            created_at: new Date(Date.now() - 7200000).toISOString(),
            author: { username: 'kyoto_design', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kyoto' },
            community: { name: 'Design' },
            locale: 'ja'
        }
    ];

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        console.log('[FeedPage] Fetching posts for tab:', activeTab);
        try {
            // Primary query with relations
            let query = supabase.from('posts').select(`
                *,
                author:profiles!posts_author_id_fkey(username, avatar_url),
                community:communities!posts_community_id_fkey(name)
            `);

            // Global Feed: No locale filtering

            // Fetch user's saved posts to mark them
            let savedPostIds = new Set();
            let votedPostIds = new Set();
            if (user) {
                const { data: savedData } = await supabase
                    .from('saved_posts')
                    .select('post_id')
                    .eq('user_id', user.id);
                if (savedData) {
                    savedPostIds = new Set(savedData.map(s => s.post_id));
                }

                // Fetch user's existing votes to prevent double-voting
                const { data: votesData } = await supabase
                    .from('votes')
                    .select('post_id')
                    .eq('user_id', user.id);
                if (votesData) {
                    votedPostIds = new Set(votesData.map(v => v.post_id));
                }
            }

            if (activeTab === 'New') {
                query = query.order('created_at', { ascending: false });
            } else if (activeTab === 'Top') {
                query = query.order('upvotes', { ascending: false });
            } else {
                query = query.order('upvotes', { ascending: false }).order('created_at', { ascending: false });
            }

            const { data, error: fetchError } = await query.limit(20);

            if (fetchError) {
                console.error('[FeedPage] Supabase error in primary query:', fetchError);

                // Fallback to simpler query if primary fails (e.g. relation name mismatch)
                console.log('[FeedPage] Attempting simpler fallback query...');
                const { data: simpleData, error: simpleError } = await supabase
                    .from('posts')
                    .select('*')
                    .limit(20);

                if (simpleError) throw simpleError;
                const basePosts = simpleData && simpleData.length > 0 ? simpleData : [];
                setPosts([...basePosts, ...getFallbacks()]);
            } else {
                console.log('[FeedPage] Posts fetched successfully:', data ? data.length : 0);
                const enrichedPosts = (data || []).map(p => ({
                    ...p,
                    is_saved: savedPostIds.has(p.id),
                    is_upvoted: votedPostIds.has(p.id)
                }));
                // Merge real posts with fallbacks to keep the app looking populated
                setPosts([...enrichedPosts, ...getFallbacks()]);
            }
        } catch (err) {
            console.error('[FeedPage] Terminal error fetching posts:', err);
            setPosts(getFallbacks());
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (postId, currentUpvotes) => {
        if (!user) return;

        console.log('[FeedPage] handleLike triggered for post:', postId);

        // Guard for fallback/demo posts
        if (postId.toString().startsWith('fallback-')) {
            console.log('[FeedPage] Handling vote for fallback post (UI only)');
            const post = posts.find(p => p.id === postId);
            if (!post) return;

            if (post.is_upvoted) {
                // Already voted — toggle OFF
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: Math.max(0, p.upvotes - 1), is_upvoted: false } : p));
            } else {
                // Not yet voted — toggle ON (and auto-save)
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1, is_upvoted: true, is_saved: true } : p));
            }
            return;
        }

        try {
            // Check local state first to prevent duplicate votes
            const currentPost = posts.find(p => p.id === postId);
            if (currentPost?.is_upvoted) {
                // Already voted — toggle OFF (remove vote)
                console.log('[FeedPage] Removing existing vote (was already upvoted)');
                const { data: existingVote } = await supabase
                    .from('votes')
                    .select('id')
                    .eq('post_id', postId)
                    .eq('user_id', user.id)
                    .single();

                if (existingVote) {
                    await supabase.from('votes').delete().eq('id', existingVote.id);
                }
                await supabase.from('posts').update({ upvotes: Math.max(0, currentUpvotes - 1) }).eq('id', postId);
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: Math.max(0, p.upvotes - 1), is_upvoted: false } : p));
                return;
            }
            // Not yet voted — Add vote (Toggle on)
            console.log('[FeedPage] Adding new vote');
            const { error: insertError } = await supabase
                .from('votes')
                .insert({
                    post_id: postId,
                    user_id: user.id,
                    vote_type: 'up'
                });

            if (insertError) throw insertError;

            const { error: updateError } = await supabase
                .from('posts')
                .update({ upvotes: currentUpvotes + 1 })
                .eq('id', postId);

            if (updateError) throw updateError;

            // Automatically save post when upvoting
            const { error: saveError } = await supabase
                .from('saved_posts')
                .insert({ post_id: postId, user_id: user.id });

            if (saveError && saveError.code !== '23505') {
                console.error('[FeedPage] Note: Failed to auto-save post on upvote', saveError);
            }

            // Optimistic update
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1, is_upvoted: true, is_saved: true } : p));
        } catch (err) {
            console.error('[FeedPage] Error handling like:', err);
            // Still optimistically update the UI
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1, is_upvoted: true, is_saved: true } : p));
        }
    };

    const handleToggleSavePost = async (postId, isSaved) => {
        if (!user) return;
        console.log('[FeedPage] handleToggleSavePost:', { postId, isSaved });

        // Guard for fallback/demo posts
        if (postId.toString().startsWith('fallback-')) {
            console.log('[FeedPage] Toggling save for fallback post (UI only)');
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_saved: !isSaved } : p));
            return;
        }

        try {
            if (isSaved) {
                const { error } = await supabase
                    .from('saved_posts')
                    .delete()
                    .eq('post_id', postId)
                    .eq('user_id', user.id);
                if (error) throw error;
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_saved: false } : p));
            } else {
                const { error } = await supabase
                    .from('saved_posts')
                    .insert({ post_id: postId, user_id: user.id });
                if (error) throw error;
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_saved: true } : p));
            }
        } catch (err) {
            console.error('[FeedPage] Error saving post:', err);
            // Still toggle the UI optimistically even if DB fails
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_saved: !isSaved } : p));
        }
    };

    const handleJoinCommunity = async (communityId) => {
        if (!user) return;
        console.log('[FeedPage] handleJoinCommunity:', communityId);
        try {
            // Handle mock data or missing IDs
            const cid = typeof communityId === 'string' && communityId.length < 20 ? null : communityId;
            if (!cid) {
                alert(`Community "${communityId}" is in Demo Mode. Join successful (Simulation).`);
                return;
            }
            const { error } = await supabase
                .from('community_members')
                .upsert({ community_id: cid, user_id: user.id, role: 'member' });
            if (error) throw error;
            alert('Joined community successfully!');
            fetchCommunities();
        } catch (err) {
            console.error('[FeedPage] Error joining community:', err);
        }
    };

    const ensureProfileExists = async () => {
        if (!user) return null;
        console.log('[FeedPage] Ensuring profile exists for:', user.id);
        try {
            const { data: existingProfile, error: fetchError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (existingProfile) return existingProfile;

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
                console.error('[FeedPage] Error checking profile:', fetchError);
            }

            console.log('[FeedPage] Profile not found, creating lazy profile...');
            const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    username: user.username || `user_${user.id.substring(0, 8)}`,
                    avatar_url: user.imageUrl
                })
                .select()
                .single();

            if (createError) {
                console.error('[FeedPage] Lazy profile creation failed:', createError);
                throw createError;
            }

            console.log('[FeedPage] Lazy profile created successfully');
            return newProfile;
        } catch (err) {
            console.error('[FeedPage] Profile check/create error:', err);
            return null;
        }
    };

    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;

        try {
            // Ensure profile exists (Lazy Creation)
            const profile = await ensureProfileExists();

            if (!profile) {
                console.error('[FeedPage] Could not find or create profile after checks');
                alert('Profile not found and could not be created automatically. Please try completing onboarding again or check your connection.');
                return;
            }

            // Find a community to post to
            let communityId = selectedCommunity || null;
            if (!communityId) {
                // Fallback to first community
                const { data: community } = await supabase.from('communities').select('id').limit(1).single();
                communityId = community?.id;
            }

            const { error: createError } = await supabase
                .from('posts')
                .insert({
                    title_original: newPostContent.substring(0, 50) + (newPostContent.length > 50 ? '...' : ''),
                    body_original: newPostContent,
                    author_id: profile.id,
                    community_id: communityId,
                    locale: currentLangCode
                });

            if (createError) throw createError;

            setNewPostContent('');
            setSelectedCommunity('');
            setShowCreatePost(false);
            fetchPosts();
        } catch (err) {
            console.error('[FeedPage] Error creating post:', err);
            alert(`Failed to create post: ${err.message}`);
        }
    };

    const handleShare = (postId) => {
        const url = `${window.location.origin}/post/${postId}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    };

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
                                    { icon: Home, label: t('navHome', 'Home'), path: '/feed' },
                                    { icon: TrendingUp, label: t('navTrending', 'Trending'), path: '/trending' },
                                    { icon: Users, label: t('navCommunities', 'Communities'), path: '/communities' },
                                    { icon: Bell, label: t('navNotifications', 'Notifications'), path: '/notifications' },
                                    { icon: Bookmark, label: t('navSaved', 'Saved'), path: '/saved' },
                                    { icon: Settings, label: t('navSettings', 'Settings'), path: '/settings' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className={`group flex items-center gap-4 px-4 py-3 rounded-full transition-all ${location.pathname === item.path
                                            ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                                            : `hover:bg-slate-200 dark:hover:bg-white/5 ${isDarkMode ? 'text-[#8888AA] hover:text-[#F0F0FF]' : 'text-slate-500 hover:text-slate-900'}`
                                            }`}
                                    >
                                        <item.icon size={24} className={location.pathname === item.path ? 'text-[#6C63FF]' : 'group-hover:text-[#6C63FF] transition-colors'} />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-[#6C63FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-[#6C63FF]/20">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* User Profile */}
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-200'}`}>
                            <img alt="User profile" className={`size-10 rounded-full object-cover border-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user?.fullName || user?.username || 'User'}</span>
                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>@{user?.username || 'user'}</span>
                            </div>
                            <MoreHorizontal className={`ml-auto ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`} size={20} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 lg:pl-72 flex-col min-h-screen relative z-0">
                    {/* Top Navbar */}
                    <header className={`sticky top-0 z-30 flex h-[72px] items-center justify-between border-b px-3 sm:px-6 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#0A0A0F]/80' : 'border-slate-200 bg-[#F5F5F0]/80'}`}>
                        <div className="flex-1 max-w-xl hidden sm:block">
                            <div className="relative group">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-[#8888AA] group-focus-within:text-[#6C63FF]' : 'text-slate-400 group-focus-within:text-[#6C63FF]'}`} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    className={`w-full rounded-full border-none py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#6C63FF] transition-all ${isDarkMode ? 'bg-[#1A1A24] text-white placeholder-[#8888AA]' : 'bg-white text-slate-900 placeholder-slate-400 shadow-sm'}`}
                                />
                            </div>
                        </div>
                        {/* Mobile Logo */}
                        <Link to="/feed" className="flex sm:hidden items-center gap-2">
                            <div className="bg-[#6C63FF] rounded-lg size-8 flex items-center justify-center text-white shadow-md">
                                <Monitor size={18} />
                            </div>
                            <span className="font-bold text-sm">EchoBoard</span>
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-4 ml-4">
                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className={`lg:hidden p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                <Menu size={20} />
                            </button>
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={() => navigate('/notifications')}
                                className={`p-2 rounded-full transition-colors relative ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                <Bell size={20} />
                            </button>
                            <button
                                onClick={() => navigate('/settings')}
                                className={`hidden sm:block p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                <MessageSquare size={20} />
                            </button>
                            <Link to="/settings" className={`h-9 w-9 overflow-hidden rounded-full border-2 flex-shrink-0 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}>
                                <img alt="User" className="h-full w-full object-cover" src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                            </Link>
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
                                    <img alt="User" className={`size-10 rounded-full border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                                    <div className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium ${isDarkMode ? 'bg-[#111118] text-[#8888AA]' : 'bg-slate-50 text-slate-400'}`}>
                                        {t('composerPlaceholder', "What's on your mind? Write in your language...")}
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
                                <div className="relative">
                                    <button
                                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-white hover:bg-[#2A2A3A]' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm'}`}
                                    >
                                        <Globe size={16} className="text-[#6C63FF]" />
                                        <span>{currentLang.flag} {currentLang.name}</span>
                                    </button>
                                    {isLangMenuOpen && (
                                        <div className={`absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-2xl z-50 py-2 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200'}`}>
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageChange(lang.code)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${currentLangCode === lang.code
                                                        ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                                                        : isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <span className="text-lg">{lang.flag}</span>
                                                    <span>{lang.name}</span>
                                                    {currentLangCode === lang.code && <span className="ml-auto text-[#6C63FF]">✓</span>}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Posts Feed */}
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>{t('loadingPosts')}</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                    <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                                        <X size={32} />
                                    </div>
                                    <p className="text-lg font-bold text-red-500">{error}</p>
                                    <button onClick={fetchPosts} className="text-[#6C63FF] font-bold hover:underline">{t('tryAgain', 'Try Again')}</button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {posts.map((post) => (
                                        <article key={post.id} className={`rounded-2xl border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] hover:border-[#6C63FF]/30' : 'bg-white border-slate-200 hover:border-[#6C63FF]/30 shadow-sm'}`}>
                                            <div className="p-6 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <img alt={post.author?.username} className={`size-10 rounded-full border ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src={post.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${post.author?.username}&backgroundColor=e5e7eb`} />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold hover:underline cursor-pointer">{post.author?.username || 'Anonymous'}</span>
                                                                <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>• {new Date(post.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                            <span className={`text-xs font-medium ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                                {t('postedIn')} <span className="text-[#6C63FF] hover:underline cursor-pointer">{post.community?.name || 'General'}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-[#8888AA]' : 'hover:bg-slate-100 text-slate-400'}`}>
                                                        <MoreHorizontal size={20} />
                                                    </button>
                                                </div>

                                                <Link to={`/post/${post.id}`} className="group block">
                                                    <PostContentRenderer post={post} currentLangCode={currentLangCode} />
                                                </Link>

                                                {/* Cultural Context (Always localized for post1, 2, 3 patterns for now) */}
                                                {(post.id === 'fallback-1' || post.title_original?.includes('São Paulo')) && (
                                                    <div className={`relative overflow-hidden rounded-xl border p-4 ${isDarkMode ? 'bg-[#1A180A] border-[#FFD700]/40' : 'bg-yellow-50 border-[#FFD700]/40'}`}>
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700]"></div>
                                                        <div className="flex gap-3 pl-2">
                                                            <div className="mt-0.5 text-[#FFD700]">
                                                                <Lightbulb size={20} />
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider block mb-1">{t('post1_context_title')}</span>
                                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                                    {t('post1_context_body')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Bar */}
                                            <div className={`px-6 py-4 border-t flex items-center justify-between ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-100 bg-slate-50'}`}>
                                                <div className="flex items-center gap-6">
                                                    <div className={`flex items-center rounded-lg border overflow-hidden ${isDarkMode ? 'border-[#2A2A3A] bg-[#1A1A24]' : 'border-slate-200 bg-white'}`}>
                                                        <button
                                                            onClick={() => handleLike(post.id, post.upvotes)}
                                                            className={`px-3 py-1.5 transition-colors border-r ${post.is_upvoted
                                                                ? 'bg-[#6C63FF]/20 text-[#6C63FF]'
                                                                : `hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`
                                                                } ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}
                                                        >
                                                            <ArrowUp size={18} />
                                                        </button>
                                                        <span className={`px-3 text-sm font-bold ${post.is_upvoted ? 'text-[#6C63FF]' : ''}`}>{post.upvotes}</span>
                                                        <button className={`px-3 py-1.5 hover:bg-red-500/10 hover:text-red-500 transition-colors border-l ${isDarkMode ? 'border-[#2A2A3A] text-[#8888AA]' : 'border-slate-200 text-slate-500'}`}>
                                                            <ArrowDown size={18} />
                                                        </button>
                                                    </div>
                                                    <Link to={`/post/${post.id}`} className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}>
                                                        <MessageSquare size={20} className="group-hover:text-[#6C63FF] transition-colors" />
                                                        {post.comment_count}
                                                    </Link>
                                                    <button
                                                        onClick={() => handleShare(post.id)}
                                                        className={`flex items-center gap-2 text-sm font-bold group ${isDarkMode ? 'text-[#8888AA] hover:text-green-500' : 'text-slate-500 hover:text-green-500'}`}
                                                    >
                                                        <Share2 size={20} className="group-hover:text-green-500 transition-colors" />
                                                        {t('share')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleSavePost(post.id, post.is_saved)}
                                                        className={`flex items-center gap-2 text-sm font-bold group ${post.is_saved ? 'text-[#6C63FF]' : isDarkMode ? 'text-[#8888AA] hover:text-[#6C63FF]' : 'text-slate-500 hover:text-[#6C63FF]'}`}
                                                    >
                                                        <Bookmark size={20} className={post.is_saved ? 'fill-current' : 'group-hover:text-[#6C63FF] transition-colors'} />
                                                        {post.is_saved ? t('saved') || 'Saved' : t('save') || 'Save'}
                                                    </button>
                                                </div>
                                                <ArticleTranslationToggle post={post} isDarkMode={isDarkMode} t={t} />
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </main>

                        {/* Right Sidebar (Sticky) */}
                        <aside className="hidden xl:flex w-80 flex-col gap-6 sticky top-[100px] h-fit pl-6">
                            {/* Trending Communities */}
                            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <h3 className="font-bold text-base mb-4">{t('trendingCommunities', 'Trending Communities')}</h3>
                                <div className="flex flex-col gap-4">
                                    {(communities.length > 0 ? communities : [
                                        { name: 'FutureOfWork', members: '12.5k', icon: Monitor, color: 'text-emerald-500 bg-emerald-500/10' },
                                        { name: 'GlobalCuisine', members: '8.2k', icon: Coffee, color: 'text-pink-500 bg-pink-500/10' },
                                        { name: 'TechNomads', members: '22k', icon: Globe, color: 'text-blue-500 bg-blue-500/10' }
                                    ]).map((item) => (
                                        <div
                                            key={item.name}
                                            onClick={() => {
                                                alert(t('joining_community', 'Joining community...') + ' ' + item.name);
                                                handleJoinCommunity(item.id || item.name);
                                            }}
                                            className="flex items-center justify-between group cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 p-2 rounded-xl transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-lg flex items-center justify-center border border-white/5 ${item.color || 'bg-[#6C63FF]/10 text-[#6C63FF]'}`}>
                                                    {typeof item.icon === 'string' ? <span className="text-xl">{item.icon}</span> : (item.icon ? <item.icon size={20} /> : <Users size={20} />)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold group-hover:text-[#6C63FF] transition-colors">{item.name}</span>
                                                    <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>{item.members || '0'} members</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleJoinCommunity(item.id)}
                                                className={`size-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-[#6C63FF] hover:text-white' : 'bg-slate-100 hover:bg-[#6C63FF] hover:text-white'}`}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-xs font-bold text-[#6C63FF] hover:underline">See All</button>
                            </div>

                            {/* Active Languages (Restyled) */}
                            <div className={`rounded-xl border p-5 relative ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A]' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-base">{t('activeLanguages', 'Active Languages')}</h3>
                                    <button
                                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                        className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-[#8888AA]' : 'hover:bg-slate-100 text-slate-500'}`}
                                    >
                                        <Globe size={18} />
                                    </button>
                                </div>

                                {isLangMenuOpen && (
                                    <div className={`absolute right-5 top-14 w-48 rounded-xl border-2 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 ${isDarkMode ? 'bg-[#111118] border-[#2A2A3A] text-white' : 'bg-white border-black text-black'}`}>
                                        <div className="px-3 py-1 mb-1 border-b border-white/5">
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Select Language</span>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageChange(lang.code)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-bold transition-colors hover:bg-[#6C63FF] hover:text-white ${currentLangCode === lang.code ? 'text-[#6C63FF]' : ''}`}
                                                >
                                                    <span>{lang.flag}</span>
                                                    <span>{lang.name}</span>
                                                    {currentLangCode === lang.code && <div className="ml-auto size-1.5 rounded-full bg-[#6C63FF]"></div>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3">
                                    {[
                                        { lang: currentLang.name, flag: currentLang.flag, percent: 100, width: '100%' },
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
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    className={`w-full h-32 p-4 rounded-xl resize-none mb-4 ${isDarkMode ? 'bg-[#111118] text-white placeholder-[#8888AA]' : 'bg-slate-50 text-slate-900 placeholder-slate-400'}`}
                                    placeholder="What's on your mind?"
                                ></textarea>
                                {/* Community Selector */}
                                <div className="mb-4">
                                    <label className={`text-sm font-bold mb-2 block ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-600'}`}>Post to Community</label>
                                    <select
                                        value={selectedCommunity}
                                        onChange={(e) => setSelectedCommunity(e.target.value)}
                                        className={`w-full p-3 rounded-xl text-sm font-medium cursor-pointer ${isDarkMode ? 'bg-[#111118] text-white border border-[#2A2A3A] focus:border-[#6C63FF]' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#6C63FF]'} focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 transition-all`}
                                    >
                                        <option value="">Select a community...</option>
                                        {communities.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowCreatePost(false)} className={`px-4 py-2 rounded-lg font-bold ${isDarkMode ? 'text-[#8888AA] hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Cancel</button>
                                    <button onClick={handleCreatePost} className="px-6 py-2 bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white rounded-lg font-bold shadow-lg shadow-[#6C63FF]/20">Post</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Slide-Out Menu */}
                    {mobileMenuOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                            <div className={`absolute inset-y-0 left-0 w-72 flex flex-col border-r shadow-2xl animated ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]' : 'border-slate-200 bg-white'}`}>
                                <div className="flex h-full flex-col justify-between p-6">
                                    <div className="flex flex-col gap-8">
                                        <div className="flex items-center justify-between">
                                            <Link to="/feed" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                                                <div className="bg-[#6C63FF] aspect-square rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/20"><Monitor size={24} /></div>
                                                <div className="flex flex-col">
                                                    <h1 className="text-lg font-bold tracking-tight">EchoBoard</h1>
                                                    <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Global conversations</p>
                                                </div>
                                            </Link>
                                            <button onClick={() => setMobileMenuOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10 text-[#8888AA]' : 'hover:bg-slate-100 text-slate-500'}`}>
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <nav className="flex flex-col gap-2">
                                            {[
                                                { icon: Home, label: t('navHome', 'Home'), path: '/feed' },
                                                { icon: TrendingUp, label: t('navTrending', 'Trending'), path: '/trending' },
                                                { icon: Users, label: t('navCommunities', 'Communities'), path: '/communities' },
                                                { icon: Bell, label: t('navNotifications', 'Notifications'), path: '/notifications' },
                                                { icon: Bookmark, label: t('navSaved', 'Saved'), path: '/saved' },
                                                { icon: Settings, label: t('navSettings', 'Settings'), path: '/settings' },
                                            ].map((item) => (
                                                <Link key={item.label} to={item.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`group flex items-center gap-4 px-4 py-3 rounded-full transition-all ${window.location.pathname === item.path
                                                        ? 'bg-[#6C63FF]/10 text-[#6C63FF]'
                                                        : `${isDarkMode ? 'text-[#8888AA] hover:text-[#F0F0FF] hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`
                                                        }`}>
                                                    <item.icon size={24} className={window.location.pathname === item.path ? 'text-[#6C63FF]' : 'group-hover:text-[#6C63FF] transition-colors'} />
                                                    <span className="font-medium">{item.label}</span>
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className={`flex items-center gap-3 px-4 py-3`}>
                                        <img alt="User" className={`size-10 rounded-full object-cover border-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`} src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold">{user?.fullName || 'User'}</span>
                                            <span className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>@{user?.username || 'user'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Bottom Navigation */}
                    <nav className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-center justify-around border-t py-2 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#111118]/95' : 'border-slate-200 bg-white/95'}`}>
                        {[
                            { icon: Home, label: 'Home', path: '/feed' },
                            { icon: TrendingUp, label: 'Trending', path: '/trending' },
                            { icon: Plus, label: 'Post', action: () => setShowCreatePost(true), special: true },
                            { icon: Bell, label: 'Alerts', path: '/notifications' },
                            { icon: Users, label: 'Groups', path: '/communities' },
                        ].map((item) => (
                            item.action ? (
                                <button key={item.label} onClick={item.action}
                                    className="flex flex-col items-center justify-center gap-0.5 -mt-4">
                                    <div className="bg-[#6C63FF] p-3 rounded-full shadow-lg shadow-[#6C63FF]/30 text-white">
                                        <item.icon size={22} />
                                    </div>
                                </button>
                            ) : (
                                <Link key={item.label} to={item.path}
                                    className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 ${window.location.pathname === item.path
                                        ? 'text-[#6C63FF]'
                                        : isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'
                                        }`}>
                                    <item.icon size={20} />
                                    <span className="text-[10px] font-bold">{item.label}</span>
                                </Link>
                            )
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

const ArticleTranslationToggle = ({ post, isDarkMode, t }) => {
    const [showOriginal, setShowOriginal] = useState(false);
    return (
        <div className="flex flex-col items-end gap-2 relative">
            <button
                onClick={() => setShowOriginal(!showOriginal)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${showOriginal
                    ? 'bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/20'
                    : isDarkMode ? 'bg-white/5 text-[#8888AA] hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
                <Globe size={16} />
                {t('revealOriginal')}
            </button>
            {showOriginal && (
                <div className={`absolute bottom-full right-0 mb-4 w-64 p-4 rounded-xl border shadow-2xl animate-in fade-in slide-in-from-bottom-2 z-50 ${isDarkMode ? 'bg-[#1A1A24] border-[#2A2A3A] text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                    <p className="text-sm italic leading-relaxed">{post.body_original}</p>
                    <div className={`mt-2 pt-2 border-t text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'border-white/5 text-[#8888AA]' : 'border-slate-100 text-slate-400'}`}>
                        Original Content
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedPage;
