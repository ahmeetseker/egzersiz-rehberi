// Egzersiz tipi tanımlaması
export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

// Kullanıcı tipi tanımlaması
export interface User {
  password: string;
  id: string;
  name: string;
  email: string;
  weight?: number;
  height?: number;
  goals?: string[];
}

// API yanıt tipleri
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Dil desteği için tip tanımlamaları
export type Language = 'en' | 'tr';

// Çeviri tipleri
export interface Translations {
  // Genel çeviriler
  common: {
    loading: string;
    error: string;
    noResults: string;
    search: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    viewDetails: string;
    addFavorite: string;
    removeFavorite: string;
  };
  
  // Navbar çevirileri
  navbar: {
    home: string;
    exercises: string;
    favorites: string;
    profile: string;
    login: string;
    register: string;
    logout: string;
    language: string;
  };
  
  // Egzersiz çevirileri (dinamik olarak id'ye göre saklanacak)
  exercises: {
    bodyParts: Record<string, string>; // key: ingilizce, value: çevirisi
    equipment: Record<string, string>;
    targets: Record<string, string>;
    exerciseNames?: Record<string, string>; // Egzersiz isimlerinin çevirileri
    secondaryMuscles?: Record<string, string>; // İkincil kas grupları çevirileri
    instructions?: Record<string, string>; // Egzersiz talimatları çevirileri
    // API filtreleri için çeviriler
    filters?: {
      bodyPart: string;
      equipment: string;
      target: string;
    };
  };
  
  // Sayfalar için çeviriler
  pages: {
    home: {
      title: string;
      subtitle: string;
    };
    exercises: {
      title: string;
      searchPlaceholder: string;
      filters: {
        bodyPart: string;
        equipment: string;
        target: string;
      };
      labels?: {
        instructions: string;
        secondaryMuscles: string;
        howToPerform: string;
      };
    };

    auth: {
      login: {
        title: string;
        emailLabel: string;
        passwordLabel: string;
        submitButton: string;
        registerLink: string;
      };
      register: {
        title: string;
        nameLabel: string;
        emailLabel: string;
        passwordLabel: string;
        fitnessLevelLabel: string;
        submitButton: string;
        loginLink: string;
      };
    };
  };
}