import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query'; 
import { useAuth } from '../../contexts/AuthContext';
import { useExercise } from '../../contexts/ExerciseContext';
import type { Exercise } from '../../types';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { fetchExercises } = useExercise();
  
  // Egzersizleri getir - önbellekten alacak veya varsa yeni istek yapmayacak
  const { data: exercises = [] } = useQuery<Exercise[], Error>({
    queryKey: ['exercises', 'all', '10', '0'],
    queryFn: async () => {
      const result = await fetchExercises({ limit: '10', offset: '0' });
      return result || [];
    },
    staleTime: Infinity, // Veriyi hiç tazelemeden süresiz olarak önbellekten kullan
    gcTime: 24 * 60 * 60 * 1000, // 24 saat süreyle önbellekte tut
    refetchOnMount: false, // Bileşen monte edildiğinde yeniden sorgulamayı engelle
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden sorgulamayı engelle
  });
  
  return (
    <div className="bg-gray-50">
      {/* Hero Bölümü */}
      <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pages.home.startJourney', 'Kişisel Fitness Yolculuğunuzu Başlatın')}
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {t('pages.home.journeyDescription', 'Egzersiz Rehberi ile hedeflerinize uygun antrenman programları oluşturun, egzersiz kütüphanesini keşfedin ve fitness yolculuğunuzu takip edin.')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/exercises"
                className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-gray-100 transition"
              >
                {t('pages.home.exploreExercises', 'Egzersizleri Keşfet')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tanıtım Bölümü */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pages.home.meetExerciseGuide', 'Egzersiz Rehberi ile Tanışın')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('pages.home.toolsDescription', 'Fitness hedeflerinize ulaşmak için ihtiyacınız olan tüm araçları bir araya getirdik.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Özellik 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pages.home.comprehensiveLibrary', 'Kapsamlı Egzersiz Kütüphanesi')}</h3>
              <p className="text-gray-600">
                {exercises.length}+ {t('pages.home.libraryDescription', 'egzersiz ile her kas grubuna özel hareketler bulun')}
              </p>
            </div>
            

            
            {/* Özellik 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('pages.home.personalizedExperience', 'Kişiselleştirilmiş Deneyim')}</h3>
              <p className="text-gray-600">
                {t('pages.home.personalizedDescription', 'Kendi antrenman programınızı oluşturun ve fitness seviyenize göre özelleştirin')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popüler Egzersizler */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('pages.exercises.title', 'Popüler Egzersizler')}</h2>
            <Link to="/exercises" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              {t('common.viewAll', 'Tümünü Gör')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exercises.slice(0, 4).map(exercise => (
              <Link key={exercise.id} to={`/exercises/${exercise.id}`} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-40 bg-gray-200 relative">
                  {exercise.gifUrl ? (
                    <img
                      src={exercise.gifUrl}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">{exercise.name}</h3>
                  <p className="text-sm text-gray-600">{exercise.target}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      

      
      {/* Kayıt/Giriş CTA */}
      {!user && (
        <section className="bg-indigo-600 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">{t('pages.auth.register.title', 'Fitness Yolculuğunuza Hemen Başlayın')}</h2>
              <p className="text-lg mb-8 opacity-90">
                {t('pages.auth.register.description', 'Ücretsiz hesap oluşturarak tüm özelliklerimizden yararlanmaya başlayın. Egzersizleri kaydedin, programlar oluşturun ve ilerlemenizi takip edin.')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-gray-100 transition"
                >
                  {t('pages.auth.register.submitButton', 'Ücretsiz Kayıt Ol')}
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-400 transition border border-indigo-300"
                >
                  {t('pages.auth.login.submitButton', 'Giriş Yap')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;