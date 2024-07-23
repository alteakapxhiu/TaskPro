import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/translations/en.json';
import fr from '../i18n/translations/fr.json';
import al from '../i18n/translations/al.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  al: {
    translation: al,
  },
};

i18next
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'al', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources,
  });

export default i18next;
