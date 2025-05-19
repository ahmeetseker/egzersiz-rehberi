import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Exercise } from '../types/index';
import { exerciseApi } from '../services/api';
import { useAuth } from './AuthContext';
import { translateExerciseData } from '../i18n/translation-helpers';

// Context için tip tanımlaması
interface ExerciseContextType {
  // Egzersiz durumları
  exercises: Exercise[];
  exercisesLoading: boolean;
  fetchExercises: (params?: { limit?: string; offset?: string }) => Promise<Exercise[]>;
  getExerciseById: (id: string) => Promise<Exercise | undefined>;
  getExercisesByBodyPart: (bodyPart: string) => Promise<Exercise[]>;
  getExercisesByTarget: (target: string) => Promise<Exercise[]>;
  getExercisesByEquipment: (equipment: string) => Promise<Exercise[]>;
  searchExercisesByName: (name: string) => Promise<Exercise[]>;

  // Egzersiz listeleri ve filtreler
  bodyParts: string[];
  targets: string[];
  equipmentList: string[];
  loadingFilters: boolean;
  fetchFiltersData: () => Promise<{
    bodyParts: string[];
    targets: string[];
    equipment: string[];
  }>;
  
  // Favoriler işlevselliği
  favoriteExercises: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isExerciseFavorited: (id: string) => boolean;
  getFavoriteExercises: () => Promise<Exercise[]>;
  clearFavorites: () => void;
}

// localStorage'da favori egzersizler için kullanılacak anahtar temel ismi
const FAVORITE_EXERCISES_KEY_BASE = 'exercise-guide-favorites';

// Kullanıcı ID'sine göre favori anahtarı oluşturma
const getFavoriteKeyForUser = (userId?: string): string => {
  return userId ? `${FAVORITE_EXERCISES_KEY_BASE}-${userId}` : FAVORITE_EXERCISES_KEY_BASE;
};

// Context'i oluştur
const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// Context Provider bileşeni
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  // React Query Client'i kullanarak önbellek yönetimine erişim sağla
  const queryClient = useQueryClient();
  
  // Auth context'ten kullanıcı bilgilerini al
  const { user } = useAuth();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState<boolean>(false);

  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const [equipmentList, setEquipmentList] = useState<string[]>([]);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  
  // Kullanıcı ID'sini al
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  
  // Favori egzersizlerin ID listesi
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);

  // Kullanıcı değiştiğinde kullanıcı ID'sini güncelle
  useEffect(() => {
    if (user) {
      setCurrentUserId(user.id);
    } else {
      setCurrentUserId(undefined);
    }
  }, [user]);

  // Favori egzersizleri localStorage'dan yükle
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const key = getFavoriteKeyForUser(currentUserId);
        const favoritesStr = localStorage.getItem(key);
        
        if (favoritesStr) {
          const favorites: string[] = JSON.parse(favoritesStr);
          setFavoriteExercises(favorites);
        } else {
          setFavoriteExercises([]);
        }
      } catch (error) {
        // localStorage hatası durumunda, favorileri sıfırla
        setFavoriteExercises([]);
        console.error('Favoriler yüklenirken hata oluştu:', error);
      }
    };
    
    loadFavorites();
  }, [currentUserId]);

  // Favorileri localStorage'a kaydet
  useEffect(() => {
    if (favoriteExercises.length > 0 || currentUserId) {
      try {
        const key = getFavoriteKeyForUser(currentUserId);
        localStorage.setItem(key, JSON.stringify(favoriteExercises));
      } catch (error) {
        console.error('Favoriler kaydedilirken hata oluştu:', error);
      }
    }
  }, [favoriteExercises, currentUserId]);
  
  // Filtreleri yükle (vücut bölgeleri, hedef kaslar, ekipmanlar)
  const fetchFiltersData = async () => {
    setLoadingFilters(true);
    
    try {
      const bodyPartsResponse = await exerciseApi.getAllBodyParts();
      const targetsResponse = await exerciseApi.getAllTargets();
      const equipmentResponse = await exerciseApi.getAllEquipment();
      
      if (bodyPartsResponse.success && bodyPartsResponse.data) {
        setBodyParts(bodyPartsResponse.data);
      }
      
      if (targetsResponse.success && targetsResponse.data) {
        setTargets(targetsResponse.data);
      }
      
      if (equipmentResponse.success && equipmentResponse.data) {
        setEquipmentList(equipmentResponse.data);
      }
      
      return {
        bodyParts: bodyPartsResponse.data || [],
        targets: targetsResponse.data || [],
        equipment: equipmentResponse.data || []
      };
    } catch (error) {
      console.error('Filtreleri alırken hata oluştu:', error);
      return {
        bodyParts: [],
        targets: [],
        equipment: []
      };
    } finally {
      setLoadingFilters(false);
    }
  };

  // Tüm egzersizleri getir
  const fetchExercises = async (params?: { limit?: string; offset?: string }): Promise<Exercise[]> => {
    const queryKey = ['exercises', params];
    
    try {
      setExercisesLoading(true);
      
      const cachedExercises = queryClient.getQueryData<Exercise[]>(queryKey);
      if (cachedExercises) {
        setExercises(cachedExercises);
        return cachedExercises;
      }
      
      const response = await exerciseApi.getAll(params);
      
      if (response.success && response.data) {
        // Egzersiz verilerini çeviri için işle
        const translatedExercises = response.data.map(exercise => translateExerciseData(exercise));
        
        setExercises(translatedExercises);
        queryClient.setQueryData(queryKey, translatedExercises);
        
        return translatedExercises;
      }
      
      return [];
    } catch (error) {
      console.error('Egzersizleri alırken hata oluştu:', error);
      return [];
    } finally {
      setExercisesLoading(false);
    }
  };

  // ID'ye göre egzersiz getir
  const getExerciseById = async (id: string): Promise<Exercise | undefined> => {
    const queryKey = ['exercise', id];
    
    try {
      const cachedExercise = queryClient.getQueryData<Exercise>(queryKey);
      if (cachedExercise) {
        return cachedExercise;
      }
      
      const response = await exerciseApi.getById(id);
      
      if (response.success && response.data) {
        const translatedExercise = translateExerciseData(response.data);
        queryClient.setQueryData(queryKey, translatedExercise);
        return translatedExercise;
      }
      
      return undefined;
    } catch (error) {
      console.error(`Egzersiz (${id}) alınırken hata oluştu:`, error);
      return undefined;
    }
  };

  // Vücut bölgesine göre egzersizleri getir
  const getExercisesByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
    const queryKey = ['exercises', 'bodyPart', bodyPart];
    
    try {
      const cachedExercises = queryClient.getQueryData<Exercise[]>(queryKey);
      if (cachedExercises) {
        return cachedExercises;
      }
      
      const response = await exerciseApi.getByBodyPart(bodyPart);
      
      if (response.success && response.data) {
        const translatedExercises = response.data.map(exercise => translateExerciseData(exercise));
        queryClient.setQueryData(queryKey, translatedExercises);
        return translatedExercises;
      }
      
      return [];
    } catch (error) {
      console.error(`Vücut bölgesine (${bodyPart}) göre egzersizleri alırken hata oluştu:`, error);
      return [];
    }
  };

  // Hedef kasa göre egzersizleri getir
  const getExercisesByTarget = async (target: string): Promise<Exercise[]> => {
    const queryKey = ['exercises', 'target', target];
    
    try {
      const cachedExercises = queryClient.getQueryData<Exercise[]>(queryKey);
      if (cachedExercises) {
        return cachedExercises;
      }
      
      const response = await exerciseApi.getByTarget(target);
      
      if (response.success && response.data) {
        const translatedExercises = response.data.map(exercise => translateExerciseData(exercise));
        queryClient.setQueryData(queryKey, translatedExercises);
        return translatedExercises;
      }
      
      return [];
    } catch (error) {
      console.error(`Hedef kasa (${target}) göre egzersizleri alırken hata oluştu:`, error);
      return [];
    }
  };

  // Ekipman türüne göre egzersizleri getir
  const getExercisesByEquipment = async (equipment: string): Promise<Exercise[]> => {
    const queryKey = ['exercises', 'equipment', equipment];
    
    try {
      const cachedExercises = queryClient.getQueryData<Exercise[]>(queryKey);
      if (cachedExercises) {
        return cachedExercises;
      }
      
      const response = await exerciseApi.getByEquipment(equipment);
      
      if (response.success && response.data) {
        const translatedExercises = response.data.map(exercise => translateExerciseData(exercise));
        queryClient.setQueryData(queryKey, translatedExercises);
        return translatedExercises;
      }
      
      return [];
    } catch (error) {
      console.error(`Ekipman türüne (${equipment}) göre egzersizleri alırken hata oluştu:`, error);
      return [];
    }
  };

  // İsme göre egzersizleri ara
  const searchExercisesByName = async (name: string): Promise<Exercise[]> => {
    if (!name || name.trim() === '') {
      return [];
    }
    
    const queryKey = ['exercises', 'name', name];
    
    try {
      const cachedExercises = queryClient.getQueryData<Exercise[]>(queryKey);
      if (cachedExercises) {
        return cachedExercises;
      }
      
      const response = await exerciseApi.searchByName(name);
      
      if (response.success && response.data) {
        const translatedExercises = response.data.map(exercise => translateExerciseData(exercise));
        queryClient.setQueryData(queryKey, translatedExercises);
        return translatedExercises;
      }
      
      return [];
    } catch (error) {
      console.error(`İsme (${name}) göre egzersizleri ararken hata oluştu:`, error);
      return [];
    }
  };
  
  // Favori işlevleri
  const addToFavorites = (id: string) => {
    if (!favoriteExercises.includes(id)) {
      setFavoriteExercises(prevFavorites => [...prevFavorites, id]);
    }
  };
  
  const removeFromFavorites = (id: string) => {
    setFavoriteExercises(prevFavorites => prevFavorites.filter(favId => favId !== id));
  };
  
  const isExerciseFavorited = (id: string): boolean => {
    return favoriteExercises.includes(id);
  };
  
  const getFavoriteExercises = async (): Promise<Exercise[]> => {
    try {
      const exercisePromises = favoriteExercises.map(id => getExerciseById(id));
      const exercises = await Promise.all(exercisePromises);
      
      // undefined değerleri filtrele
      return exercises.filter(Boolean) as Exercise[];
    } catch (error) {
      console.error('Favori egzersizler yüklenirken bir hata oluştu:', error);
      return [];
    }
  };
  
  // Tüm favorileri temizle
  const clearFavorites = () => {
    setFavoriteExercises([]);
  };

  // Provider değerlerini tanımla
  const value = {
    exercises,
    exercisesLoading,
    fetchExercises,
    getExerciseById,
    getExercisesByBodyPart,
    getExercisesByTarget,
    getExercisesByEquipment,
    searchExercisesByName,

    bodyParts,
    targets,
    equipmentList,
    loadingFilters,
    fetchFiltersData,
    
    // Favori fonksiyonları
    favoriteExercises,
    addToFavorites,
    removeFromFavorites,
    isExerciseFavorited,
    getFavoriteExercises,
    clearFavorites
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Custom hook - context'i kullanmak için
export const useExercise = () => {
  const context = useContext(ExerciseContext);
  
  if (context === undefined) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  
  return context;
};
