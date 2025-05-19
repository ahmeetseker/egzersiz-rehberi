import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useExercise } from '../../contexts/ExerciseContext';

function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getExerciseById, searchExercisesByName } = useExercise();
  // i18next çeviri hook'unu kullanıyoruz
  const { t } = useTranslation();

  // Egzersiz detay sorgusu
  const { 
    data: exercise, 
    isLoading: exerciseLoading, 
    error: exerciseError 
  } = useQuery({
    queryKey: ['exercise', id],
    queryFn: async () => {
      if (!id) {
        throw new Error(t('errors.missingId', 'Egzersiz ID\'si bulunamadı.'));
      }
      const foundExercise = await getExerciseById(id);
      if (!foundExercise) {
        throw new Error(t('errors.notFound', 'Egzersiz bulunamadı.'));
      }
      return foundExercise;
    },
    staleTime: 10 * 60 * 1000, // 10 dakika
    enabled: !!id,
  });

  // Benzer egzersizler sorgusu
  const {
    data: similarExercises = [],
    isLoading: similarExercisesLoading,
  } = useQuery({
    queryKey: ['similarExercises', exercise?.name],
    queryFn: async () => {
      if (!exercise || !exercise.name) return [];
      const searchTerm = exercise.name.split(' ')[0];
      const related = await searchExercisesByName(searchTerm);
      const filteredRelated = related.filter(ex => ex.id !== exercise.id).slice(0, 4);
      
      // Benzer egzersizlerin detaylarını önceden yükle (prefetch) 
      // Kullanıcı tıkladığında veriler zaten önbellekte olacak
      filteredRelated.forEach(ex => {
        queryClient.prefetchQuery({
          queryKey: ['exercise', ex.id],
          queryFn: () => getExerciseById(ex.id),
          staleTime: 10 * 60 * 1000, // 10 dakika
        });
      });
      
      return filteredRelated;
    },
    staleTime: 10 * 60 * 1000, // 10 dakika
    enabled: !!exercise?.name,
  });

  const isLoading = exerciseLoading || similarExercisesLoading;
  const error = exerciseError as Error | null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-zinc-600">{t('common.loading', 'Yükleniyor...')}</p>
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-zinc-800">
            {error ? error.message : t('common.error', 'Hata oluştu')}
          </h2>
          <p className="mt-2 text-zinc-600">
            {t('common.noResults', 'Sonuç bulunamadı')}
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/exercises')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('common.back', 'Geri')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 py-8">
      <div className="container mx-auto px-4">
        {/* Sayfa başlığı ve geri butonu */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/exercises')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t('common.back', 'Geri')}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Üst Kısım - GIF ve Temel Bilgiler */}
          <div className="md:flex">
            <div className="md:w-2/5 h-72 md:h-auto bg-zinc-200 relative flex justify-center items-center">
              {exercise.gifUrl ? (
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-indigo-100 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white text-xs font-medium px-2 py-1 rounded-full shadow">
                {t(`exercises.equipment.${exercise.equipment}`, exercise.equipment)}
              </div>
            </div>
            <div className="md:w-3/5 p-6">
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-zinc-800 mb-2">{exercise.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {t(`exercises.bodyParts.${exercise.bodyPart}`, exercise.bodyPart)}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {t(`exercises.targets.${exercise.target}`, exercise.target)}
                  </span>
                </div>
              </div>
              
              {/* Ekipman bilgisi */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-zinc-800 mb-2">
                  {t('exercises.filters.equipment', 'Ekipman')}
                </h3>
                <p className="text-zinc-700">{t(`exercises.equipment.${exercise.equipment}`, exercise.equipment)}</p>
              </div>
              
              {/* İkincil kaslar */}
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-2">
                    {t('exercises.labels.secondaryMuscles', 'İkincil Çalışan Kaslar')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondaryMuscles.map((muscle, index) => (
                      <span
                        key={index}
                        className="bg-zinc-100 text-zinc-700 text-sm px-3 py-1 rounded-full"
                      >
                        {t(`exercises.targets.${muscle}`, muscle)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alt Kısım - Talimatlar */}
          <div className="border-t border-zinc-200 p-6">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">
              {t('exercises.labels.instructions', 'Egzersiz Talimatları')}
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-zinc-700">
              {/* Önce çeviri dosyasındaki talimatları kontrol et, yoksa API'den gelen talimatları kullan */}
                {(t(`exercises.exerciseDetails.${exercise.id}.instructions`, { 
                returnObjects: true, 
                defaultValue: exercise.instructions 
                }) as string[]).map((instruction: string, index: number) => (
                <li key={index} className="pl-2">
                  {instruction}
                </li>
                ))}
            </ol>
          </div>
        </div>

        {/* Benzer egzersiz önerileri */}
        {similarExercises.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Benzer Egzersizler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarExercises.map((similarExercise) => (
                <div key={similarExercise.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-40 bg-zinc-200 relative overflow-hidden">
                    {similarExercise.gifUrl ? (
                      <img
                        src={similarExercise.gifUrl}
                        alt={similarExercise.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white text-xs font-medium px-2 py-1 rounded-full shadow">
                      {t(`exercises.equipment.${similarExercise.equipment}`, similarExercise.equipment)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-zinc-800 mb-1">{similarExercise.name}</h3>
                    <p className="text-zinc-600 text-sm mb-3">{t(`exercises.targets.${similarExercise.target}`, similarExercise.target)}</p>
                    <Link
                      to={`/exercises/${similarExercise.id}`}
                      className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition text-sm"
                    >
                      {t('common.viewDetails', 'Detayları Gör')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;