import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import type { Exercise } from '../../types';
import { useExercise } from '../../contexts/ExerciseContext';
import { useAuth } from '../../contexts/AuthContext';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { addToFavorites, removeFromFavorites, isExerciseFavorited, getExerciseById } = useExercise();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  
  const isFavorite = isExerciseFavorited(exercise.id);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(exercise.id);
    } else {
      addToFavorites(exercise.id);
    }
  };
  
  // Fare kartın üzerine geldiğinde egzersiz detaylarını önceden yükle
  const prefetchExerciseDetails = () => {
    queryClient.prefetchQuery({
      queryKey: ['exercise', exercise.id],
      queryFn: () => getExerciseById(exercise.id),
      staleTime: 10 * 60 * 1000, // 10 dakika
    });
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      onMouseEnter={prefetchExerciseDetails} // Fare üzerine geldiğinde detayları önceden yükle
    >
      <div className="h-48 bg-zinc-200 relative overflow-hidden">
        {exercise.gifUrl ? (
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white text-xs font-medium px-2 py-1 rounded-full shadow">
          {t(`exercises.equipment.${exercise.equipment}`, exercise.equipment)}
        </div>
        
        {/* Favori ikonu - sadece kullanıcı giriş yapmışsa göster */}
        {user && (
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 left-2 p-1 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-zinc-500 hover:text-red-500'
            }`}
            aria-label={isFavorite ? t('common.removeFavorite', 'Favorilerden çıkar') : t('common.addFavorite', 'Favorilere ekle')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isFavorite ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-zinc-800 mb-1">{exercise.name}</h3>
        <p className="text-zinc-600 text-sm mb-2">
          <span className="font-medium">{t('exercises.filters.target', 'Hedef')}: </span>
          {t(`exercises.targets.${exercise.target}`, exercise.target)}
        </p>
        <p className="text-zinc-600 text-sm mb-2">
          <span className="font-medium">{t('exercises.filters.bodyPart', 'Bölge')}: </span>
          {t(`exercises.bodyParts.${exercise.bodyPart}`, exercise.bodyPart)}
        </p>
        <div className="flex flex-col space-y-2">
          <Link
            to={`/exercises/${exercise.id}`}
            className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition"
          >
            {t('common.viewDetails', 'Detayları Gör')}
          </Link>
          
          {/* Favorilere ekle butonu - sadece giriş yapmış kullanıcılar için */}
          {user && (
            <button
              onClick={toggleFavorite}
              className={`flex items-center justify-center w-full py-2 rounded-md transition ${
                isFavorite 
                  ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isFavorite ? 0 : 2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {isFavorite ? t('common.removeFavorite', 'Favorilerden Çıkar') : t('common.addFavorite', 'Favorilere Ekle')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;