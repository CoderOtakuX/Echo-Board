// EchoBoard — AboutSection.jsx
import React from 'react';
import {
    MessageSquare,
    Globe,
    Lightbulb,
    Users,
    Zap,
    CheckCircle,
    ArrowRight,
    ArrowDown,
    Copy,
    Sparkles
} from 'lucide-react';

const AboutSection = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero / Intro Section */}
            <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex w-fit items-center gap-2 rounded-lg border-2 border-black bg-accent-yellow px-3 py-1 text-xs font-bold uppercase shadow-brutalist dark:border-white dark:bg-yellow-500 dark:text-black">
                            <Sparkles size={14} />
                            v2.0 Now Live
                        </div>
                        <h2 className="text-5xl font-black leading-[0.9] tracking-tighter text-black dark:text-white md:text-7xl lg:text-8xl">
                            SPEAK <br />
                            <span className="text-primary dark:text-primary-dark text-stroke-1">GLOBALLY.</span> <br />
                            READ <br />
                            <span className="text-primary dark:text-primary-dark text-stroke-1">LOCALLY.</span>
                        </h2>
                        <p className="max-w-md text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300 border-l-4 border-black dark:border-white pl-4">
                            Break down language barriers without breaking your flow. EchoBoard handles the translation so you can handle the connection.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex h-14 min-w-[160px] items-center justify-center rounded-lg border-2 border-black bg-primary px-8 text-lg font-bold text-white shadow-brutalist-thick transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-brutalist active:translate-x-[8px] active:translate-y-[8px] active:shadow-none dark:border-white">
                                START NOW
                            </button>
                            <button className="flex h-14 min-w-[160px] items-center justify-center rounded-lg border-2 border-black bg-white px-8 text-lg font-bold text-black shadow-brutalist-thick transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-brutalist active:translate-x-[8px] active:translate-y-[8px] active:shadow-none dark:bg-[#1A1A24] dark:border-white dark:text-white">
                                WATCH DEMO
                            </button>
                        </div>
                    </div>

                    {/* Right Visual / Interactive Element */}
                    <div className="relative h-full min-h-[400px] w-full rounded-2xl border-4 border-black bg-white p-6 shadow-brutalist-thick dark:bg-[#111118] dark:border-white">
                        {/* Abstract Pattern overlay if needed, using CSS or SVG. Using simple BG color for now to match theme */}
                        <div className="absolute -right-4 -top-8 rotate-3 rounded-lg border-2 border-black bg-accent-yellow px-4 py-2 font-bold shadow-brutalist transform z-10 dark:border-white dark:bg-yellow-500 dark:text-black">
                            LIVE PREVIEW
                        </div>

                        <div className="flex h-full flex-col justify-between gap-6 relative z-10">
                            {/* Message Incoming */}
                            <div className="self-start max-w-[90%] sm:max-w-[80%]">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full border-2 border-black bg-green-400 dark:border-white"></div>
                                    <span className="text-sm font-bold dark:text-white">Haruto (Tokyo)</span>
                                </div>
                                <div className="rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border-2 border-black bg-slate-100 p-4 shadow-brutalist dark:bg-[#1A1A24] dark:border-white dark:text-white">
                                    <p className="font-bold text-slate-400 line-through decoration-2">こんにちは、元気ですか？</p>
                                    <p className="mt-1 text-lg font-bold text-primary dark:text-primary-dark">Hey, how are you doing?</p>
                                </div>
                            </div>

                            {/* Message Outgoing */}
                            <div className="self-end max-w-[90%] sm:max-w-[80%]">
                                <div className="mb-2 flex items-center justify-end gap-2">
                                    <span className="text-sm font-bold dark:text-white">You (New York)</span>
                                    <div className="h-8 w-8 rounded-full border-2 border-black bg-primary dark:border-white"></div>
                                </div>
                                <div className="rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl border-2 border-black bg-primary p-4 shadow-brutalist text-white dark:border-white">
                                    <p className="text-lg font-bold">I'm great! Just working on the new design.</p>
                                    <p className="mt-1 font-bold text-white/70 text-sm">→ Je vais bien! Je travaille juste sur le nouveau design.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Ticker */}
            <div className="w-full border-y-4 border-black bg-accent-yellow py-3 overflow-hidden dark:bg-yellow-500 dark:border-white">
                <div className="flex w-full items-center justify-center gap-8 whitespace-nowrap text-xl font-bold uppercase tracking-widest text-black">
                    <span className="flex items-center gap-2">✦ Zero Latency</span>
                    <span className="flex items-center gap-2">✦ 100+ Languages</span>
                    <span className="flex items-center gap-2">✦ Context Aware</span>
                    <span className="hidden md:flex items-center gap-2">✦ Zero Latency</span>
                    <span className="hidden md:flex items-center gap-2">✦ 100+ Languages</span>
                    <span className="hidden md:flex items-center gap-2">✦ Context Aware</span>
                </div>
            </div>

            {/* Core Capabilities Grid */}
            <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-16 text-center">
                    <h2 className="inline-block border-b-8 border-accent-yellow text-4xl font-black uppercase text-black md:text-6xl dark:text-white dark:border-yellow-500">
                        Core Capabilities
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {/* Feature 1 */}
                    <div className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-brutalist-thick transition-transform hover:-translate-y-1 dark:bg-[#111118] dark:border-white">
                        <div className="bg-primary/10 p-8 flex items-center justify-center border-b-4 border-black h-48 dark:bg-primary/20 dark:border-white">
                            <div className="relative">
                                <MessageSquare size={96} strokeWidth={1} className="text-black absolute -top-4 -left-4 opacity-20 dark:text-white" />
                                <Globe size={96} strokeWidth={1.5} className="text-primary relative z-10 dark:text-primary-dark" />
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <h3 className="mb-2 text-2xl font-bold uppercase dark:text-white">Invisible Translation</h3>
                            <p className="text-slate-600 font-medium leading-relaxed dark:text-slate-400">
                                Real-time, zero-latency linguistic mapping that happens in the background. You type, they read. No plugins, no copy-paste.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-brutalist-thick transition-transform hover:-translate-y-1 dark:bg-[#111118] dark:border-white">
                        <div className="absolute right-4 top-4 z-10 cursor-help group/tooltip">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-white text-black hover:bg-accent-yellow transition-colors dark:border-white dark:bg-[#1A1A24] dark:text-white dark:hover:bg-yellow-500">?</span>
                            <div className="absolute right-0 top-10 w-48 hidden flex-col rounded-lg border-2 border-black bg-black p-2 text-xs text-white shadow-brutalist group-hover/tooltip:flex z-50 dark:border-white">
                                Our AI analyzes sentiment and local idioms to ensure meaning is preserved, not just vocabulary.
                            </div>
                        </div>
                        <div className="bg-accent-yellow p-8 flex items-center justify-center border-b-4 border-black h-48 dark:bg-yellow-500 dark:border-white">
                            <div className="relative flex items-center justify-center">
                                <Lightbulb size={96} strokeWidth={1.5} className="text-black" />
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <h3 className="mb-2 text-2xl font-bold uppercase flex items-center gap-2 dark:text-white">
                                Cultural Context
                            </h3>
                            <p className="text-slate-600 font-medium leading-relaxed dark:text-slate-400">
                                AI that understands slang, idioms, and cultural nuance. Don't just translate words, translate the <i>vibe</i>.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-brutalist-thick transition-transform hover:-translate-y-1 dark:bg-[#111118] dark:border-white">
                        <div className="bg-slate-100 p-8 flex items-center justify-center border-b-4 border-black h-48 relative overflow-hidden dark:bg-slate-800 dark:border-white">
                            <div className="grid grid-cols-4 gap-4 opacity-50 rotate-12 scale-125">
                                <div className="h-8 w-12 rounded border-2 border-black bg-red-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-blue-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-green-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-yellow-400"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-purple-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-orange-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-teal-500"></div>
                                <div className="h-8 w-12 rounded border-2 border-black bg-pink-500"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white rounded-full border-2 border-black p-4 dark:bg-[#111118] dark:border-white">
                                    <Users size={64} strokeWidth={1.5} className="text-black dark:text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <h3 className="mb-2 text-2xl font-bold uppercase dark:text-white">Community Hubs</h3>
                            <p className="text-slate-600 font-medium leading-relaxed dark:text-slate-400">
                                Connect with interests, not just regions. Join global hubs for gaming, tech, or art where language is never a barrier.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="w-full border-y-4 border-black bg-white py-20 dark:bg-[#0A0A0F] dark:border-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="flex flex-col gap-10 md:flex-row md:items-center">
                        <div className="flex-1">
                            <h2 className="mb-4 text-4xl font-black uppercase leading-tight md:text-5xl dark:text-white">
                                Try It Yourself. <br />
                                <span className="text-primary dark:text-primary-dark">Right Now.</span>
                            </h2>
                            <p className="mb-8 text-lg font-medium text-slate-600 dark:text-slate-300">
                                Type anything below and watch EchoBoard deconstruct and reconstruct your message instantly for a global audience.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <CheckCircle size={28} className="mt-1 text-black dark:text-accent-yellow" />
                                    <div>
                                        <h4 className="font-bold text-lg dark:text-white">Instant Output</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Less than 50ms latency.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle size={28} className="mt-1 text-black dark:text-accent-yellow" />
                                    <div>
                                        <h4 className="font-bold text-lg dark:text-white">Tone Preservation</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Formal, casual, or meme-ready.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="rounded-2xl border-4 border-black bg-background-light p-2 shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-white">
                                <div className="flex flex-col gap-2 rounded-xl border-2 border-black bg-white p-6 dark:bg-[#111118] dark:border-white">
                                    <label className="text-xs font-bold uppercase text-slate-400">Input (English)</label>
                                    <textarea className="w-full resize-none border-none bg-transparent text-xl font-bold text-black focus:ring-0 p-0 outline-none dark:text-white" placeholder="Type something here..." rows="2" defaultValue="Hello friend, let's build something cool."></textarea>
                                </div>
                                <div className="relative flex justify-center py-4">
                                    <div className="absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-accent-yellow p-2 shadow-brutalist z-10 dark:border-white dark:bg-yellow-500">
                                        <ArrowDown size={24} className="text-black animate-bounce" />
                                    </div>
                                    <div className="h-1 w-full border-t-2 border-dashed border-black dark:border-white"></div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="relative flex items-center justify-between rounded-xl border-2 border-black bg-slate-900 p-4 text-white shadow-sm dark:border-white dark:bg-black">
                                        <div>
                                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Output (Japanese)</p>
                                            <p className="text-lg font-medium">こんにちは、何かクールなものを作りましょう。</p>
                                        </div>
                                        <Copy size={20} className="text-slate-500 cursor-pointer hover:text-white" />
                                    </div>
                                    <div className="relative flex items-center justify-between rounded-xl border-2 border-black bg-slate-900 p-4 text-white shadow-sm dark:border-white dark:bg-black">
                                        <div>
                                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Output (Spanish)</p>
                                            <p className="text-lg font-medium">Hola amigo, construyamos algo genial.</p>
                                        </div>
                                        <Copy size={20} className="text-slate-500 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
                <div className="rounded-2xl border-4 border-black bg-primary p-12 shadow-brutalist-thick relative overflow-hidden dark:border-white">
                    {/* Abstract decorative shapes */}
                    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full border-4 border-black bg-accent-yellow dark:border-white dark:bg-yellow-500"></div>
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rotate-45 border-4 border-black bg-white dark:border-white"></div>

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-4xl font-black uppercase text-white md:text-6xl drop-shadow-md">
                            Ready to go Global?
                        </h2>
                        <p className="max-w-xl text-lg font-medium text-white/90">
                            Join 50,000+ users breaking language barriers today. No credit card required for the beta.
                        </p>
                        <button className="flex h-16 w-full max-w-xs items-center justify-center gap-2 rounded-lg border-2 border-black bg-white text-xl font-bold text-black shadow-brutalist transition-transform hover:-translate-y-1 hover:bg-accent-yellow dark:border-white dark:hover:bg-yellow-500">
                            <span>Get Started Free</span>
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutSection;
