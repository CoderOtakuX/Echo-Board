import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon } from 'lucide-react';
import { Globe, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();

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

    const currentLangCode = (i18n.language || 'en').split('-')[0];

    const handleLanguageChange = async (langCode) => {
        try {
            console.log('[SettingsPage] Changing language to:', langCode);
            await i18n.changeLanguage(langCode);

            if (user) {
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        preferredLanguage: langCode
                    }
                });
                alert(t('settings_lang_updated', 'Language preference updated!'));
            }
        } catch (err) {
            console.error('[SettingsPage] Error changing language:', err);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#6C63FF]/10 p-3 rounded-xl text-[#6C63FF]">
                    <SettingsIcon size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{t('navSettings', 'Settings')}</h1>
                    <p className="text-slate-500">Manage your profile and preferences.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Language Section */}
                <div className="rounded-2xl border-2 border-black/5 p-6 bg-white dark:bg-[#1A1A24]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF]">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-xl font-bold">{t('settings_lang_title', 'Language Preferences')}</h2>
                    </div>

                    <p className="text-sm text-slate-500 mb-6">
                        Choose your primary language. The feed and UI will be tailored to your selection.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${currentLangCode === lang.code
                                        ? 'border-[#6C63FF] bg-[#6C63FF]/5 text-[#6C63FF]'
                                        : 'border-black/5 hover:border-black/10 dark:hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="font-bold">{lang.name}</span>
                                </div>
                                {currentLangCode === lang.code && <Check size={18} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Section (Clerk Integration Placeholder) */}
                <div className="rounded-2xl border-2 border-black/5 p-6 bg-white dark:bg-[#1A1A24] opacity-50">
                    <h2 className="text-xl font-bold mb-4">Account Security</h2>
                    <p className="text-sm text-slate-500">
                        Use the Clerk user button in the top right for security settings.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
