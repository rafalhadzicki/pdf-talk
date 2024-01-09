import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './assets/i18n/en.json';
import translationPL from './assets/i18n/pl.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    pl: {
      translation: translationPL,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});
