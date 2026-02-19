import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Mail, Lock, EyeOff, Eye } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/onboarding/start');
    };

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
                {/* Mobile Logo */}
                <div className="absolute top-6 left-6 md:hidden">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 rounded-lg bg-[#6961ff] flex items-center justify-center">
                            <Activity className="text-white" size={20} />
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">EchoBoard</h2>
                    </div>
                </div>

                {/* Auth Card */}
                <div className="w-full max-w-[480px] bg-white dark:bg-[#1A1A24] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#2A2A3A] overflow-hidden transition-all duration-300">
                    {/* Card Header */}
                    <div className="p-8 pb-2">
                        <div className="flex items-center justify-between mb-8">
                            {/* Logo */}
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <div className="size-8 rounded-lg bg-gradient-to-br from-[#6961ff] to-violet-600 flex items-center justify-center shadow-lg shadow-[#6961ff]/25">
                                    <Activity className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight">EchoBoard</h2>
                            </div>
                            {/* Step Indicator */}
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                <span>Step 1 of 2</span>
                                <div className="flex gap-1 items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#6961ff] ring-4 ring-[#6961ff]/20"></div>
                                    <div className="w-8 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Join EchoBoard</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Connect with the world, in any language.</p>
                        </div>
                    </div>

                    {/* Social Auth Buttons */}
                    <div className="px-8 py-4 space-y-3">
                        <button className="group w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-slate-100 dark:bg-[#111118] border border-slate-200 dark:border-[#2A2A3A] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-[0.98]">
                            <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZEF5pgRgVKh2vWru9KKKvi9I8MuCV2M_fwAVlh4Dn6dhnFm915B6o_1PwPiEydoGE8OGnJZ3g81FUaUucEy2mDks66kwZqzWKdHSxZeOXbKVny0XBBgudv5mZv0Zl_t0KLDzGTlyKE1jykeVaaruRTMtIFUFU72bAOtjEPiAknq0h4YfwSHXW28qKtxxqN-l2IW2nVViBfjO8y4Mcu8CSiwNK7scXQGK6K2qK_QgmzUj4lkxd9E72-wX5cvjTn432IAMPgNKZ4Svf" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Continue with Google</span>
                        </button>
                        <button className="group w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-slate-100 dark:bg-[#111118] border border-slate-200 dark:border-[#2A2A3A] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-[0.98]">
                            <svg aria-hidden="true" className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path></svg>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Continue with GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative px-8 py-2">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center px-8">
                            <div className="w-full border-t border-slate-200 dark:border-[#2A2A3A]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-[#1A1A24] px-3 text-slate-500 dark:text-slate-400 font-medium">or continue with email</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form className="p-8 pt-4 space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="text-slate-400" size={20} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl border-slate-200 dark:border-[#2A2A3A] bg-slate-50 dark:bg-[#111118] py-3 pl-10 pr-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#6961ff] focus:ring-1 focus:ring-[#6961ff] sm:text-sm sm:leading-6 transition-colors shadow-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="text-slate-400" size={20} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-xl border-slate-200 dark:border-[#2A2A3A] bg-slate-50 dark:bg-[#111118] py-3 pl-10 pr-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#6961ff] focus:ring-1 focus:ring-[#6961ff] sm:text-sm sm:leading-6 transition-colors shadow-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-300 focus:outline-none"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                            {/* Password Strength Indicator */}
                            <div className="flex gap-1 pt-1 h-1">
                                <div className="w-1/4 h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <div className="w-1/4 h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <div className="w-1/4 h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <div className="w-1/4 h-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-xl bg-[#6961ff] px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6961ff]/30 hover:bg-[#6961ff]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6961ff] transition-all active:scale-[0.99]"
                            >
                                Create Account
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight size={18} className="font-bold" />
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Card Footer */}
                    <div className="bg-slate-50 dark:bg-[#15151e] px-8 py-4 border-t border-slate-200 dark:border-[#2A2A3A]">
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                            Already have an account? <a href="#" className="font-semibold leading-6 text-[#6961ff] hover:text-[#6961ff]/80 transition-colors">Log in</a>
                        </p>
                    </div>
                </div>

                {/* Terms Footer */}
                <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600 max-w-sm">
                    By clicking "Create Account", you agree to our <a href="#" className="underline hover:text-slate-500 dark:hover:text-slate-400">Terms of Service</a> and <a href="#" className="underline hover:text-slate-500 dark:hover:text-slate-400">Privacy Policy</a>.
                </p>
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
