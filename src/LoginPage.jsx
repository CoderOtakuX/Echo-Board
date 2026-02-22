import React from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { Activity, ArrowLeft } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'signin';
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Activity className="animate-spin mx-auto mt-20" size={48} />;
    }

    return (
        <div className="bg-[#f5f5f8] dark:bg-[#0A0A0F] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#6961ff] selection:text-white relative">
            {/* Decorative Background Text */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
                <span className="absolute top-20 left-10 text-[120px] font-black text-slate-500/5 rotate-[-12deg] blur-[2px]">Bonjour</span>
                <span className="absolute bottom-40 right-10 text-[140px] font-black text-[#6961ff]/5 rotate-[15deg] blur-[3px]">Hola</span>
                <span className="absolute top-1/2 left-20 text-[80px] font-black text-slate-500/5 -translate-y-1/2 rotate-[5deg]">Hello</span>
                <span className="absolute bottom-10 left-1/3 text-[90px] font-black text-slate-500/5 -rotate-[8deg] blur-[1px]">こんにちは</span>
                <span className="absolute top-10 right-1/4 text-[60px] font-black text-[#6961ff]/10 rotate-[20deg]">नमस्ते</span>
            </div>

            {/* Main Layout Container */}
            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6">
                <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-[#6961ff] transition-colors font-bold">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <div className="w-full flex flex-col items-center justify-center gap-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-[#6961ff] to-violet-600 flex items-center justify-center shadow-lg shadow-[#6961ff]/25">
                                <Activity className="text-white" size={24} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">EchoBoard</h2>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                            {mode === 'signup' ? t('createAccount') : t('welcomeBack')}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Connect with the world, in any language.
                        </p>
                    </div>

                    {/* Clerk Components */}
                    <div className="w-full max-w-[480px]">
                        {mode === 'signup' ? (
                            <SignUp
                                appearance={{
                                    elements: {
                                        card: "bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-[#2A2A3A] rounded-2xl shadow-2xl",
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        socialButtonsBlockButton: "rounded-xl border-slate-200 dark:border-[#2A2A3A] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold",
                                        formButtonPrimary: "bg-[#6961ff] hover:bg-[#6961ff]/90 text-white font-bold rounded-xl h-12 shadow-lg shadow-[#6961ff]/30 transition-all",
                                        formFieldInput: "rounded-xl border-slate-200 dark:border-[#2A2A3A] bg-slate-50 dark:bg-[#111118] py-3 text-slate-900 dark:text-white focus:border-[#6961ff] focus:ring-[#6961ff]",
                                        footerActionText: "text-slate-500 dark:text-slate-400 font-medium",
                                        footerActionLink: "text-[#6961ff] font-bold hover:text-[#6961ff]/80 transition-all"
                                    }
                                }}
                                forceRedirectUrl="/auth-redirect"
                            />
                        ) : (
                            <SignIn
                                appearance={{
                                    elements: {
                                        card: "bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-[#2A2A3A] rounded-2xl shadow-2xl",
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        socialButtonsBlockButton: "rounded-xl border-slate-200 dark:border-[#2A2A3A] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold",
                                        formButtonPrimary: "bg-[#6961ff] hover:bg-[#6961ff]/90 text-white font-bold rounded-xl h-12 shadow-lg shadow-[#6961ff]/30 transition-all",
                                        formFieldInput: "rounded-xl border-slate-200 dark:border-[#2A2A3A] bg-slate-50 dark:bg-[#111118] py-3 text-slate-900 dark:text-white focus:border-[#6961ff] focus:ring-[#6961ff]",
                                        footerActionText: "text-slate-500 dark:text-slate-400 font-medium",
                                        footerActionLink: "text-[#6961ff] font-bold hover:text-[#6961ff]/80 transition-all"
                                    }
                                }}
                                forceRedirectUrl="/auth-redirect"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Gradient Mesh */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#6961ff]/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[140px]"></div>
            </div>
        </div>
    );
};

export default LoginPage;
