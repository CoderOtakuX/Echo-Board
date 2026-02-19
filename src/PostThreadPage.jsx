import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Home, TrendingUp, Users, Bookmark, Bell, MoreHorizontal,
    ArrowLeft, Share, MessageCircle, Heart, Lightbulb,
    Bold, Italic, Link as LinkIcon, Coffee, Monitor, Plus
} from 'lucide-react';

const PostThreadPage = () => {
    // State to simulate "Reveal Original" toggle
    const [showOriginal, setShowOriginal] = useState(false);

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#0A0A0F] font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen selection:bg-[#2513ec]/30 selection:text-white">
            <div className="flex min-h-screen w-full flex-row">
                {/* Left Sidebar (Fixed width) */}
                <div className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 border-r border-slate-200 dark:border-white/5 bg-[#f6f6f8] dark:bg-[#0A0A0F] z-20">
                    <div className="flex h-full flex-col justify-between p-6">
                        <div className="flex flex-col gap-8">
                            {/* Brand */}
                            <Link to="/feed" className="flex items-center gap-3 px-2">
                                <div className="bg-[#2513ec] aspect-square rounded-xl size-10 flex items-center justify-center text-white">
                                    <Monitor size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">EchoBoard</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Global conversations</p>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="flex flex-col gap-2">
                                <Link to="/feed" className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors group">
                                    <Home className="text-slate-500 dark:text-slate-400 group-hover:text-[#2513ec] transition-colors" size={24} />
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#2513ec] transition-colors">Home</span>
                                </Link>
                                <a className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors group" href="#">
                                    <TrendingUp className="text-slate-500 dark:text-slate-400 group-hover:text-[#2513ec] transition-colors" size={24} />
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#2513ec] transition-colors">Trending</span>
                                </a>
                                <a className="flex items-center gap-4 px-4 py-3 rounded-full bg-slate-200 dark:bg-[#1A1A24] border border-transparent dark:border-white/10 transition-colors" href="#">
                                    <Users className="text-[#2513ec]" size={24} />
                                    <span className="text-slate-900 dark:text-white font-semibold">Communities</span>
                                </a>
                                <a className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors group" href="#">
                                    <Bell className="text-slate-500 dark:text-slate-400 group-hover:text-[#2513ec] transition-colors" size={24} />
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#2513ec] transition-colors">Notifications</span>
                                    <span className="ml-auto bg-[#2513ec] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                                </a>
                                <a className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors group" href="#">
                                    <Bookmark className="text-slate-500 dark:text-slate-400 group-hover:text-[#2513ec] transition-colors" size={24} />
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#2513ec] transition-colors">Saved</span>
                                </a>
                            </nav>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            <img alt="User profile" className="size-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs2f0-h93LkenqAyWP9TBnwMqC_-YQX9bphMPKxXIzzKbZ4y1tE1BnTFipNWiBgDlCcAZ9priag1PLmMjfO_tH5xxBDd5Dy7RQWoxshouEZ4Ot6jUYjVG3x5RdHkahXFiIloG17a_hEofNhmxAonJFaQdPfRTNsszo3dZWqkJQ1xHJ5JnMY_ucOMHtV7IqZBUYqCGiakowZxE4mZncrO-3nDbvQ3RA_XXIrcOGFdwGvhIhXd_LukH7kPxLoFGloeae7-EcZQ-fyjbF" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">Alex Morgan</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">@alex_writer</span>
                            </div>
                            <MoreHorizontal className="ml-auto text-slate-400" size={20} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area (Center + Right) */}
                <div className="flex flex-1 lg:pl-72 justify-center">
                    {/* Center Column: Post & Comments */}
                    <main className="w-full max-w-[680px] py-6 px-4 flex flex-col gap-6">
                        {/* Back Button Mobile Only */}
                        <Link to="/feed" className="lg:hidden flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to Feed</span>
                        </Link>

                        {/* Main Post Card */}
                        <article className="relative flex flex-col bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                            {/* Post Header Image */}
                            <div className="h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdSvGBpopzO_kzDW0wg2OwqVeGV_X9yKPBXbHZa3_V1g71FdDTdHshfmLmWGWElI5dANcx-h6J9RUVVKvyGERFVORrsM73YAwbw_sRS4t4uVGoKM2vVePZ_-ynC1zW7quq_kevSaHYGO6OOxCZ5ibogIznZQnPPqhYf2R9IRtAmI46Sfb2E3wtBa8aVDiAqtSLWspiGbRYa-KaKIZdJ_dO30SvcCkXErYweVK3oSDGU4i_pmz93SSaQ33hbUsDE4jJea1ei5_zHmEq')" }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24]/90 via-transparent to-transparent"></div>
                                {/* Floating Language Toggle */}
                                <div className="absolute top-4 right-4 flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                                    <button className="px-4 py-1.5 rounded-full bg-[#2513ec] text-white text-xs font-bold shadow-lg transition-transform hover:scale-105">
                                        EN 🇺🇸
                                    </button>
                                    <button className="px-4 py-1.5 rounded-full text-white/70 hover:text-white text-xs font-medium transition-colors">
                                        PT 🇧🇷
                                    </button>
                                </div>
                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 pt-12">
                                    <div className="flex items-center gap-3 mb-3 text-white/80 text-sm">
                                        <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm border border-white/10">Culture</span>
                                        <span>•</span>
                                        <span>5 min read</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-white leading-tight mb-2 drop-shadow-sm">
                                        Why remote work in São Paulo is changing coffee culture
                                    </h1>
                                </div>
                            </div>

                            {/* Post Meta & Body */}
                            <div className="p-6 md:p-8 flex flex-col gap-6">
                                {/* Author Line */}
                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6">
                                    <div className="flex items-center gap-3">
                                        <img alt="Alex writer profile" className="size-10 rounded-full border border-slate-200 dark:border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXYhKu7jiRx-l-YRcYC8tL-g7RwgLntTk-XtRCrEHA-QE5P7gs3nmCybSOp2Nuh2o-tzfb77qiKvoy9tUEV-2NBcea7XXiwR6jPGKm0lKKAso0RFfQDGDjDDiRl5rwyqyIIrv0NfT-9gNJO9c9bjyYKkYvFK1dlTQvQsamQGWJfgtlfyRNYx77mxLUXsUpcOgTuNZ6-RQb55TUsupMEiZnCyX78iv909oiJzZ8EkxR7AxRseTn1XwU3W8eyJbg8dUZADiZskP-i3r0" />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white hover:underline cursor-pointer">Alex Morgan</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Posted 2h ago in <span className="text-[#2513ec] hover:underline cursor-pointer">@BrazilTech</span></p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-[#2513ec] hover:text-[#2513ec]/80 font-medium text-sm transition-colors">
                                        <Plus size={20} />
                                        Follow
                                    </button>
                                </div>

                                {/* Article Text */}
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg leading-[1.8] text-slate-600 dark:text-slate-300 font-normal">
                                        The traditional <em className="text-slate-900 dark:text-white font-medium">'cafezinho'</em> is being reimagined as digital nomads flood the city's historic center. What used to be a quick stand-up espresso is evolving into hour-long laptop sessions, challenging local etiquette and sparking a new wave of hybrid spaces.
                                    </p>
                                    <p className="text-lg leading-[1.8] text-slate-600 dark:text-slate-300 font-normal mt-4">
                                        Shop owners in Vila Madalena are adapting fast. "We used to have no outlets," explains Marco, a third-generation barista. "Now, they are more important than the beans." This shift represents more than just infrastructure; it's a fundamental change in how Paulistanos interact with their public spaces.
                                    </p>
                                </div>

                                {/* Reveal Original Button */}
                                <div className="flex justify-center py-2">
                                    <button
                                        onClick={() => setShowOriginal(!showOriginal)}
                                        className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${showOriginal ? 'bg-[#2513ec] border-[#2513ec] text-white' : 'border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                                    >
                                        <Monitor className={`text-[20px] transition-colors ${showOriginal ? 'text-white' : 'text-slate-400 group-hover:text-[#2513ec]'}`} />
                                        <span className={`text-sm font-bold transition-colors ${showOriginal ? 'text-white' : 'group-hover:text-[#2513ec]'}`}>Reveal Original Language (Portuguese)</span>
                                    </button>
                                </div>

                                {showOriginal && (
                                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm text-slate-700 dark:text-slate-300 mt-2">
                                        <p>O tradicional 'cafezinho' está sendo reinventado à medida que nômades digitais inundam o centro histórico da cidade...</p>
                                    </div>
                                )}


                                {/* Cultural Context Panel */}
                                <div className="relative overflow-hidden rounded-lg bg-slate-50 dark:bg-[#121118] border border-[#D4AF37]/40 p-5 mt-2">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
                                    <div className="flex flex-col gap-2 relative z-10 pl-2">
                                        <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                                            <Lightbulb size={20} />
                                            <span className="text-xs font-bold tracking-widest uppercase">Cultural Context</span>
                                        </div>
                                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">The Cafezinho Ritual</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            The 'cafezinho' is a ritual of hospitality in Brazil, typically a small, strong coffee offered for free in offices and shops to welcome guests. It is traditionally consumed quickly while standing, emphasizing social lubrication over consumption.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="bg-slate-50 dark:bg-[#12101a] border-t border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-2 group">
                                        <Heart className="text-slate-400 group-hover:text-[#2513ec] transition-colors" size={20} />
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#2513ec]">1.2k</span>
                                    </button>
                                    <button className="flex items-center gap-2 group">
                                        <MessageCircle className="text-slate-400 group-hover:text-blue-400 transition-colors" size={20} />
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-400">45</span>
                                    </button>
                                    <button className="flex items-center gap-2 group">
                                        <Share className="text-slate-400 group-hover:text-green-400 transition-colors" size={20} />
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-400">Share</span>
                                    </button>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors">
                                    <Bookmark size={20} />
                                </button>
                            </div>
                        </article>

                        {/* Comment Section Composer */}
                        <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                            <div className="flex gap-4">
                                <img alt="Your avatar" className="size-10 rounded-full border border-slate-200 dark:border-white/10 shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkTJAaxfPZTf9b-2Djl3Z13CrmE3xdOcLqPx2N8igo75Z7r3S5bTzoA3YJMVEfrlycRKw5-7rJChAi3MNeX9cRIxpxQsR3UkRLjE2p32DNV7rcG_hguaG2eO_ya6XfvrHtK8WPX_aATCAxiV_lal5CK57l1PI0VGzMdAlSNHFwO-ZNrGdfxrPkExiMvFNHbZN6W6vzZN0ZXaWz1uOLlaFCI_cQ4ArpMCyX-Pw8_SvvXmOYGnq-eBMP1Z6vEXQExdbbH0-bRH6u8QHw" />
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="relative">
                                        <textarea className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-white/10 rounded-lg p-4 min-h-[100px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#2513ec] focus:border-transparent resize-y text-sm leading-relaxed" placeholder="Share your perspective..."></textarea>
                                        <div className="absolute bottom-3 right-3">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Writing in English
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
                                                <Bold size={20} />
                                            </button>
                                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
                                                <Italic size={20} />
                                            </button>
                                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
                                                <LinkIcon size={20} />
                                            </button>
                                        </div>
                                        <button className="bg-[#2513ec] hover:bg-[#2513ec]/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-[#2513ec]/25">
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Discussion Thread */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">45 Comments</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
                                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white hover:text-[#2513ec] transition-colors">
                                        Top Rated
                                    </button>
                                </div>
                            </div>

                            {/* Comment 1 */}
                            <div className="flex flex-col gap-3">
                                <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <img alt="Kenji profile" className="size-10 rounded-full border border-slate-200 dark:border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGvGiETCr7meP9ByepFDocj7IjNtz-QG7ScKJPSHI4CZPbnGD2dX3iX0Bnj-3F4o3g--ic0KPzQ687QsMRXG4PnKxigUdBO_ycQ2rRJS57VGFgiWFhZBWNRgQ63_ppKnHhIqRamXVoTohXaz3AlN_P_W6OxAM8qyYFwFZa6u0QkEp5LRYar1Zl0-RDTU3ulpfObGu73gjDwoeV-K3QSJ36VKCBSKvkCc54O-ItcJM_CBag3qMrpmFjvauDuwoMqVc2SR4L4-jc5jxs" />
                                            <div className="h-full w-px bg-slate-200 dark:bg-white/10 my-2"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Kenji M.</span>
                                                    <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/5">🇯🇵 JP</span>
                                                    <span className="text-xs text-slate-400">• 1h ago</span>
                                                </div>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                                In Tokyo, we see a similar trend with 'kissaten'. They used to be quiet places for contemplation, but remote work is turning them into co-working hubs. Interesting to see the parallels in Brazil.
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#0A0A0F] rounded-full px-2 py-1 border border-slate-200 dark:border-white/5">
                                                    <button className="p-1 hover:text-[#2513ec] text-slate-400 transition-colors">
                                                        <Heart size={18} />
                                                    </button>
                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">248</span>
                                                </div>
                                                <button className="text-xs font-bold text-slate-500 hover:text-[#2513ec] transition-colors">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Nested Reply */}
                                <div className="pl-12">
                                    <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-5 shadow-sm relative">
                                        <div className="absolute left-[-24px] top-8 w-6 h-[2px] bg-slate-200 dark:border-white/10"></div>
                                        <div className="absolute left-[-24px] top-[-30px] w-[2px] h-[60px] bg-slate-200 dark:border-white/10 rounded-bl-lg"></div>
                                        <div className="flex gap-4">
                                            <img alt="Thomas profile" className="size-10 rounded-full border border-slate-200 dark:border-white/10 shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVL5pEGmKW3Vu69sgFORp4fwAHgJwymk2CW-2lZWZPXDcvFpLkouFd4iD4zkJ6cQhqpdjA7pkad6ZnZukCQBvyJ0165TNY6SH5NW2ejBeTHCoFgWylCxbAATdMHUpJGfar6ekLa8bm_9FOqAk8BfPWDA1aZzqf7cip4fFuU6_ZGhgQcOXP2NoP-T_tWEgQI2BOMEFO8lU9d8VgOWspAdFHckQitF75PDRq-F3pAOjnEaLLy52rso0FTogEqTtfaNwZnYJ0VZCT7wtv" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-white">Thomas B.</span>
                                                        <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/5">🇩🇪 DE</span>
                                                        <span className="text-xs text-slate-400">• 45m ago</span>
                                                    </div>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                                    The noise level is the biggest issue here in Berlin. Are the cafes in SP implementing soundproofing?
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#0A0A0F] rounded-full px-2 py-1 border border-slate-200 dark:border-white/5">
                                                        <button className="p-1 hover:text-[#2513ec] text-slate-400 transition-colors">
                                                            <Heart size={18} />
                                                        </button>
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">42</span>
                                                    </div>
                                                    <button className="text-xs font-bold text-slate-500 hover:text-[#2513ec] transition-colors">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Right Column: Related (Desktop only) */}
                    <aside className="hidden xl:flex w-80 flex-col py-6 pr-6 gap-6 sticky top-0 h-screen overflow-y-auto">
                        {/* Related Communities Card */}
                        <div className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                            <h3 className="text-slate-900 dark:text-white font-bold text-base mb-4">Related Communities</h3>
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-indigo-900/30 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                                            <Monitor size={24} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Digital Nomads</span>
                                            <span className="text-xs text-slate-500">1.2m members</span>
                                        </div>
                                    </div>
                                    <button className="bg-slate-100 dark:bg-white/5 hover:bg-[#2513ec] hover:text-white text-slate-900 dark:text-white p-2 rounded-full transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 text-xs font-bold text-[#2513ec] hover:underline">See All</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PostThreadPage;
