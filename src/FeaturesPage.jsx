import React from 'react';
import { Check, ArrowRight, Play, MessageSquare, Star, Key, Fingerprint, Shield, Users } from 'lucide-react';

const FeaturesPage = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden border-b-4 border-black bg-white px-4 py-20 text-center dark:bg-[#111118] dark:border-white w-full">
                {/* Abstract Background Shapes */}
                <div className="absolute left-[-5%] top-[10%] h-64 w-64 rounded-full border-4 border-black bg-accent-yellow opacity-20 blur-3xl dark:border-white dark:bg-yellow-500"></div>
                <div className="absolute right-[-5%] bottom-[10%] h-80 w-80 rounded-full border-4 border-black bg-primary opacity-20 blur-3xl dark:border-white dark:bg-primary-dark"></div>

                <div className="relative z-10 max-w-4xl space-y-8 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-green-300 px-4 py-1.5 shadow-brutalist-hover dark:border-white dark:bg-green-600">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 opacity-75 dark:bg-green-300"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-800 dark:bg-green-200"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Live Beta Access</span>
                    </div>

                    <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-black dark:text-white md:text-8xl lg:text-9xl">
                        SPEAK <br />
                        <span className="text-primary dark:text-primary-dark">GLOBALLY.</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300 md:text-2xl">
                        Write in English. They read in Japanese. We handle the rest. <br className="hidden md:block" /> EchoBoard is the Babel Fish of social media.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 pt-8 md:flex-row w-full">
                        <button className="flex h-14 w-full min-w-[200px] items-center justify-center gap-2 rounded-xl border-2 border-black bg-black px-8 text-lg font-bold text-white shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all md:w-auto dark:bg-white dark:text-black dark:border-white dark:hover:bg-slate-200">
                            Start Talking
                            <ArrowRight size={20} />
                        </button>
                        <button className="flex h-14 w-full min-w-[200px] items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-8 text-lg font-bold text-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all md:w-auto dark:bg-[#1A1A24] dark:border-white dark:text-white">
                            <Play size={20} />
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Marquee Ticker */}
                <style>
                    {`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee 20s linear infinite;
                    }
                    `}
                </style>
                <div className="absolute bottom-0 left-0 w-full border-t-4 border-black bg-accent-yellow py-3 dark:bg-yellow-500 dark:border-white overflow-hidden">
                    <div className="flex w-fit animate-marquee whitespace-nowrap">
                        <div className="text-xl font-bold uppercase tracking-widest text-black flex gap-8 px-4">
                            <span>Hello • Bonjour • Hola • Guten Tag • Ciao • Konnichiwa • Namaste • Salaam • Privet • Nǐ hǎo • Olá •</span>
                            <span>Hello • Bonjour • Hola • Guten Tag • Ciao • Konnichiwa • Namaste • Salaam • Privet • Nǐ hǎo • Olá •</span>
                        </div>
                        {/* Duplicate for seamless loop */}
                        <div className="text-xl font-bold uppercase tracking-widest text-black flex gap-8 px-4">
                            <span>Hello • Bonjour • Hola • Guten Tag • Ciao • Konnichiwa • Namaste • Salaam • Privet • Nǐ hǎo • Olá •</span>
                            <span>Hello • Bonjour • Hola • Guten Tag • Ciao • Konnichiwa • Namaste • Salaam • Privet • Nǐ hǎo • Olá •</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature 1: The Universal Translator */}
            <section className="relative border-b-4 border-black bg-background-light w-full px-4 py-24 md:py-32 dark:bg-[#111118] dark:border-white" id="translator">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="order-2 space-y-8 lg:order-1">
                        <div className="inline-block rounded-lg border-2 border-black bg-pink-300 px-3 py-1 text-sm font-bold uppercase text-black shadow-brutalist-hover dark:border-white dark:bg-pink-500 dark:text-white">
                            Zero Latency
                        </div>
                        <h2 className="text-5xl font-black leading-tight tracking-tight text-black md:text-6xl dark:text-white">
                            THE UNIVERSAL <br />
                            TRANSLATOR
                        </h2>
                        <p className="text-lg font-medium leading-relaxed text-slate-700 md:text-xl dark:text-slate-300">
                            No copying, no pasting. Just connection. Watch your words transform instantly as you type. Our neural engine adapts to slang, idioms, and cultural nuances in real-time.
                        </p>
                        <ul className="space-y-4 text-lg font-bold text-black dark:text-white">
                            <li className="flex items-center gap-3">
                                <div className="rounded-full bg-black p-1 text-white dark:bg-white dark:text-black">
                                    <Check size={16} />
                                </div>
                                Instant text-to-text translation
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="rounded-full bg-black p-1 text-white dark:bg-white dark:text-black">
                                    <Check size={16} />
                                </div>
                                Context-aware nuance preservation
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="rounded-full bg-black p-1 text-white dark:bg-white dark:text-black">
                                    <Check size={16} />
                                </div>
                                Supports 140+ languages
                            </li>
                        </ul>
                        <button className="mt-4 flex h-12 items-center rounded-lg border-2 border-black bg-white px-6 text-base font-bold text-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:bg-[#1A1A24] dark:border-white dark:text-white">
                            See Supported Languages
                        </button>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto max-w-md rounded-2xl border-4 border-black bg-white p-6 shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-white">
                            {/* Chat Header */}
                            <div className="mb-6 flex items-center justify-between border-b-2 border-slate-100 pb-4 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-gray-200 dark:border-white dark:bg-slate-700">
                                        {/* Avatar Placeholder */}
                                        <div className="w-full h-full bg-slate-300"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold dark:text-white">You</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Writing in English (US)</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                </div>
                            </div>
                            {/* Chat Bubbles */}
                            <div className="flex flex-col gap-6">
                                {/* Sender Bubble */}
                                <div className="self-end max-w-[85%]">
                                    <div className="rounded-2xl rounded-tr-none border-2 border-black bg-primary px-4 py-3 text-white shadow-brutalist-hover dark:border-white">
                                        <p className="font-medium">How is the weather in Tokyo?</p>
                                    </div>
                                    <span className="mt-1 block text-right text-xs font-bold text-slate-400">10:42 AM</span>
                                </div>
                                {/* Processing Indicator */}
                                <div className="flex items-center justify-center gap-2 py-2">
                                    <MessageSquare size={16} className="text-primary animate-bounce dark:text-white" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white">Translating</span>
                                </div>
                                {/* Receiver Bubble */}
                                <div className="self-start max-w-[85%]">
                                    <div className="flex items-end gap-2">
                                        <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-black bg-gray-200 flex-shrink-0 dark:border-white dark:bg-slate-700">
                                            <div className="w-full h-full bg-slate-300"></div>
                                        </div>
                                        <div className="rounded-2xl rounded-tl-none border-2 border-black bg-white px-4 py-3 text-black shadow-brutalist-hover dark:bg-[#111118] dark:border-white dark:text-white">
                                            <p className="font-medium">東京の天気はどうですか？</p>
                                        </div>
                                    </div>
                                    <span className="mt-1 ml-12 block text-xs font-bold text-slate-400">Kenji sees this</span>
                                </div>
                            </div>
                            {/* Input Area */}
                            <div className="mt-8 flex items-center gap-2 rounded-lg border-2 border-black bg-gray-50 p-2 dark:bg-[#111118] dark:border-white">
                                <input className="w-full border-none bg-transparent text-sm font-medium focus:ring-0 outline-none px-2 py-1 dark:text-white" disabled placeholder="Type a message..." type="text" defaultValue="Looking forward to the trip!" />
                                <button className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white hover:bg-primary-dark transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature 2: Cultural Intelligence */}
            <section className="relative border-b-4 border-black bg-white w-full px-4 py-24 md:py-32 dark:bg-[#111118] dark:border-white" id="community">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="relative">
                        {/* Thread Component */}
                        <div className="relative mx-auto max-w-lg rounded-xl border-4 border-black bg-background-light p-6 shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-white">
                            {/* Original Question */}
                            <div className="mb-6 flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-lg border-2 border-black bg-blue-200 dark:border-white dark:bg-blue-600"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <h4 className="text-lg font-bold dark:text-white">Sarah_J</h4>
                                        <span className="text-xs font-bold text-slate-400">2h ago</span>
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">Can someone explain why people bow differently in business settings versus casual ones in Japan?</p>
                                </div>
                            </div>
                            {/* Gold Badge Answer */}
                            <div className="relative ml-8 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4 shadow-sm dark:bg-yellow-900/20 dark:border-yellow-400">
                                {/* Gold Badge Absolute */}
                                <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-yellow-400 shadow-brutalist-hover dark:border-white" title="Cultural Expert">
                                    <Star size={16} className="text-black fill-current" />
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-lg border-2 border-black bg-white dark:border-white dark:bg-slate-700"></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base font-bold text-black dark:text-white">Yuki.Tanaka</h4>
                                            <span className="rounded bg-yellow-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-yellow-800 border border-yellow-400 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600">Top Contributor</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">Great question! It's all about the angle. A 15° bow (Eshaku) is casual. 30° (Keirei) is for business/respect. 45° (Saikeirei) is for deep apologies or VIPs.</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between border-t border-yellow-200 pt-3 dark:border-yellow-800">
                                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-700 dark:text-yellow-400">
                                        <span>Insightful Answer</span>
                                    </div>
                                    <div className="flex items-center gap-2 dark:text-slate-300">
                                        <button className="rounded p-1 hover:bg-yellow-200 dark:hover:bg-yellow-900/40"><span className="text-sm">👍</span></button>
                                        <span className="text-xs font-bold">245</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="inline-block rounded-lg border-2 border-black bg-yellow-300 px-3 py-1 text-sm font-bold uppercase text-black shadow-brutalist-hover dark:border-white dark:bg-yellow-500">
                            Earn Reputation
                        </div>
                        <h2 className="text-5xl font-black leading-tight tracking-tight text-black md:text-6xl dark:text-white">
                            CULTURAL <br />
                            INTELLIGENCE
                        </h2>
                        <p className="text-lg font-medium leading-relaxed text-slate-700 md:text-xl dark:text-slate-300">
                            Don't just translate words—understand the world. Earn the <span className="inline-flex items-center rounded bg-yellow-100 px-1 font-bold text-yellow-800 border border-yellow-500 mx-1 dark:bg-yellow-900 dark:text-yellow-100"><Star size={14} className="mr-1 fill-current" />Gold Badge</span> by providing helpful cultural context to conversations. Reward understanding, not just engagement.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border-2 border-black bg-background-light p-4 dark:bg-[#1A1A24] dark:border-white">
                                <span className="mb-2 block text-3xl font-black text-primary dark:text-primary-dark">500+</span>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Cultural Experts Active</span>
                            </div>
                            <div className="rounded-lg border-2 border-black bg-background-light p-4 dark:bg-[#1A1A24] dark:border-white">
                                <span className="mb-2 block text-3xl font-black text-primary dark:text-primary-dark">12k</span>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Daily Insights Shared</span>
                            </div>
                        </div>
                        <button className="mt-4 flex h-12 items-center rounded-lg border-2 border-black bg-black px-6 text-base font-bold text-white shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:bg-white dark:text-black dark:border-white">
                            Learn the Rules
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature 3: Verified Identities */}
            <section className="relative overflow-hidden border-b-4 border-black bg-background-light w-full px-4 py-24 md:py-32 dark:bg-[#111118] dark:border-white" id="verified">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-block rounded-lg border-2 border-black bg-primary px-3 py-1 text-sm font-bold uppercase text-white shadow-brutalist-hover dark:border-white">
                            Trust & Safety
                        </div>
                        <h2 className="text-5xl font-black leading-tight tracking-tight text-black md:text-6xl dark:text-white">
                            VERIFIED <br />
                            IDENTITIES
                        </h2>
                        <p className="text-lg font-medium leading-relaxed text-slate-700 md:text-xl dark:text-slate-300">
                            Real People, Real Talk. No bots, no trolls. Our rigorous verification process ensures that the person you're talking to is exactly who they say they are.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4 rounded-lg border-2 border-black bg-white p-4 shadow-brutalist-hover dark:bg-[#1A1A24] dark:border-white">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-primary dark:bg-indigo-900/50 dark:text-indigo-300">
                                    <Fingerprint size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold dark:text-white">Biometric ID</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Secure government ID matching ensures authenticity.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-lg border-2 border-black bg-white p-4 shadow-brutalist-hover dark:bg-[#1A1A24] dark:border-white">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-primary dark:bg-indigo-900/50 dark:text-indigo-300">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold dark:text-white">The Indigo Check</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Instantly recognizable trust signal across the platform.</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-4 flex h-12 items-center rounded-lg border-2 border-black bg-primary px-6 text-base font-bold text-white shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:border-white">
                            Get Verified
                        </button>
                    </div>

                    <div className="flex justify-center">
                        {/* ID Card Component */}
                        <div className="relative w-full max-w-sm rotate-3 transform transition-transform hover:rotate-0 duration-300">
                            <div className="absolute -top-4 -right-4 h-full w-full rounded-xl border-4 border-black bg-slate-800 dark:bg-slate-700 dark:border-white"></div>
                            <div className="relative flex flex-col items-center rounded-xl border-4 border-black bg-white p-8 shadow-none dark:bg-[#1A1A24] dark:border-white">
                                {/* Profile Image */}
                                <div className="relative mb-4 h-32 w-32">
                                    <div className="h-full w-full rounded-full border-4 border-black object-cover bg-slate-300 dark:border-white dark:bg-slate-600"></div>
                                    <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm dark:border-white" title="Verified">
                                        <Check size={20} className="stroke-[3px]" />
                                    </div>
                                </div>
                                {/* User Info */}
                                <h3 className="text-2xl font-black text-black dark:text-white">Elena Rodriguez</h3>
                                <p className="font-mono text-sm font-bold text-slate-500 dark:text-slate-400">@elena_world</p>
                                {/* Stats */}
                                <div className="my-6 flex w-full justify-between border-y-2 border-slate-100 py-4 dark:border-slate-700">
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-black dark:text-white">1.4k</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase">Followers</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-black dark:text-white">ESP</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase">Native</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-black dark:text-white">98%</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase">Trust Score</span>
                                    </div>
                                </div>
                                <div className="w-full rounded bg-green-100 px-3 py-2 text-center text-sm font-bold text-green-800 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                                    <span className="inline-flex items-center gap-1"><Shield size={14} className="fill-current" /> Identity Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / CTA */}
            <section className="w-full border-t-4 border-black bg-white pb-10 pt-20 dark:bg-[#111118] dark:border-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="rounded-2xl border-4 border-black bg-primary p-8 md:p-16 text-center shadow-brutalist-thick dark:border-white">
                        <h2 className="text-4xl font-black text-white md:text-6xl">
                            READY TO BREAK <br /> BARRIERS?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-indigo-100 md:text-xl">
                            Join thousands of users communicating without borders. The world is waiting for your voice.
                        </p>
                        <form className="mx-auto mt-10 flex max-w-lg flex-col gap-4 md:flex-row">
                            <input className="flex-1 rounded-lg border-2 border-black bg-white px-6 py-4 font-bold text-black placeholder:text-slate-400 focus:border-black focus:ring-0 shadow-brutalist-hover outline-none dark:border-white" placeholder="Enter your email" type="email" />
                            <button className="rounded-lg border-2 border-black bg-black px-8 py-4 text-lg font-bold text-white shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-slate-900 transition-all dark:bg-white dark:text-black dark:border-white dark:hover:bg-slate-200" type="button">
                                Join Waitlist
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
