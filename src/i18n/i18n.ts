import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './translations/en';
import trTranslations from './translations/tr';

// Kaynaklar (dil çevirileri)
const resources = {
  en: {
    translation: enTranslations
  },
  tr: {
    translation: trTranslations
  }
};

i18n
  // Dil tespiti için eklenti
  .use(LanguageDetector)
  // React ile i18next'i entegre etme
  .use(initReactI18next)
  // i18next yapılandırması
  .init({
    resources,
    fallbackLng: 'en', // Çeviri bulunamazsa varsayılan dil
    interpolation: {
      escapeValue: false // XSS koruması gerekmez, React zaten kendi korumasını sunuyor
    },
    detection: {
      order: ['localStorage', 'navigator'], // Dil tespiti öncelik sırası
      lookupLocalStorage: 'preferredLanguage', // localStorage'daki anahtar ismi
      caches: ['localStorage']
    }
  });

export default i18n;
