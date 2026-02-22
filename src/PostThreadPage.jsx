import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, MoreHorizontal,
    ArrowLeft, Share, MessageCircle, Heart, Lightbulb,
    Bold, Italic, Link as LinkIcon, Coffee, Monitor, Plus, Globe, X, Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { supabase } from './lib/supabase';
import { useTranslationEngine } from './hooks/useTranslationEngine';

const PostThreadPage = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const { user } = useUser();
    const [showOriginal, setShowOriginal] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [hasTranslated, setHasTranslated] = useState(false);
    const [translatedTitle, setTranslatedTitle] = useState('');
    const [translatedBody, setTranslatedBody] = useState('');

    const { translate, isTranslating: engineTranslating } = useTranslationEngine();
    const currentLangCode = i18n.language.split('-')[0].toLowerCase();

    console.log('[PostThreadPage] Render:', { id, post: !!post, commentsCount: comments.length, isLoading });

    useEffect(() => {
        const fetchTranslation = async () => {
            if (post && post.locale && post.locale !== currentLangCode && !post.title_translated && !showOriginal && !hasTranslated) {
                setIsTranslating(true);
                const tTitle = await translate(post.title_original, post.locale, currentLangCode);
                const tBody = await translate(post.body_original, post.locale, currentLangCode);
                setTranslatedTitle(tTitle);
                setTranslatedBody(tBody);
                setHasTranslated(true);
                setIsTranslating(false);
            }
        };
        fetchTranslation();

        // Reset if post changes
        if (post && (!translatedTitle || !translatedBody) && post.locale === currentLangCode) {
            setHasTranslated(false);
        }
    }, [post, currentLangCode, showOriginal, translate, hasTranslated, translatedTitle, translatedBody]);

    const displayTitle = showOriginal || (post && post.locale === currentLangCode) ? post?.title_original : (post?.title_translated || translatedTitle || post?.title_original);
    const displayBody = showOriginal || (post && post.locale === currentLangCode) ? post?.body_original : (post?.body_translated || translatedBody || post?.body_original);
    const showLoadingState = engineTranslating || isTranslating;
    const needsTranslationToggle = post && post.locale && post.locale !== currentLangCode;

    const getMockPosts = useCallback(() => ({
        'fallback-1': {
            id: 'fallback-1',
            title_original: "O cafézinho da tarde em São Paulo",
            title_translated: t('post1_title'),
            body_original: "O cafézinho da tarde é sagrado em São Paulo. 🇧🇷",
            body_translated: t('post1_body'),
            context_title: t('post1_context_title'),
            context_body: t('post1_context_body'),
            author: { username: 'ana_silva', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ana' },
            community: { name: 'Culture' },
            locale: 'pt',
            upvotes: 1240,
            comment_count: 45,
            created_at: new Date().toISOString()
        },
        'fallback-2': {
            id: 'fallback-2',
            title_original: "Existence precedes essence?",
            title_translated: t('post2_title'),
            body_original: "Does existence precede essence? Exploring Sartrean thoughts in modern era.",
            body_translated: t('post2_body'),
            context_title: t('post2_context_title'),
            context_body: t('post2_context_body'),
            author: { username: 'marcus_a', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus' },
            community: { name: 'Philosophy' },
            locale: 'en',
            upvotes: 850,
            comment_count: 32,
            created_at: new Date(Date.now() - 3600000).toISOString()
        }
    }), [t]);

    const fetchPostData = useCallback(async () => {
        setIsLoading(true);
        console.log('[PostThreadPage] Fetching data for id:', id);
        try {
            // Fetch post with relations
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select(`
                    *,
                    author:profiles!posts_author_id_fkey(username, avatar_url),
                    community:communities!posts_community_id_fkey(name)
                `)
                .eq('id', id)
                .single();

            if (postError) {
                console.error('[PostThreadPage] Supabase error in post fetch:', postError);
                // Fallback to simpler query if primary fails
                const { data: simplePost, error: simplePostError } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (simplePostError) throw simplePostError;
                setPost(simplePost);
            } else {
                // Check if this post is saved by the user
                let isSaved = false;
                if (user) {
                    const { data: savedData } = await supabase
                        .from('saved_posts')
                        .select('id')
                        .eq('post_id', id)
                        .eq('user_id', user.id)
                        .single();
                    if (savedData) isSaved = true;
                }
                setPost({ ...postData, is_saved: isSaved });
            }

            // Fetch comments
            const { data: commentData, error: commentError } = await supabase
                .from('comments')
                .select(`
                    *,
                    author:profiles!comments_author_id_fkey(username, avatar_url)
                `)
                .eq('post_id', id)
                .order('created_at', { ascending: true });

            if (commentError) {
                console.error('[PostThreadPage] Supabase error in comments fetch:', commentError);
                const { data: simpleComments } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('post_id', id);
                setComments(simpleComments || []);
            } else {
                setComments(commentData || []);
            }
        } catch (err) {
            console.error('[PostThreadPage] Terminal error fetching post (using fallback):', err);
            const mocks = getMockPosts();
            setPost(mocks['fallback-1']);
        } finally {
            setIsLoading(false);
        }
    }, [id, getMockPosts, user]);

    useEffect(() => {
        if (!id) return;

        if (id.startsWith('fallback-')) {
            const mocks = getMockPosts();
            setPost(mocks[id] || mocks['fallback-1']);
            setIsLoading(false);
        } else {
            fetchPostData();
        }

        // Real-time subscription for comments
        let subscription;
        const setupSubscription = async () => {
            subscription = supabase
                .channel(`public:comments:post_id=eq.${id}`)
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'comments',
                    filter: `post_id=eq.${id}`
                }, (payload) => {
                    console.log('[PostThreadPage] Real-time comment update received:', payload);
                    fetchPostData();
                })
                .subscribe();
        };

        if (!id.startsWith('fallback-')) {
            setupSubscription();
        }

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [id, fetchPostData, getMockPosts]);

    const handleLikePost = async () => {
        if (!user || !post || id.startsWith('fallback-')) return;

        console.log('[PostThreadPage] handleLikePost triggered');

        try {
            // Check if already voted
            const { data: existingVote, error: checkError } = await supabase
                .from('votes')
                .select('*')
                .eq('post_id', id)
                .eq('user_id', user.id)
                .single();

            if (checkError && checkError.code !== 'PGRST116') throw checkError;

            if (existingVote) {
                // Remove vote
                await supabase.from('votes').delete().eq('id', existingVote.id);
                const newUpvotes = Math.max(0, (post.upvotes || 0) - 1);
                await supabase.from('posts').update({ upvotes: newUpvotes }).eq('id', id);
                setPost(prev => ({ ...prev, upvotes: newUpvotes }));
            } else {
                // Add vote
                await supabase.from('votes').insert({ post_id: id, user_id: user.id, vote_type: 'up' });
                const newUpvotes = (post.upvotes || 0) + 1;
                await supabase.from('posts').update({ upvotes: newUpvotes }).eq('id', id);

                // Automatically save post when upvoting
                const { error: saveError } = await supabase
                    .from('saved_posts')
                    .insert({ post_id: id, user_id: user.id });

                if (saveError && saveError.code !== '23505') {
                    console.error('[PostThreadPage] Note: Failed to auto-save post on upvote', saveError);
                }

                setPost(prev => ({ ...prev, upvotes: newUpvotes, is_saved: true }));
            }
        } catch (err) {
            console.error('[PostThreadPage] Error liking post:', err);
        }
    };

    const handleToggleSavePost = async () => {
        if (!user || !post || id.startsWith('fallback-')) return;
        console.log('[PostThreadPage] handleToggleSavePost');
        try {
            if (post.is_saved) {
                const { error } = await supabase
                    .from('saved_posts')
                    .delete()
                    .eq('post_id', id)
                    .eq('user_id', user.id);
                if (error) throw error;
                setPost(prev => ({ ...prev, is_saved: false }));
            } else {
                const { error } = await supabase
                    .from('saved_posts')
                    .insert({ post_id: id, user_id: user.id });
                if (error) throw error;
                setPost(prev => ({ ...prev, is_saved: true }));
            }
        } catch (err) {
            console.error('[PostThreadPage] Error toggling save:', err);
        }
    };

    const handleLikeComment = async (commentId, currentUpvotes) => {
        if (!user || id.startsWith('fallback-')) return;

        console.log('[PostThreadPage] handleLikeComment triggered for:', commentId);

        try {
            // Check if already voted on this comment
            const { data: existingVote, error: checkError } = await supabase
                .from('votes')
                .select('*')
                .eq('comment_id', commentId)
                .eq('user_id', user.id)
                .single();

            if (checkError && checkError.code !== 'PGRST116') throw checkError;

            if (existingVote) {
                // Remove vote
                await supabase.from('votes').delete().eq('id', existingVote.id);
                const newUpvotes = Math.max(0, currentUpvotes - 1);
                await supabase.from('comments').update({ upvotes: newUpvotes }).eq('id', commentId);
                setComments(prev => prev.map(c => c.id === commentId ? { ...c, upvotes: newUpvotes } : c));
            } else {
                // Add vote
                await supabase.from('votes').insert({ comment_id: commentId, user_id: user.id, vote_type: 'up' });
                const newUpvotes = currentUpvotes + 1;
                await supabase.from('comments').update({ upvotes: newUpvotes }).eq('id', commentId);
                setComments(prev => prev.map(c => c.id === commentId ? { ...c, upvotes: newUpvotes } : c));
            }
        } catch (err) {
            console.error('[PostThreadPage] Error liking comment:', err);
        }
    };

    const ensureProfileExists = async () => {
        if (!user) return null;
        console.log('[PostThreadPage] Ensuring profile exists for:', user.id);
        try {
            const { data: existingProfile, error: fetchError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (existingProfile) return existingProfile;

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
                console.error('[PostThreadPage] Error checking profile:', fetchError);
            }

            console.log('[PostThreadPage] Profile not found, creating lazy profile...');
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
                console.error('[PostThreadPage] Lazy profile creation failed:', createError);
                throw createError;
            }

            console.log('[PostThreadPage] Lazy profile created successfully');
            return newProfile;
        } catch (err) {
            console.error('[PostThreadPage] Profile check/create error:', err);
            return null;
        }
    };

    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = async () => {
        if (!newComment.trim() || id.startsWith('fallback-')) {
            if (id.startsWith('fallback-')) alert('Commenting is disabled in Demo Mode.');
            return;
        }

        try {
            // Ensure profile exists (Lazy Creation)
            const profile = await ensureProfileExists();

            if (!profile) {
                console.error('[PostThreadPage] Could not find or create profile after checks');
                alert('Profile not found and could not be created automatically. Please try completing onboarding again or check your connection.');
                return;
            }

            const { error } = await supabase.from('comments').insert({
                post_id: id,
                body_original: newComment,
                author_id: profile.id,
                locale: 'en' // Default to English for now or detect from i18n
            });

            if (error) throw error;
            setNewComment('');
            fetchPostData();
        } catch (err) {
            console.error('[PostThreadPage] Error posting comment:', err);
            alert(`Failed to post comment: ${err.message}`);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
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
        <div className="bg-[#f6f6f8] dark:bg-[#0A0A0F] font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen selection:bg-[#2513ec]/30 selection:text-white">
            <div className="flex min-h-screen w-full flex-row">
                {/* Left Sidebar */}
                <div className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 border-r border-slate-200 dark:border-white/5 bg-[#f6f6f8] dark:bg-[#0A0A0F] z-20">
                    <div className="flex h-full flex-col justify-between p-6">
                        <div className="flex flex-col gap-8">
                            <Link to="/feed" className="flex items-center gap-3 px-2">
                                <div className="bg-[#2513ec] aspect-square rounded-xl size-10 flex items-center justify-center text-white">
                                    <Monitor size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">EchoBoard</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">{t('globalConversations', 'Global conversations')}</p>
                                </div>
                            </Link>

                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${item.active ? 'bg-slate-200 dark:bg-[#1A1A24] border border-transparent dark:border-white/10' : 'hover:bg-slate-200 dark:hover:bg-white/5 group'}`}
                                    >
                                        <item.icon className={`${item.active ? 'text-[#2513ec]' : 'text-slate-500 dark:text-slate-400 group-hover:text-[#2513ec]'}`} size={24} />
                                        <span className={`${item.active ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#2513ec]'}`}>{item.label}</span>
                                        {item.badge && <span className="ml-auto bg-[#2513ec] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            <img alt="User" className="size-10 rounded-full border border-slate-200 dark:border-white/10" src={user?.imageUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">{user?.fullName || 'Felix K.'}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">@{user?.username || 'user'}</span>
                            </div>
                            <MoreHorizontal className="ml-auto text-slate-400" size={20} />
                        </Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 lg:pl-72 justify-center">
                    <main className="w-full max-w-[680px] py-6 px-4 flex flex-col gap-6">
                        <Link to="/feed" className="lg:hidden flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                            <ArrowLeft size={20} />
                            <span className="font-medium">{t('backToFeed', 'Back to Feed')}</span>
                        </Link>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2513ec]"></div>
                                <p className="text-sm font-medium text-slate-500">{t('loadingPosts')}</p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
                                <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                                    <X size={32} />
                                </div>
                                <p className="text-lg font-bold text-red-500">{error}</p>
                                <Link to="/feed" className="text-[#2513ec] font-bold hover:underline">{t('backToFeed')}</Link>
                            </div>
                        ) : !post ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
                                <p className="text-lg font-bold text-slate-500">Post not found</p>
                                <Link to="/feed" className="text-[#2513ec] font-bold hover:underline">{t('backToFeed')}</Link>
                            </div>
                        ) : (
                            <>
                                <article className="relative flex flex-col bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                                    <div className="h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000')" }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24]/90 via-transparent to-transparent rounded-t-xl"></div>
                                        <div className="absolute top-4 right-4 flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 z-10">
                                            <button className="px-4 py-1.5 rounded-full bg-[#2513ec] text-white text-xs font-bold shadow-lg transition-transform hover:scale-105">
                                                {post.locale?.toUpperCase() || 'EN'} {post.locale === 'pt' ? '🇧🇷' : post.locale === 'ja' ? '🇯🇵' : '🇺🇸'}
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 pt-12 z-10">
                                            <div className="flex items-center gap-3 mb-3 text-white/80 text-sm">
                                                <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm border border-white/10">{post.community?.name || 'General'}</span>
                                                <span>•</span>
                                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <h1 className="text-3xl font-bold text-white leading-tight mb-2 drop-shadow-sm">
                                                {showLoadingState && !hasTranslated ? <span className="animate-pulse bg-white/20 h-8 w-3/4 block rounded"></span> : displayTitle}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col gap-6">
                                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6">
                                            <div className="flex items-center gap-3">
                                                <img alt={post.author?.username} className="size-10 rounded-full border border-slate-200 dark:border-white/10" src={post.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${post.author?.username}&backgroundColor=e5e7eb`} />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white hover:underline cursor-pointer">{post.author?.username || 'Anonymous'}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('postedIn')} <span className="text-[#2513ec] hover:underline cursor-pointer">{post.community?.name || 'General'}</span></p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 text-[#2513ec] hover:text-[#2513ec]/80 font-medium text-sm transition-colors">
                                                <Plus size={20} />
                                                {t('follow', 'Follow')}
                                            </button>
                                        </div>

                                        <div className={`prose prose-slate dark:prose-invert max-w-none ${showLoadingState && !hasTranslated ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
                                            {showLoadingState && !hasTranslated ? (
                                                <div className="space-y-4">
                                                    <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-full block rounded"></span>
                                                    <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-11/12 block rounded"></span>
                                                    <span className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-4/5 block rounded"></span>
                                                </div>
                                            ) : (
                                                <p className="text-lg leading-[1.8] text-slate-600 dark:text-slate-300 font-normal">
                                                    {displayBody}
                                                </p>
                                            )}
                                        </div>

                                        {(needsTranslationToggle || post.title_translated) && (
                                            <div className="flex justify-center py-2 relative">
                                                <button
                                                    onClick={() => setShowOriginal(!showOriginal)}
                                                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${showOriginal ? 'bg-[#2513ec] border-[#2513ec] text-white shadow-xl shadow-[#2513ec]/20' : 'border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                                                >
                                                    <Globe className={`text-[20px] transition-colors ${showOriginal ? 'text-white' : 'text-slate-400 group-hover:text-[#2513ec]'}`} />
                                                    <span className={`text-sm font-bold transition-colors ${showOriginal ? 'text-white' : 'group-hover:text-[#2513ec]'}`}>{showOriginal ? 'See Translation' : t('revealOriginal')}</span>
                                                </button>
                                            </div>
                                        )}

                                        {/* Cultural Context */}
                                        {(post.context_title || post.id === 'fallback-1') && (
                                            <div className="relative overflow-hidden rounded-lg bg-slate-50 dark:bg-[#121118] border border-[#D4AF37]/40 p-5 mt-2">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
                                                <div className="flex flex-col gap-2 relative z-10 pl-2">
                                                    <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                                                        <Lightbulb size={20} />
                                                        <span className="text-xs font-bold tracking-widest uppercase">{post.context_title || t('post1_context_title')}</span>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                        {post.context_body || t('post1_context_body')}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 dark:bg-[#12101a] border-t border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={handleLikePost}
                                                className="flex items-center gap-2 group"
                                            >
                                                <Heart className={`${(post.upvotes || 0) > 1200 ? 'fill-[#2513ec] text-[#2513ec]' : 'text-slate-400'} group-hover:text-[#2513ec] transition-colors`} size={20} />
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#2513ec]">{post.upvotes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 group">
                                                <MessageCircle className="text-slate-400 group-hover:text-blue-400 transition-colors" size={20} />
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-400">{post.comment_count}</span>
                                            </button>
                                            <button
                                                onClick={handleShare}
                                                className="flex items-center gap-2 group"
                                            >
                                                <Share className="text-slate-400 group-hover:text-green-400 transition-colors" size={20} />
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-400">{t('share')}</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleToggleSavePost}
                                            className={`transition-colors ${post.is_saved ? 'text-[#2513ec]' : 'text-slate-400 hover:text-[#2513ec]'}`}
                                        >
                                            <Bookmark size={20} className={post.is_saved ? 'fill-current' : ''} />
                                        </button>
                                    </div>
                                </article>

                                {/* Comment Composer */}
                                <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                                    <div className="flex gap-4">
                                        <img alt="User" className="size-10 rounded-full border border-slate-200 dark:border-white/10 object-cover" src={user?.imageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.id}&backgroundColor=e5e7eb`} />
                                        <div className="flex-1 flex flex-col gap-3">
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-white/10 rounded-lg p-4 min-h-[100px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#2513ec] focus:border-transparent resize-y text-sm leading-relaxed"
                                                placeholder={t('sharePerspective', 'Share your perspective...')}
                                            ></textarea>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"><Bold size={20} /></button>
                                                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"><Italic size={20} /></button>
                                                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"><LinkIcon size={20} /></button>
                                                </div>
                                                <button
                                                    onClick={handleCommentSubmit}
                                                    className="bg-[#2513ec] hover:bg-[#2513ec]/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-[#2513ec]/25"
                                                >
                                                    {t('postComment', 'Post Comment')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments List */}
                                <div className="flex flex-col gap-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                                            <div className="flex gap-4">
                                                <img alt={comment.author?.username} className="size-8 rounded-full border border-slate-200 dark:border-white/10" src={comment.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${comment.author?.username}&backgroundColor=e5e7eb`} />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-bold text-sm">{comment.author?.username || 'Anonymous'}</span>
                                                        <span className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                        {comment.body_original}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <button
                                                            onClick={() => handleLikeComment(comment.id, comment.upvotes)}
                                                            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#2513ec] transition-colors"
                                                        >
                                                            <Heart size={14} className={(comment.upvotes || 0) > 0 ? 'fill-[#2513ec] text-[#2513ec]' : ''} />
                                                            {comment.upvotes}
                                                        </button>
                                                        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </main>

                    <aside className="hidden xl:flex w-80 flex-col py-6 pr-6 gap-6 sticky top-0 h-screen overflow-y-auto">
                        <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                            <h3 className="text-slate-900 dark:text-white font-bold text-base mb-4">{t('relatedCommunities', 'Related Communities')}</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                            <Coffee size={24} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Coffee Lovers</span>
                                            <span className="text-xs text-slate-500">240k members</span>
                                        </div>
                                    </div>
                                    <button className="bg-slate-100 dark:bg-white/5 hover:bg-[#2513ec] hover:text-white text-slate-900 dark:text-white p-2 rounded-full transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PostThreadPage;
