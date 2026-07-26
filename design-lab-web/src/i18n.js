import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your language files
import en from "./locales/en/translations.json";
import ge from "./locales/ge/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ge: {
      translation: ge,
    },
  },
  lng: `${localStorage.getItem('language') || 'ge' }`, // Default language
  fallbackLng: "en", // Fallback language
//   interpolation: {
//     escapeValue: false, // Not needed for React as it escapes by default
//   },
});

export default i18n;
