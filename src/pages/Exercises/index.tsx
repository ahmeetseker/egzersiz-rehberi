import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useExercise } from '../../contexts/ExerciseContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchForm from '../../components/ui/SearchForm';
import ExerciseCard from '../../components/ui/ExerciseCard';
import type { Exercise } from '../../types/index';

const ExercisesPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { 
    getExercisesByBodyPart, 
    getExercisesByTarget,
    getExercisesByEquipment,
    searchExercisesByName,
    bodyParts,
    targets,
    equipmentList,
    fetchFiltersData,
    getFavoriteExercises,
  } = useExercise();
  
  // Metin normalleştirme fonksiyonu - Türkçe ve İngilizce karakterler için
  // Tüm filtreleme işlemlerinde kullanılacak
  const normalizeText = (text: string): string => {
    if (!text) return '';
    
    // Sadece küçük harfe dönüştür, boşlukları ve özel karakterleri koru
    return text.toLowerCase();
  };
  
  // Eşleşme kontrolü için yardımcı fonksiyon
  const isMatchingText = (sourceText: string, targetText: string): boolean => {
    // Daha esnek eşleşme - birinin diğerini içerip içermediğini kontrol et
    const normalizedSource = normalizeText(sourceText);
    const normalizedTarget = normalizeText(targetText);
    
    return normalizedSource.includes(normalizedTarget) || 
           normalizedTarget.includes(normalizedSource);
  };
  
  // States
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  
  // Egzersiz data ve filtre durumlarını almak için useQuery
  const { isLoading: isLoadingFilters } = useQuery({
    queryKey: ['filtersData'],
    queryFn: fetchFiltersData,
    staleTime: 5 * 60 * 1000 // 5 dakika boyunca veriyi tazelemeden kullan
  });
  
  // Exercises Query
  const { data: exercises = [], isLoading: isLoadingExercises, refetch } = useQuery({
    queryKey: ['exercises', selectedBodyPart, selectedTarget, selectedEquipment, searchQuery, showFavorites],
    queryFn: async () => {
      try {
        // Filtreleme işlemi başlangıcı
        
        // Favorileri göster
        if (showFavorites) {
          return await getFavoriteExercises();
        }
        
        // Arama çalıştır
        if (searchQuery && searchQuery.trim().length > 0) {
          return await searchExercisesByName(searchQuery.trim());
        }
        
        // İlk yükleme durumunda ve hiçbir filtre yoksa, önce önbellekte veri kontrolü yap
        if (!selectedBodyPart && !selectedTarget && !selectedEquipment) {
          const defaultQueryKey = ['exercises', 'all', '10', '0'];
          const cachedExercises = queryClient.getQueryData<Exercise[]>(defaultQueryKey);
          if (cachedExercises && cachedExercises.length > 0) {
            return cachedExercises;
          }
          
          // Önbellekte yoksa varsayılan olarak 'back' egzersizlerini getir
          return await getExercisesByBodyPart('back');
        }
        
        let results: Exercise[] = [];
        
        // STRATEJI:
        // 1. Tüm filtre kombinasyonlarını ele alalım
        // 2. Her kombinasyon için en uygun API çağrısını yapalım
        // 3. Sonra gerekirse client-side filtreleme uygulayalım
        
        // DURUM 1: Üçü de seçili (bodyPart + target + equipment)
        if (selectedBodyPart && selectedTarget && selectedEquipment) {
          // BodyPart ile başlayıp diğerlerini client-side filtreleyelim
          results = await getExercisesByBodyPart(selectedBodyPart);
          
          // Target filtresi uygula - Türkçe karakter desteğiyle
          results = results.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.target, selectedTarget);
          });
          
          // Equipment filtresi uygula - Esnek eşleştirme kullan
          results = results.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.equipment, selectedEquipment);
          });
        } 
        
        // DURUM 2: Sadece bodyPart ve target seçili
        else if (selectedBodyPart && selectedTarget && !selectedEquipment) {
          // BodyPart ile başlayalım
          results = await getExercisesByBodyPart(selectedBodyPart);
          
          // Target filtresi uygula - Türkçe karakter desteğiyle
          results = results.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.target, selectedTarget);
          });
        }
        
        // DURUM 3: Sadece bodyPart ve equipment seçili
        else if (selectedBodyPart && !selectedTarget && selectedEquipment) {
          // BodyPart ile başlayalım
          results = await getExercisesByBodyPart(selectedBodyPart);
          
          // ESNEK EŞLEŞTİRME: Tam eşleme yerine daha esnek bir yaklaşım kullan
          results = results.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.equipment, selectedEquipment);
          });
        }
        
        // DURUM 4: Sadece target ve equipment seçili
        else if (!selectedBodyPart && selectedTarget && selectedEquipment) {
          // Target ile başlayalım
          results = await getExercisesByTarget(selectedTarget);
          
          // Equipment filtresi uygula - Esnek eşleştirme kullan
          results = results.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.equipment, selectedEquipment);
          });
        }
        
        // DURUM 5: Sadece bodyPart seçili
        else if (selectedBodyPart && !selectedTarget && !selectedEquipment) {
          results = await getExercisesByBodyPart(selectedBodyPart);
        }
        
        // DURUM 6: Sadece target seçili
        else if (!selectedBodyPart && selectedTarget && !selectedEquipment) {
          results = await getExercisesByTarget(selectedTarget);
        }
        
        // DURUM 7: Sadece equipment seçili
        else if (!selectedBodyPart && !selectedTarget && selectedEquipment) {
          // API çağrısında orijinal parametreyi kullanma, tüm egzersizler arasından filtreleme yapalım
          // API'nin kendi filtrelemesi yerine daha esnek bir filtreleme uygulayalım
          const allExercises = await getExercisesByEquipment("body weight"); // En yaygın ekipman türü ile başla
          
          results = allExercises.filter(ex => {
            // isMatchingText fonksiyonunu kullan (zaten bileşenin üstünde tanımlı)
            return isMatchingText(ex.equipment, selectedEquipment);
          });
        }
        
        return results;
        
      } catch (error) {
        return [];
      }
    },
    staleTime: 1 * 60 * 1000, // 1 dakika boyunca veriyi tazelemeden kullan
  });
  
  // Filtreleme işleyicileri
  const handleBodyPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBodyPart(value);
    // Eğer boş bir değer seçildiyse, mevcut seçimi kaldır
    if (!value) {
      setSelectedBodyPart('');
    }
    setSearchQuery('');
    setShowFavorites(false);
  };
  
  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTarget(value);
    // Eğer boş bir değer seçildiyse, mevcut seçimi kaldır
    if (!value) {
      setSelectedTarget('');
    }
    setSearchQuery('');
    setShowFavorites(false);
  };
  
  const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedEquipment(value);
    // Eğer boş bir değer seçildiyse, mevcut seçimi kaldır
    if (!value) {
      setSelectedEquipment('');
    }
    setSearchQuery('');
    setShowFavorites(false);
  };
  
  const handleSearch = (searchTerm: string) => {
    // Eğer search terimi varsa, filtreleri sıfırla
    if (searchTerm) {
      setSelectedBodyPart('');
      setSelectedTarget('');
      setSelectedEquipment('');
      setShowFavorites(false);
    }
    setSearchQuery(searchTerm);
  };
  
  const toggleFavorites = () => {
    // Kullanıcı giriş yapmamışsa hiçbir işlem yapma
    if (!user) return;
    
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    if (newShowFavorites) {
      // Favorileri görüntülerken diğer filtreleri temizle
      setSelectedBodyPart('');
      setSelectedTarget('');
      setSelectedEquipment('');
      setSearchQuery('');
    }
  };
  
  // Filtreleri sıfırlama
  const resetFilters = () => {
    setSelectedBodyPart('');
    setSelectedTarget('');
    setSelectedEquipment('');
    setSearchQuery('');
    setShowFavorites(false);
    refetch();
  };
  
  // Yükleniyor durumu
  const isLoading = isLoadingExercises || isLoadingFilters;

  return (
    <div className="bg-zinc-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">{t('exercises.library', 'Egzersiz Kütüphanesi')}</h1>
          <p className="text-zinc-600">
            {t('exercises.libraryDescription', 'Hedeflerinize uygun egzersizleri keşfedin ve fitness yolculuğunuzu bir üst seviyeye taşıyın.')}
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Arama kutusu */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-zinc-700 mb-1">
                {t('exercises.search', 'Egzersiz Ara')}
              </label>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* Vücut bölgesi filtresi */}
            <div>
              <label htmlFor="bodyPart" className="block text-sm font-medium text-zinc-700 mb-1">
                {t('exercises.filters.bodyPart', 'Vücut Bölgesi')}
              </label>
              <select
                id="bodyPart"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedBodyPart}
                onChange={handleBodyPartChange}
                disabled={isLoading}
              >
                <option value="">{t('exercises.bodyPartSelect', 'Vücut Bölgesi Seçin')}</option>
                {bodyParts && bodyParts.map((part: string) => (
                  <option key={part} value={part}>
                    {t(`exercises.bodyParts.${part}`, part)}
                  </option>
                ))}
              </select>
            </div>

            {/* Hedef kas filtresi */}
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-zinc-700 mb-1">
                {t('exercises.filters.target', 'Hedef Kas')}
              </label>
              <select
                id="target"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedTarget}
                onChange={handleTargetChange}
                disabled={isLoading}
              >
                <option value="">{t('exercises.targetSelect', 'Hedef Kas Seçin')}</option>
                {targets && targets.map((target: string) => (
                  <option key={target} value={target}>
                    {t(`exercises.targets.${target}`, target)}
                  </option>
                ))}
              </select>
            </div>

            {/* Ekipman filtresi */}
            <div>
              <label htmlFor="equipment" className="block text-sm font-medium text-zinc-700 mb-1">
                {t('exercises.filters.equipment', 'Ekipman')}
              </label>
              <select
                id="equipment"
                className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedEquipment}
                onChange={handleEquipmentChange}
                disabled={isLoading}
              >
                <option value="">{t('exercises.equipmentSelect', 'Ekipman Seçin')}</option>
                {equipmentList && equipmentList.map((equipment: string) => (
                  <option key={equipment} value={equipment}>
                    {t(`exercises.equipment.${equipment}`, equipment)}
                  </option>
                ))}
              </select>
            </div>

            {/* Favoriler butonu */}
            <div className="flex items-end">
              {user && (
                <button
                  onClick={toggleFavorites}
                  className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                    showFavorites 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                  }`}
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill={showFavorites ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={showFavorites ? 0 : 2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {showFavorites ? t('common.favoritesShowing', 'Favorileri Gösteriliyor') : t('common.showFavorites', 'Favorileri Göster')}
                </button>
              )}
            </div>
          </div>

          {/* Filtre sıfırlama butonu */}
          {(selectedBodyPart || selectedTarget || selectedEquipment || searchQuery || (user && showFavorites)) && (
            <div className="mt-4 text-right">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-500"
                disabled={isLoading}
              >
                {t('common.resetFilters', 'Filtreleri Sıfırla')}
              </button>
            </div>
          )}
        </div>

        {/* Egzersiz Listesi */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
              <p className="text-zinc-600">{t('exercises.loading', 'Egzersizler yükleniyor...')}</p>
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-zinc-900">{t('exercises.noResults', 'Sonuç bulunamadı')}</h3>
              <p className="mt-1 text-zinc-500">{t('exercises.tryAgain', 'Filtreleri değiştirerek tekrar deneyiniz.')}</p>
              <div className="mt-6">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {t('common.resetFilters', 'Filtreleri Sıfırla')}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exercises.map((exercise: Exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;