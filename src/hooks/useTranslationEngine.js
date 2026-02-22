import { useState, useCallback } from 'react';

// Simple in-memory cache to prevent redundant API calls during a session
const translationCache = new Map();

export function useTranslationEngine() {
    const [isTranslating, setIsTranslating] = useState(false);

    const translate = useCallback(async (text, sourceLang, targetLang) => {
        if (!text || !targetLang) return text;

        const sourceBase = sourceLang ? sourceLang.split('-')[0].toLowerCase() : '';
        const targetBase = targetLang.split('-')[0].toLowerCase();

        // If source and target are the same base language, no need to translate
        if (sourceBase && sourceBase === targetBase) return text;

        const cacheKey = `${text.substring(0, 100)}_${sourceBase}_${targetBase}`;
        if (translationCache.has(cacheKey)) {
            return translationCache.get(cacheKey);
        }

        setIsTranslating(true);
        try {
            // Try MyMemory Translation API first
            const langpair = sourceBase ? `${sourceBase}|${targetBase}` : `Autodetect|${targetBase}`;
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=${langpair}`;

            console.log('[TranslationEngine] Calling API:', { sourceBase, targetBase, textLen: text.length });
            const response = await fetch(url);
            const data = await response.json();

            console.log('[TranslationEngine] API Response:', { status: data.responseStatus, hasText: !!data.responseData?.translatedText });

            if (data.responseStatus === 200 && data.responseData?.translatedText) {
                const result = data.responseData.translatedText;

                // MyMemory sometimes returns "MYMEMORY WARNING" or the same text back - detect this
                if (result && !result.startsWith('MYMEMORY WARNING') && result !== text) {
                    translationCache.set(cacheKey, result);
                    return result;
                } else {
                    console.warn('[TranslationEngine] API returned warning or same text, falling back');
                }
            } else {
                console.warn('[TranslationEngine] Non-200 status:', data.responseStatus, data.responseDetails);
            }

            // Fallback: try LibreTranslate (free public instance)
            try {
                console.log('[TranslationEngine] Trying LibreTranslate fallback...');
                const libreResp = await fetch('https://libretranslate.com/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: text.substring(0, 500),
                        source: sourceBase || 'auto',
                        target: targetBase,
                    }),
                });
                const libreData = await libreResp.json();
                if (libreData.translatedText) {
                    translationCache.set(cacheKey, libreData.translatedText);
                    return libreData.translatedText;
                }
            } catch (libreErr) {
                console.warn('[TranslationEngine] LibreTranslate also failed:', libreErr.message);
            }

            // Fallback: try Lingva Translate (another free API)
            try {
                console.log('[TranslationEngine] Trying Lingva fallback...');
                const src = sourceBase || 'auto';
                const lingvaUrl = `https://lingva.ml/api/v1/${src}/${targetBase}/${encodeURIComponent(text.substring(0, 500))}`;
                const lingvaResp = await fetch(lingvaUrl);
                const lingvaData = await lingvaResp.json();
                if (lingvaData.translation) {
                    translationCache.set(cacheKey, lingvaData.translation);
                    return lingvaData.translation;
                }
            } catch (lingvaErr) {
                console.warn('[TranslationEngine] Lingva also failed:', lingvaErr.message);
            }

            console.error('[TranslationEngine] All translation APIs failed for:', { sourceBase, targetBase });
            return text; // Final fallback to original text

        } catch (error) {
            console.error('[TranslationEngine] Fetch Error:', error);
            return text;
        } finally {
            setIsTranslating(false);
        }
    }, []);

    return { translate, isTranslating };
}
