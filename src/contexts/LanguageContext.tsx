import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Supported languages in the app
const SUPPORTED_LANGUAGES = ['en', 'pt', 'fr', 'es', 'de', 'zh'];

// Get device language using react-native-localize
const getDeviceLanguage = (): string => {
  try {
    // Get the best available language from device locales
    const locales = RNLocalize.getLocales();
    console.log('Device locales:', locales);

    if (locales && locales.length > 0) {
      // Try to find a supported language from device locales
      for (const locale of locales) {
        const languageCode = locale.languageCode.toLowerCase();
        console.log('Checking language code:', languageCode);

        if (SUPPORTED_LANGUAGES.includes(languageCode)) {
          console.log('Selected language:', languageCode);
          return languageCode;
        }
      }
    }

    console.log('No supported language found, defaulting to English');
    return 'en';
  } catch (error) {
    console.log('Error detecting device language:', error);
    return 'en';
  }
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {i18n} = useTranslation();
  const [language, setLanguageState] = useState(i18n.language);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('app_language');
        if (savedLanguage) {
          // User has previously selected a language
          i18n.changeLanguage(savedLanguage);
          setLanguageState(savedLanguage);
        } else {
          // First time launch - detect device language
          const deviceLang = getDeviceLanguage();
          await AsyncStorage.setItem('app_language', deviceLang);
          i18n.changeLanguage(deviceLang);
          setLanguageState(deviceLang);
        }
      } catch (error) {
        console.log('Error loading saved language:', error);
      }
    };

    // Load saved language on app start
    loadSavedLanguage();
  }, [i18n]);

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      i18n.changeLanguage(lang);
      setLanguageState(lang);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
