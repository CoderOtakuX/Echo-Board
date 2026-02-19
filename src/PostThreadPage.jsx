import React, { useState, useEffect } from 'react';
import {
    Search, Bell, User, Home, MessageSquare, TrendingUp, Bookmark,
    Plus, Heart, Repeat, Link as LinkIcon, Bold, Italic,
    Lightbulb, GraduationCap, ArrowLeft, MoreHorizontal, Share2, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PostThreadPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark as per user HTML example
    const navigate = useNavigate();

    // Toggle dark class on html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-primary selection:text-white ${isDarkMode ? 'bg-[#121212] text-slate-100' : 'bg-gray-50 text-slate-900'}`}>

            {/* Header */}
            <header className={`fixed top-0 w-full z-50 border-b-4 border-primary px-6 py-4 lg:px-10 transition-colors ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/feed" className="flex items-center gap-3 text-current hover:translate-x-1 transition-transform group">
                            <div className="size-10 text-primary bg-white border-2 border-white flex items-center justify-center shadow-[4px_4px_0px_0px_#4f46e5] group-hover:shadow-[6px_6px_0px_0px_#4f46e5] transition-all">
                                <ArrowLeft className="text-black" size={24} strokeWidth={3} />
                            </div>
                            <h2 className={`text-2xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>EchoBoard</h2>
                        </Link>

                        <div className={`hidden md:flex items-center h-12 px-4 w-72 border-2 border-primary shadow-neo-sm focus-within:shadow-neo transition-all ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                            <Search className="text-primary" size={24} strokeWidth={2.5} />
                            <input
                                className={`w-full bg-transparent border-none placeholder-slate-500 focus:ring-0 text-base font-bold ml-2 uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/feed" className={`text-base font-bold uppercase hover:text-primary hover:underline decoration-4 decoration-primary underline-offset-4 transition-all ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>Home</Link>
                        <a href="#" className="text-primary text-base font-bold uppercase border-b-4 border-primary">Discussions</a>
                        <a href="#" className={`text-base font-bold uppercase hover:text-white transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-400 hover:text-black'}`}>Trending</a>
                        <a href="#" className={`text-base font-bold uppercase hover:text-white transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-400 hover:text-black'}`}>Bookmarks</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex bg-primary hover:bg-primary-light active:translate-y-1 active:shadow-none transition-all text-white border-2 border-white h-10 px-6 shadow-[4px_4px_0px_0px_#ffffff] text-sm font-black uppercase tracking-wider items-center gap-2">
                            <Plus size={18} strokeWidth={4} /> New Post
                        </button>
                        <button className={`flex items-center justify-center size-10 border-2 border-slate-700 hover:border-primary hover:text-primary transition-colors shadow-none hover:shadow-neo-sm ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
                            <Bell size={24} strokeWidth={2.5} />
                        </button>
                        <button className={`flex items-center justify-center size-10 border-2 border-slate-700 hover:border-primary hover:text-primary transition-colors shadow-none hover:shadow-neo-sm ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
                            <User size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 md:px-8 py-10 pt-32">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-3 mb-8 text-sm font-mono font-bold uppercase tracking-tight">
                    <a className={`px-2 py-1 border border-slate-700 hover:border-current transition-colors ${isDarkMode ? 'bg-[#1e1e1e] text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-black hover:border-black'}`} href="#">Discussions</a>
                    <span className="text-primary">/</span>
                    <a className={`px-2 py-1 border border-slate-700 hover:border-current transition-colors ${isDarkMode ? 'bg-[#1e1e1e] text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-black hover:border-black'}`} href="#">Technology</a>
                    <span className="text-primary">/</span>
                    <span className="bg-primary text-white px-2 py-1 border border-primary">Cross-Cultural</span>
                </div>

                {/* Title Section */}
                <div className="mb-8">
                    <h1 className={`text-4xl md:text-5xl font-black leading-none mb-6 tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>The nuance of 'Kuidaore' in Osaka culture</h1>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className={`flex items-center gap-4 p-2 pr-6 border-2 border-slate-700 shadow-[4px_4px_0px_0px_#334155] ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white shadow-[4px_4px_0px_0px_#cbd5e1]'}`}>
                            <div className="size-12 bg-slate-700 bg-cover bg-center border-2 border-white" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/notionists/svg?seed=Kenji&backgroundColor=e5e7eb')` }}></div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Kenji Sato</span>
                                    <span className="bg-primary text-white text-xs px-2 py-0.5 border border-white font-mono font-bold">JP</span>
                                </div>
                                <span className="text-slate-400 text-xs font-mono uppercase">@kenji_sato • 2 hours ago</span>
                            </div>
                        </div>

                        <label className={`flex items-center gap-4 cursor-pointer group p-2 border-2 border-primary shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                            <span className={`text-sm font-bold uppercase tracking-wider ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Reveal Original</span>
                            <div className={`relative inline-flex h-8 w-14 items-center border-2 border-white transition-colors ${isDarkMode ? 'bg-black' : 'bg-gray-200'}`}>
                                <span className="translate-x-6 inline-block h-6 w-6 transform bg-primary border-2 border-white transition shadow-sm"></span>
                            </div>
                            <span className="text-sm font-black text-primary uppercase mr-2">ON</span>
                        </label>
                    </div>
                </div>

                {/* Post Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-primary bg-black shadow-neo-lg mb-8">
                    {/* Original */}
                    <div className="bg-[#0A0A0F] p-6 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-primary relative group">
                        <div className="absolute top-0 right-0">
                            <span className="bg-white text-black border-l-4 border-b-4 border-primary text-xs uppercase font-black px-3 py-1 tracking-wider inline-block">Original</span>
                        </div>
                        <div className="font-jp text-slate-300 leading-loose text-sm md:text-[15px] h-full overflow-y-auto max-h-[500px] pr-4 mt-6">
                            <p className="mb-6">
                                大阪の文化を語る上で、「食い倒れ」という言葉は外せません。多くの観光客はこれを単に「破産するまで食べる」という意味だと解釈していますが、実際のニュアンスはもっと深く、遊び心に満ちています。
                            </p>
                            <p className="mb-6">
                                江戸時代、大阪は「天下の台所」と呼ばれていました。商人の町としての活気と、食材の豊富さが、この独特な食文化を育んだのです。
                            </p>
                            <p>
                                京都の「着倒れ」（着物に全財産をつぎ込む）に対して、大阪人は食に情熱を注ぐ。それは単なる浪費ではなく、人生を謳歌する姿勢そのものなのです。
                            </p>
                        </div>
                    </div>

                    {/* Translated */}
                    <div className={`p-6 md:p-8 relative ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                        <div className="absolute top-0 right-0">
                            <span className="bg-primary text-white border-l-4 border-b-4 border-white text-xs uppercase font-black px-3 py-1 tracking-wider inline-block shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]">Translated</span>
                        </div>
                        <div className={`font-display leading-relaxed text-base md:text-lg h-full overflow-y-auto max-h-[500px] pr-4 mt-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            <p className="mb-6">
                                When discussing Osaka culture, the word <span className="bg-yellow-400/20 text-yellow-500 font-bold px-1 border-b-2 border-yellow-400 cursor-help hover:bg-yellow-400 hover:text-black transition-colors" title="Cultural Note: 'Kuidaore' literally means to eat until one falls over, symbolizing Osaka's obsession with food.">"Kuidaore"</span> is indispensable. Many tourists interpret this simply as "eating until you go bankrupt," but the actual nuance is deeper and full of playfulness.
                            </p>
                            <p className="mb-6">
                                In the Edo period, Osaka was called "the nation's kitchen." The vitality of the merchant town and the abundance of ingredients nurtured this unique food culture.
                            </p>
                            <p>
                                In contrast to Kyoto's <span className="bg-yellow-400/20 text-yellow-500 font-bold px-1 border-b-2 border-yellow-400 cursor-help hover:bg-yellow-400 hover:text-black transition-colors" title="Cultural Note: 'Kidaore' refers to Kyotoites spending their fortune on fine kimonos.">"Kidaore"</span> (spending one's entire fortune on kimono), Osakans pour their passion into food. It is not mere extravagance, but an attitude of celebrating life itself.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interaction Bar */}
                <div className={`flex items-center justify-between border-2 border-slate-700 p-2 mb-12 shadow-neo-sm ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                    <div className="flex items-center divide-x-2 divide-slate-700">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-primary hover:bg-slate-800 transition-colors group">
                            <Heart size={24} className="group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                            <span className="text-sm font-bold font-mono">1,240</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-primary hover:bg-slate-800 transition-colors group">
                            <MessageSquare size={24} className="group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                            <span className="text-sm font-bold font-mono">48</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-primary hover:bg-slate-800 transition-colors group">
                            <Repeat size={24} className="group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                            <span className="text-sm font-bold font-mono">124</span>
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-l-2 border-slate-700">
                        <Bookmark size={24} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Divider Pattern */}
                <div className="h-1 w-full bg-slate-800 mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iIzRmNDZlNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')` }}></div>
                </div>

                {/* Comment Input */}
                <div className="flex gap-6 mb-16 items-start">
                    <div className="size-12 border-2 border-primary bg-slate-700 bg-cover bg-center shrink-0 shadow-neo-sm" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=e5e7eb')` }}></div>
                    <div className="flex-1">
                        <div className="relative w-full group">
                            <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 border-2 border-transparent"></div>
                            <textarea
                                className={`relative z-10 w-full border-2 border-white p-5 placeholder-slate-500 focus:ring-0 focus:border-primary min-h-[140px] resize-none text-lg font-medium shadow-none transition-all ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}
                                placeholder="Write your comment in 日本語..."
                            ></textarea>
                            <div className="absolute z-20 bottom-4 right-4 flex items-center gap-2 bg-black border border-slate-700 px-2 py-1">
                                <span className="text-[10px] text-primary font-mono font-bold uppercase tracking-wide">Detected: JA</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6 pl-2">
                            <div className="flex gap-3">
                                <button className="size-10 flex items-center justify-center text-slate-400 border-2 border-slate-700 hover:text-white hover:border-white hover:bg-slate-800 transition-colors">
                                    <Bold size={20} />
                                </button>
                                <button className="size-10 flex items-center justify-center text-slate-400 border-2 border-slate-700 hover:text-white hover:border-white hover:bg-slate-800 transition-colors">
                                    <Italic size={20} />
                                </button>
                                <button className="size-10 flex items-center justify-center text-slate-400 border-2 border-slate-700 hover:text-white hover:border-white hover:bg-slate-800 transition-colors">
                                    <LinkIcon size={20} />
                                </button>
                            </div>
                            <button className="bg-primary hover:bg-primary-light text-white px-8 py-2 border-2 border-white shadow-[4px_4px_0px_0px_#ffffff] font-black uppercase text-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-10">
                    <h3 className={`text-2xl font-black mb-8 border-l-8 border-primary pl-4 uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>Discussion <span className="text-slate-500 text-lg font-mono ml-3">/ 48</span></h3>

                    {/* Comment 1 */}
                    <div className="flex gap-0 group">
                        <div className="flex flex-col items-center mr-4 w-10 shrink-0">
                            <div className="size-10 border-2 border-white bg-slate-700 bg-cover bg-center shrink-0 z-10" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=e5e7eb')` }}></div>
                            <div className="w-1 bg-primary h-full -mt-2"></div>
                        </div>
                        <div className="flex-1 pb-8">
                            <div className={`border-2 border-slate-700 p-5 shadow-[4px_4px_0px_0px_#000000] relative ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                                <div className={`absolute top-4 -left-2 w-4 h-4 border-l-2 border-b-2 border-slate-700 rotate-45 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>Sarah Jenkins</span>
                                        <span className="bg-slate-800 text-white border border-slate-600 text-[10px] px-2 py-0.5 font-mono font-bold shadow-[2px_2px_0px_0px_#475569]">EN</span>
                                        <span className="text-slate-500 text-xs font-mono font-bold uppercase">• 1 hour ago</span>
                                    </div>
                                    <div className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                        This is fascinating! I visited Osaka last year and definitely felt that energy. Is there a similar term for Tokyo culture?
                                    </div>
                                    <div className="flex items-center gap-4 border-t-2 border-slate-800 pt-3">
                                        <button className="text-slate-400 hover:text-primary text-xs font-bold uppercase flex items-center gap-1 group/btn">
                                            <Heart size={18} className="group-hover:scale-110 transition-transform" /> 12
                                        </button>
                                        <button className={`text-slate-400 text-xs font-bold uppercase ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Reply</button>
                                    </div>
                                </div>
                            </div>

                            {/* Reply */}
                            <div className="mt-6 flex gap-0">
                                <div className="flex flex-col items-center mr-4 w-10 shrink-0">
                                    <div className="absolute -ml-[3.5rem] mt-5 w-8 h-1 bg-primary"></div>
                                    <div className="size-10 border-2 border-primary bg-slate-700 bg-cover bg-center shrink-0 z-10" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/notionists/svg?seed=Kenji&backgroundColor=e5e7eb')` }}></div>
                                </div>
                                <div className="flex-1">
                                    <div className={`border-2 border-primary p-5 shadow-neo relative ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                                        <div className={`absolute top-4 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary rotate-45 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}></div>
                                        <div className="relative z-10">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>Kenji Sato</span>
                                                <span className="bg-primary text-white border border-white text-[10px] px-2 py-0.5 font-mono font-bold shadow-[2px_2px_0px_0px_#ffffff]">JP</span>
                                                <span className="bg-yellow-400 text-black border border-black text-[10px] px-2 py-0.5 font-bold uppercase tracking-wide flex items-center gap-1 shadow-[2px_2px_0px_0px_#000000]">
                                                    <Lightbulb size={14} fill="currentColor" /> Author
                                                </span>
                                                <span className="text-slate-500 text-xs font-mono font-bold uppercase">• 45 min ago</span>
                                            </div>
                                            <div className={`text-base leading-relaxed mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                                Tokyo doesn't really have a direct equivalent phrase, but there is an old saying <span className="bg-slate-800 px-1 font-mono text-sm text-primary-light">"Edokko wa yoigoshi no zeni wa motanai"</span>. It implies a similar dashing spirit!
                                            </div>
                                            <div className="bg-black border-2 border-yellow-400 p-4 my-4 flex gap-4 items-start shadow-[4px_4px_0px_0px_#fbbf24]">
                                                <div className="bg-yellow-400 text-black p-1 shrink-0 border border-black">
                                                    <GraduationCap size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-yellow-400 text-xs font-black uppercase tracking-wider mb-1">Cultural Context</p>
                                                    <p className="text-slate-300 text-sm font-medium">"Edokko" refers to people born and raised in Edo (modern-day Tokyo) going back several generations. They prided themselves on being stylish, quick-tempered, and generous.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 border-t-2 border-slate-800 pt-3">
                                                <button className="text-slate-400 hover:text-primary text-xs font-bold uppercase flex items-center gap-1 group/btn">
                                                    <Heart size={18} className="group-hover:scale-110 transition-transform" /> 8
                                                </button>
                                                <button className={`text-slate-400 text-xs font-bold uppercase ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PostThreadPage;
