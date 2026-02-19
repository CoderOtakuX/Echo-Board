import React, { useState } from 'react';
import { Check, ShieldCheck, HelpCircle, ChevronDown, CheckCircle, Shield } from 'lucide-react';

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center gap-6 px-4 py-16 md:py-24 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-4 py-1 shadow-brutalist-hover transform -rotate-1 dark:bg-yellow-500 dark:border-white">
                    <ShieldCheck size={16} className="text-black font-bold" />
                    <span className="text-xs font-black uppercase tracking-wide text-black">Get Verified Today</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
                    GET <br />
                    <span className="bg-primary px-2 text-white transform inline-block rotate-1 dark:bg-primary-dark">ECHO VERIFIED</span>
                </h1>
                <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl border-l-4 border-slate-900 pl-4 text-left md:text-center md:border-l-0 md:pl-0 dark:border-white">
                    Elevate your presence. Access exclusive tools, get the blue checkmark, and amplify your voice globally.
                </p>

                {/* Billing Toggle */}
                <div className="mt-4 flex items-center rounded-lg border-2 border-black bg-white p-1 shadow-brutalist-hover dark:bg-[#111118] dark:border-white">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`rounded px-4 py-2 text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black' : 'text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`rounded px-4 py-2 text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-black' : 'text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                    >
                        Yearly <span className={`text-[10px] ml-1 font-black ${billingCycle === 'yearly' ? 'text-accent-yellow dark:text-primary-dark' : 'text-primary dark:text-primary-light'}`}>-12%</span>
                    </button>
                </div>
            </div>

            <div className="w-full max-w-[1200px] px-4 pb-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 items-start">
                    {/* Free Plan */}
                    <div className="flex flex-col rounded-lg p-8 h-full relative group border-4 border-black bg-white shadow-brutalist transition-all hover:-translate-y-1 hover:shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-white">
                        <div className="mb-6 flex flex-col gap-2">
                            <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white">Free</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Essential features for everyone.</p>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">$0</span>
                                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">/mo</span>
                            </div>
                        </div>
                        <div className="mb-8 flex flex-col gap-4 flex-grow">
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Read-only access</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Basic post translation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Standard feed algorithm</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full rounded border-2 border-black bg-gray-100 py-4 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-gray-200 shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-slate-700">
                            Continue Free
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="flex flex-col rounded-lg p-8 h-full relative group border-4 border-black bg-white shadow-brutalist transition-all hover:-translate-y-1 hover:shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-white">
                        <div className="mb-6 flex flex-col gap-2">
                            <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white">Echo Premium</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Enhance your experience.</p>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">{billingCycle === 'monthly' ? '$8' : '$7'}</span>
                                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">/mo</span>
                            </div>
                            {billingCycle === 'yearly' && <span className="text-xs font-bold text-green-600 dark:text-green-400">Billed $84 yearly</span>}
                        </div>
                        <div className="mb-8 flex flex-col gap-4 flex-grow">
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Edit posts</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Longer posts (4k chars)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Half ads in feed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">SMS Two-factor auth</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full rounded bg-white border-2 border-black py-4 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-gray-50 shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:bg-slate-200 dark:border-white">
                            Get Premium
                        </button>
                    </div>

                    {/* Verified Plan */}
                    <div className="flex flex-col rounded-lg p-8 relative border-4 border-primary bg-white ring-4 ring-primary/20 transform md:-translate-y-4 z-10 shadow-brutalist-thick dark:bg-[#1A1A24] dark:border-primary-dark">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded border-2 border-black bg-primary px-4 py-1 shadow-brutalist-hover dark:border-white">
                            <span className="text-xs font-black uppercase tracking-wider text-white">Featured</span>
                        </div>
                        <div className="mb-6 flex flex-col gap-2 pt-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-black uppercase text-primary dark:text-primary-dark">Echo Verified</h3>
                                <CheckCircle size={28} className="text-primary fill-current dark:text-primary-dark" />
                            </div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">The ultimate power user tier.</p>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">{billingCycle === 'monthly' ? '$16' : '$14'}</span>
                                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">/mo</span>
                            </div>
                            {billingCycle === 'yearly' && <span className="text-xs font-bold text-green-600 dark:text-green-400">Billed $168 yearly</span>}
                        </div>
                        <div className="mb-8 flex flex-col gap-4 flex-grow">
                            <div className="flex items-center gap-3 rounded bg-blue-50 p-2 -ml-2 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-primary text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white">Verified Badge</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-primary text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">No Ads in For You</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-primary text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Creator Hub Access</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-primary text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Everything in Premium</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-black bg-primary text-white dark:border-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-300">Priority ID Verification</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full rounded border-2 border-black bg-primary py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-blue-700 shadow-brutalist-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all dark:border-white">
                            Get Verified
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[800px] px-4 pb-24">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-black uppercase text-slate-900 text-center mb-4 dark:text-white">Common Questions</h2>

                    <details className="group bg-white border-2 border-black rounded-lg shadow-brutalist overflow-hidden open:shadow-brutalist-hover transition-all duration-200 dark:bg-[#1A1A24] dark:border-white">
                        <summary className="flex cursor-pointer items-center justify-between p-5 list-none bg-white hover:bg-gray-50 dark:bg-[#1A1A24] dark:hover:bg-slate-800">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">How do I get the Verified checkmark?</span>
                            <ChevronDown className="transition group-open:rotate-180 dark:text-white" />
                        </summary>
                        <div className="border-t-2 border-black bg-gray-50 p-5 text-slate-700 font-medium leading-relaxed dark:bg-[#111118] dark:border-white dark:text-slate-300">
                            Subscribe to the 'Echo Verified' plan. Once you subscribe, we will ask you to verify your government ID to ensure authenticity. Once approved, the checkmark will appear on your profile.
                        </div>
                    </details>

                    <details className="group bg-white border-2 border-black rounded-lg shadow-brutalist overflow-hidden open:shadow-brutalist-hover transition-all duration-200 dark:bg-[#1A1A24] dark:border-white">
                        <summary className="flex cursor-pointer items-center justify-between p-5 list-none bg-white hover:bg-gray-50 dark:bg-[#1A1A24] dark:hover:bg-slate-800">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">What is the difference between Premium and Verified?</span>
                            <ChevronDown className="transition group-open:rotate-180 dark:text-white" />
                        </summary>
                        <div className="border-t-2 border-black bg-gray-50 p-5 text-slate-700 font-medium leading-relaxed dark:bg-[#111118] dark:border-white dark:text-slate-300">
                            Echo Premium gives you functional tools like edit button and longer posts. Echo Verified includes all Premium features plus the blue checkmark, ID verification, prioritized ranking in replies, and removes ads from your main feed.
                        </div>
                    </details>

                    <details className="group bg-white border-2 border-black rounded-lg shadow-brutalist overflow-hidden open:shadow-brutalist-hover transition-all duration-200 dark:bg-[#1A1A24] dark:border-white">
                        <summary className="flex cursor-pointer items-center justify-between p-5 list-none bg-white hover:bg-gray-50 dark:bg-[#1A1A24] dark:hover:bg-slate-800">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">Can organizations get verified?</span>
                            <ChevronDown className="transition group-open:rotate-180 dark:text-white" />
                        </summary>
                        <div className="border-t-2 border-black bg-gray-50 p-5 text-slate-700 font-medium leading-relaxed dark:bg-[#111118] dark:border-white dark:text-slate-300">
                            Yes, we have a separate tier for verified organizations which includes affiliation badges for employees. Please contact our sales team for organization verification.
                        </div>
                    </details>
                </div>
            </div>

            <div className="w-full bg-slate-900 py-20 px-4 text-center border-t-4 border-black relative overflow-hidden dark:bg-[#1A1A24] dark:border-white">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        READY TO AMPLIFY <br />
                        <span className="text-primary underline decoration-4 decoration-white underline-offset-8">YOUR VOICE?</span>
                    </h2>
                    <p className="text-slate-300 font-medium text-lg">Join the conversation. Get verified and be heard.</p>
                    <button className="mt-4 rounded border-2 border-black bg-primary px-8 py-4 text-lg font-black uppercase tracking-wider text-white shadow-brutalist hover:bg-white hover:text-primary transition-colors hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] dark:border-white">
                        Start Verification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
