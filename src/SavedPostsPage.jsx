import React from 'react';
import { Bookmark, MessageSquare, ArrowUp, ArrowLeft } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SavedPostsPage = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const [savedPosts, setSavedPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchSavedPosts = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('saved_posts')
                .select(`
                    id,
                    post:posts (
                        id,
                        title_original,
                        upvotes,
                        comment_count,
                        author:profiles!posts_author_id_fkey(username, avatar_url)
                    )
                `)
                .eq('user_id', user.id);

            if (error) throw error;
            setSavedPosts(data || []);
        } catch (err) {
            console.error('[SavedPostsPage] Error fetching saved posts:', err);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSavedPosts();
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/feed" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500">
                    <ArrowLeft size={24} />
                </Link>
                <div className="bg-[#6C63FF]/10 p-3 rounded-xl text-[#6C63FF]">
                    <Bookmark size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{t('navSaved', 'Saved Posts')}</h1>
                    <p className="text-slate-500">{savedPosts.length} saved conversations</p>
                </div>
            </div>

            {savedPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border-2 border-dashed border-black/5 rounded-3xl p-12">
                    <Bookmark size={48} className="text-slate-200 mb-4" />
                    <h2 className="text-xl font-bold mb-2">No saved posts yet</h2>
                    <p className="text-slate-500 mb-6">Explore the feed and bookmark global discussions to see them here.</p>
                    <Link to="/feed" className="bg-[#6C63FF] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-[#6C63FF]/20">
                        Go to Feed
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {savedPosts.map(({ post }) => (
                        <Link
                            key={post.id}
                            to={`/post/${post.id}`}
                            className="bg-white dark:bg-[#1A1A24] p-6 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-[#6C63FF]/50 transition-all shadow-sm group"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                                        <img src={post.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${post.author?.username || 'Unknown'}&backgroundColor=e5e7eb`} className="size-5 rounded-full" alt="" />
                                        <span className="font-bold">{post.author?.username || 'Anonymous'}</span>
                                    </div>
                                    <h2 className="text-lg font-bold group-hover:text-[#6C63FF] transition-colors mb-3">
                                        {post.title_original}
                                    </h2>
                                    <div className="flex items-center gap-6 text-slate-400">
                                        <div className="flex items-center gap-1.5 border-r pr-6 border-slate-200 dark:border-white/5">
                                            <ArrowUp size={16} />
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{post.upvotes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MessageSquare size={16} />
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{post.comment_count}</span>
                                        </div>
                                    </div>
                                </div>
                                <Bookmark size={20} className="text-[#6C63FF] fill-current" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedPostsPage;
