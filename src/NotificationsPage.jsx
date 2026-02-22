import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, Settings,
    Monitor, ArrowUp, MessageSquare, UserPlus, Heart, Check, CheckCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/clerk-react';
import { supabase } from './lib/supabase';

const NotificationsPage = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const location = useLocation();

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    useEffect(() => {
        if (!user) return;
        fetchNotifications();
    }, [user]);

    const fetchNotifications = async () => {
        if (!user) return;
        setIsLoading(true);

        try {
            const allNotifications = [];

            // 1. Fetch upvotes on user's posts (other people voting on MY posts)
            const { data: myPosts } = await supabase
                .from('posts')
                .select('id, title_original')
                .eq('author_id', user.id);

            if (myPosts && myPosts.length > 0) {
                const postIds = myPosts.map(p => p.id);
                const postTitleMap = {};
                myPosts.forEach(p => { postTitleMap[p.id] = p.title_original; });

                // Get votes on my posts (not my own votes)
                const { data: votes } = await supabase
                    .from('votes')
                    .select('id, post_id, user_id, created_at')
                    .in('post_id', postIds)
                    .neq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (votes) {
                    // Fetch voter profiles
                    const voterIds = [...new Set(votes.map(v => v.user_id))];
                    const { data: voterProfiles } = await supabase
                        .from('profiles')
                        .select('id, username, avatar_url')
                        .in('id', voterIds);

                    const profileMap = {};
                    if (voterProfiles) voterProfiles.forEach(p => { profileMap[p.id] = p; });

                    votes.forEach(v => {
                        const voter = profileMap[v.user_id];
                        allNotifications.push({
                            id: `vote-${v.id}`,
                            type: 'upvote',
                            message: `${voter?.username || 'Someone'} upvoted your post`,
                            postTitle: postTitleMap[v.post_id]?.substring(0, 50),
                            postId: v.post_id,
                            avatar: voter?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${voter?.username || 'user'}`,
                            username: voter?.username || 'Anonymous',
                            created_at: v.created_at,
                            icon: ArrowUp,
                            iconColor: 'text-[#6C63FF]',
                            iconBg: 'bg-[#6C63FF]/10',
                        });
                    });
                }

                // 2. Fetch comments on user's posts
                const { data: comments } = await supabase
                    .from('comments')
                    .select('id, post_id, author_id, body_original, created_at')
                    .in('post_id', postIds)
                    .neq('author_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (comments) {
                    const commenterIds = [...new Set(comments.map(c => c.author_id))];
                    const { data: commenterProfiles } = await supabase
                        .from('profiles')
                        .select('id, username, avatar_url')
                        .in('id', commenterIds);

                    const cProfileMap = {};
                    if (commenterProfiles) commenterProfiles.forEach(p => { cProfileMap[p.id] = p; });

                    comments.forEach(c => {
                        const commenter = cProfileMap[c.author_id];
                        allNotifications.push({
                            id: `comment-${c.id}`,
                            type: 'comment',
                            message: `${commenter?.username || 'Someone'} commented on your post`,
                            postTitle: postTitleMap[c.post_id]?.substring(0, 50),
                            postId: c.post_id,
                            preview: c.body_original?.substring(0, 80),
                            avatar: commenter?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${commenter?.username || 'user'}`,
                            username: commenter?.username || 'Anonymous',
                            created_at: c.created_at,
                            icon: MessageSquare,
                            iconColor: 'text-emerald-500',
                            iconBg: 'bg-emerald-500/10',
                        });
                    });
                }
            }

            // 3. Fetch new posts from communities user has joined
            const { data: memberships } = await supabase
                .from('community_members')
                .select('community_id')
                .eq('user_id', user.id);

            if (memberships && memberships.length > 0) {
                const communityIds = memberships.map(m => m.community_id);

                const { data: communityPosts } = await supabase
                    .from('posts')
                    .select(`id, title_original, created_at, author_id,
                        author:profiles!posts_author_id_fkey(username, avatar_url),
                        community:communities!posts_community_id_fkey(name)`)
                    .in('community_id', communityIds)
                    .neq('author_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(15);

                if (communityPosts) {
                    communityPosts.forEach(p => {
                        allNotifications.push({
                            id: `community-post-${p.id}`,
                            type: 'community',
                            message: `New post in ${p.community?.name || 'your community'}`,
                            postTitle: p.title_original?.substring(0, 50),
                            postId: p.id,
                            avatar: p.author?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${p.author?.username || 'user'}`,
                            username: p.author?.username || 'Anonymous',
                            created_at: p.created_at,
                            icon: Users,
                            iconColor: 'text-orange-500',
                            iconBg: 'bg-orange-500/10',
                        });
                    });
                }
            }

            // Sort all by date
            allNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // Mark read state from localStorage
            const readIds = JSON.parse(localStorage.getItem(`echoboard_read_notifs_${user.id}`) || '[]');
            const readSet = new Set(readIds);
            allNotifications.forEach(n => { n.isRead = readSet.has(n.id); });

            setNotifications(allNotifications);
        } catch (err) {
            console.error('[NotificationsPage] Error fetching notifications:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const markAllAsRead = () => {
        const ids = notifications.map(n => n.id);
        localStorage.setItem(`echoboard_read_notifs_${user.id}`, JSON.stringify(ids));
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const markAsRead = (notifId) => {
        const readIds = JSON.parse(localStorage.getItem(`echoboard_read_notifs_${user.id}`) || '[]');
        if (!readIds.includes(notifId)) {
            readIds.push(notifId);
            localStorage.setItem(`echoboard_read_notifs_${user.id}`, JSON.stringify(readIds));
        }
        setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h`;
        const days = Math.floor(hrs / 24);
        return `${days}d`;
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const filteredNotifications = filter === 'all'
        ? notifications
        : filter === 'unread'
            ? notifications.filter(n => !n.isRead)
            : notifications.filter(n => n.type === filter);

    const navItems = [
        { icon: Home, label: t('navHome', 'Home'), path: '/feed' },
        { icon: TrendingUp, label: t('navTrending', 'Trending'), path: '/trending' },
        { icon: Users, label: t('navCommunities', 'Communities'), path: '/communities' },
        { icon: Bell, label: t('navNotifications', 'Notifications'), path: '/notifications', badge: unreadCount > 0 ? unreadCount : null },
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
                    {/* Header */}
                    <header className={`sticky top-0 z-30 flex h-[72px] items-center justify-between border-b px-6 backdrop-blur-md ${isDarkMode ? 'border-[#2A2A3A] bg-[#0A0A0F]/80' : 'border-slate-200 bg-[#F5F5F0]/80'}`}>
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-[#6C63FF] to-indigo-500 p-2.5 rounded-xl text-white shadow-lg shadow-[#6C63FF]/20 relative">
                                <Bell size={24} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{t('navNotifications', 'Notifications')}</h1>
                                <p className={`text-xs ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#6C63FF] hover:bg-[#6C63FF]/10 transition-all">
                                    <CheckCheck size={16} /> Mark all read
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Filter Tabs */}
                    <div className={`px-6 py-3 border-b flex gap-2 ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-200'}`}>
                        {[
                            { key: 'all', label: 'All' },
                            { key: 'unread', label: `Unread (${unreadCount})` },
                            { key: 'upvote', label: 'Upvotes' },
                            { key: 'comment', label: 'Comments' },
                            { key: 'community', label: 'Communities' },
                        ].map(f => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${filter === f.key
                                    ? 'bg-[#6C63FF] text-white shadow-md'
                                    : `${isDarkMode ? 'text-[#8888AA] hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`
                                    }`}>
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <main className="max-w-[680px] w-full mx-auto py-4 px-4 flex flex-col">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
                                <p className={`text-sm ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>Loading notifications...</p>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                                <div className={`p-6 rounded-full ${isDarkMode ? 'bg-[#1A1A24]' : 'bg-slate-100'}`}>
                                    <Bell size={48} className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`} />
                                </div>
                                <h2 className="text-xl font-bold">
                                    {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                                </h2>
                                <p className={`${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                    {filter === 'all' ? 'When someone upvotes or comments on your posts, you\'ll see it here.' : 'Nothing to show for this filter.'}
                                </p>
                            </div>
                        ) : (
                            filteredNotifications.map((notif) => (
                                <Link
                                    key={notif.id}
                                    to={`/post/${notif.postId}`}
                                    onClick={() => markAsRead(notif.id)}
                                    className={`flex items-start gap-4 p-4 rounded-xl transition-all border-b last:border-b-0 group ${!notif.isRead
                                            ? isDarkMode ? 'bg-[#6C63FF]/5 hover:bg-[#6C63FF]/10' : 'bg-[#6C63FF]/5 hover:bg-[#6C63FF]/10'
                                            : isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                        } ${isDarkMode ? 'border-[#2A2A3A]' : 'border-slate-100'}`}
                                >
                                    {/* Avatar + Icon Badge */}
                                    <div className="relative flex-shrink-0">
                                        <img src={notif.avatar} alt={notif.username} className="size-11 rounded-full object-cover" />
                                        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${notif.iconBg} border-2 ${isDarkMode ? 'border-[#0A0A0F]' : 'border-[#F5F5F0]'}`}>
                                            <notif.icon size={12} className={notif.iconColor} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm">
                                                <span className="font-bold">{notif.username}</span>
                                                <span className={`ml-1 ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                    {notif.type === 'upvote' && 'upvoted your post'}
                                                    {notif.type === 'comment' && 'commented on your post'}
                                                    {notif.type === 'community' && `posted in ${notif.message.replace('New post in ', '')}`}
                                                </span>
                                            </p>
                                            {!notif.isRead && (
                                                <div className="size-2 rounded-full bg-[#6C63FF] flex-shrink-0"></div>
                                            )}
                                        </div>

                                        {notif.postTitle && (
                                            <p className={`text-sm font-semibold mt-1 truncate group-hover:text-[#6C63FF] transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                "{notif.postTitle}"
                                            </p>
                                        )}

                                        {notif.preview && (
                                            <p className={`text-xs mt-1 truncate ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-500'}`}>
                                                "{notif.preview}"
                                            </p>
                                        )}

                                        <span className={`text-xs mt-1 block ${isDarkMode ? 'text-[#8888AA]' : 'text-slate-400'}`}>
                                            {timeAgo(notif.created_at)}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
