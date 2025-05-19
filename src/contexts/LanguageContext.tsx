import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { translateExerciseData, translateExerciseList } from '../i18n/translation-helpers';
import type { Language } from '../types';

// Dil context'i için tip tanımlaması
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string, options?: any) => string;
  translateExerciseData: (exercise: any) => any;
  translateExerciseList: (exercises: any[]) => any[];
}

// Varsayılan değerler
const defaultLanguageContext: LanguageContextType = {
  language: 'en', // Varsayılan dil
  setLanguage: () => {}, 
  translate: (key) => key,
  translateExerciseData: (exercise) => exercise,
  translateExerciseList: (exercises) => exercises
};

// Context oluşturma
export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

// Context'i kullanmak için hook
export const useLanguage = () => useContext(LanguageContext);

// Props tipi
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component'i
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // react-i18next hook'unu kullanıyoruz
  const { t, i18n: i18nInstance } = useTranslation();
  
  // Dil değişimini işleme fonksiyonu
  const handleSetLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };
  
  // Mevcut dil
  const currentLanguage = i18nInstance.language as Language;
  
  // Context provider
  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        setLanguage: handleSetLanguage,
        translate: t,
        translateExerciseData,
        translateExerciseList
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};