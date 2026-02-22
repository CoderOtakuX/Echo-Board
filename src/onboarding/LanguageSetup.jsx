import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Check, ArrowRight, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/clerk-react';

const LanguageSetup = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

    // Using Space Grotesk font as requested in the HTML (ensure it's imported in CSS)
    const fontFamily = '"Space Grotesk", sans-serif';

    const languages = [
        { code: 'en', flag: '🇺🇸', name: 'English' },
        { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
        { code: 'es', flag: '🇪🇸', name: 'Spanish' },
        { code: 'fr', flag: '🇫🇷', name: 'French' },
        { code: 'de', flag: '🇩🇪', name: 'German' },
        { code: 'zh', flag: '🇨🇳', name: 'Mandarin' },
        { code: 'ko', flag: '🇰🇷', name: 'Korean' },
        { code: 'it', flag: '🇮🇹', name: 'Italian' },
        { code: 'hi', flag: '🇮🇳', name: 'Hindi' },
    ];

    const handleLanguageChange = (code) => {
        setSelectedLang(code);
        i18n.changeLanguage(code);
    };

    const handleNext = async () => {
        try {
            // Persist language choice in Clerk metadata
            await user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    preferredLanguage: selectedLang
                }
            });
            navigate('/profile');
        } catch (error) {
            console.error("Failed to save language preference:", error);
            // Navigate anyway to not block the user
            navigate('/profile');
        }
    };

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121022] min-h-screen flex flex-col items-center justify-center p-4 selection:bg-[#2513ec] selection:text-white" style={{ fontFamily }}>
            {/* Main Container */}
            <div className="w-full max-w-[480px] flex flex-col gap-6 relative z-10">
                {/* Step Indicator */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Step 2 of 4</span>
                        <span className="text-[#2513ec] text-sm font-bold">50%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2513ec] w-1/2 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white dark:bg-[#1e1c2e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden flex flex-col">
                    {/* Header Section */}
                    <div className="p-8 pb-4 flex flex-col gap-4">
                        {/* Icon Badge */}
                        <div className="w-12 h-12 rounded-lg bg-[#2513ec]/10 flex items-center justify-center text-[#2513ec] mb-2">
                            <Globe size={30} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                                {t('nativeLanguageQuestion')}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed">
                                {t('customizeFeed')}
                            </p>
                        </div>
                    </div>

                    {/* Selection Grid */}
                    <div className="px-8 py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer group ${selectedLang === lang.code
                                        ? 'border-2 border-[#2513ec] bg-[#2513ec]/15 dark:bg-[#2513ec]/20 shadow-sm shadow-[#2513ec]/10'
                                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-[#2513ec]/50 dark:hover:border-[#2513ec]/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {selectedLang === lang.code && (
                                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#2513ec] rounded-full flex items-center justify-center">
                                            <Check size={10} className="text-white font-bold" strokeWidth={4} />
                                        </div>
                                    )}
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className={`text-sm ${selectedLang === lang.code ? 'font-bold text-[#2513ec] dark:text-white' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                                        {lang.name}
                                    </span>
                                </button>
                            ))}

                            {/* Option: Other */}
                            <button className="group relative flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-[#2513ec]/50 dark:hover:border-[#2513ec]/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
                                <Plus className="text-slate-400 group-hover:text-[#2513ec] transition-colors" size={24} />
                                <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">Other</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-8 pt-4 mt-auto">
                        <button
                            onClick={handleNext}
                            className="w-full flex items-center justify-center gap-2 bg-[#2513ec] hover:bg-[#2513ec]/90 text-white font-bold h-12 rounded-lg transition-all shadow-lg shadow-[#2513ec]/25 hover:shadow-[#2513ec]/40 active:scale-[0.98]"
                        >
                            <span>{t('letsGo')}</span>
                            <ArrowRight size={18} />
                        </button>
                        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
                            {t('changeLater')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2513ec]/20 dark:bg-[#2513ec]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 dark:bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default LanguageSetup;
