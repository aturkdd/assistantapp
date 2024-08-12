"use client";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Load translations directly
import enTranslations from './locales/en/translation.json';
import svTranslations from './locales/sv/translation.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'sv', // Default language
    fallbackLng: 'sv', // Fallback language
    resources: {
      en: {
        translation: enTranslations,
      },
      sv: {
        translation: svTranslations,
      },
    },
    react: {
      useSuspense: false, // Optional: set to false if using Suspense
    },
  });

export default i18n;
