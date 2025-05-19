import type { Exercise, User, ApiResponse } from '../types/index';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// API yapılandırması
const API_CONFIG = {
  rapidApiKey: import.meta.env.VITE_RAPID_API_KEY || '',
  rapidApiHost: import.meta.env.VITE_RAPID_API_HOST || 'exercisedb.p.rapidapi.com',
  exerciseBaseUrl: import.meta.env.VITE_EXERCISE_BASE_URL || 'https://exercisedb.p.rapidapi.com'
};

// localStorage'da kullanılacak anahtarlar
const STORAGE_KEYS = {
  USERS: 'exercise-guide-users',
  CURRENT_USER: 'exercise-guide-current-user',
  FAVORITES: 'exercise-guide-favorites',
};

// localStorage'dan veri alma yardımcı fonksiyonu
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

// localStorage'a veri kaydetme yardımcı fonksiyonu
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Hata durumunda işlem yapılmıyor
  }
};

// API çağrısı yapmak için yardımcı fonksiyon
const makeApiRequest = async (url: string, params: Record<string, any> = {}) => {
  try {
    const options = {
      method: 'GET',
      url,
      params,
      headers: {
        'X-RapidAPI-Key': API_CONFIG.rapidApiKey,
        'X-RapidAPI-Host': API_CONFIG.rapidApiHost
      }
    };

    const response = await axios.request(options);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'API isteği başarısız oldu. Lütfen daha sonra tekrar deneyin.' };
  }
};

// Egzersiz API fonksiyonları
export const exerciseApi = {
  // Tüm egzersizleri getir
  getAll: async (params?: { limit?: string; offset?: string }): Promise<ApiResponse<Exercise[]>> => {
    const queryParams = {
      limit: params?.limit || '10',
      offset: params?.offset || '0'
    };
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises`, queryParams);
  },

  // ID'ye göre egzersiz getir
  getById: async (id: string): Promise<ApiResponse<Exercise>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/exercise/${id}`);
  },

  // Vücut bölgesine göre egzersizleri getir
  getByBodyPart: async (bodyPart: string): Promise<ApiResponse<Exercise[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/bodyPart/${bodyPart}`);
  },

  // Hedef kasa göre egzersizleri getir
  getByTarget: async (target: string): Promise<ApiResponse<Exercise[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/target/${target}`);
  },

  // Ekipman türüne göre egzersizleri getir
  getByEquipment: async (equipment: string): Promise<ApiResponse<Exercise[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/equipment/${equipment}`);
  },

  // Egzersiz adına göre arama
  searchByName: async (name: string): Promise<ApiResponse<Exercise[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/name/${name}`);
  },
  
  // Tüm vücut bölgelerini getir
  getAllBodyParts: async (): Promise<ApiResponse<string[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/bodyPartList`);
  },
  
  // Tüm hedef kasları getir
  getAllTargets: async (): Promise<ApiResponse<string[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/targetList`);
  },
  
  // Tüm ekipman türlerini getir
  getAllEquipment: async (): Promise<ApiResponse<string[]>> => {
    return await makeApiRequest(`${API_CONFIG.exerciseBaseUrl}/exercises/equipmentList`);
  }
};

// Kullanıcı API fonksiyonları
export const userApi = {
  // Giriş yapma
  login: (email: string, password: string): ApiResponse<User> => {
    try {
      // Not: Gerçek bir uygulamada burada parola doğrulama yapılacaktır
      // Bu demo için email ve şifre ile kullanıcı buluyoruz
      const users = getFromStorage<User>(STORAGE_KEYS.USERS);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Kullanıcı bulunamadı veya şifre hatalı.' };
      }
      
      // Kullanıcı bilgilerini session'da saklayalım
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: 'Giriş yapılırken bir hata oluştu.' };
    }
  },
  
  // Çıkış yapma
  logout: (): ApiResponse<void> => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Çıkış yapılırken bir hata oluştu.' };
    }
  },
  
  // Kayıt olma
  register: (user: Omit<User, 'id'>): ApiResponse<User> => {
    try {
      const users = getFromStorage<User>(STORAGE_KEYS.USERS);
      
      // Email adresi zaten kullanılıyor mu kontrol et
      const existingUser = users.find(u => u.email === user.email);
      if (existingUser) {
        return { success: false, error: 'Bu email adresi zaten kullanılıyor.' };
      }
      
      const newUser = { ...user, id: uuidv4() };
      users.push(newUser);
      
      saveToStorage(STORAGE_KEYS.USERS, users);
      
      // Kullanıcıyı otomatik olarak giriş yaptır
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
      
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: 'Kayıt olurken bir hata oluştu.' };
    }
  },
  
  // Mevcut kullanıcıyı getir
  getCurrentUser: (): ApiResponse<User | null> => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      
      if (!user) {
        return { success: true, data: null };
      }
      
      return { success: true, data: JSON.parse(user) };
    } catch (error) {
      return { success: false, error: 'Kullanıcı bilgisi alınırken bir hata oluştu.' };
    }
  },
  
  // Kullanıcı profilini güncelle
  updateProfile: (user: User): ApiResponse<User> => {
    try {
      const users = getFromStorage<User>(STORAGE_KEYS.USERS);
      const index = users.findIndex(u => u.id === user.id);
      
      if (index === -1) {
        return { success: false, error: 'Kullanıcı bulunamadı.' };
      }
      
      users[index] = user;
      saveToStorage(STORAGE_KEYS.USERS, users);
      
      // Eğer giriş yapmış kullanıcıyı güncelliyorsak, session'ı da güncelle
      const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        if (parsedUser.id === user.id) {
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        }
      }
      
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: 'Profil güncellenirken bir hata oluştu.' };
    }
  }
};
