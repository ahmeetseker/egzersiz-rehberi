import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useExercise } from '../../contexts/ExerciseContext';
import ExerciseCard from '../../components/ui/ExerciseCard';
import type { Exercise } from '../../types/index';

const FavoritesPage = () => {
  const { t } = useTranslation();
  const { getFavoriteExercises, favoriteExercises } = useExercise();
  
  // Favori egzersizleri React Query ile çek
  const { 
    data: exercises = [], 
    isLoading, 
    refetch 
  } = useQuery({
    queryKey: ['favoriteExercises', favoriteExercises],
    queryFn: getFavoriteExercises,
  });
  
  // Favoriler değiştiğinde verileri yeniden çek
  useEffect(() => {
    refetch();
  }, [favoriteExercises, refetch]);

  return (
    <div className="bg-zinc-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">{t('pages.favorites.title', 'Favori Egzersizlerim')}</h1>
          <p className="text-zinc-600">
            {t('pages.favorites.description', 'Kaydettiğiniz egzersizlere buradan kolayca erişebilirsiniz.')}
          </p>
        </div>

        {/* Egzersiz Listesi */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
              <p className="text-zinc-600">{t('pages.favorites.loading', 'Favorileriniz yükleniyor...')}</p>
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-zinc-900">{t('pages.favorites.noFavorites', 'Favori egzersiziniz bulunmuyor')}</h3>
              <p className="mt-1 text-zinc-500">{t('pages.favorites.addFavoritesHint', 'Egzersiz detaylarında kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.')}</p>
              <div className="mt-6">
                <Link
                  to="/exercises"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {t('pages.favorites.browseExercises', 'Egzersizlere Göz At')}
                </Link>
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

export default FavoritesPage;