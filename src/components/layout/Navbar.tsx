import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useExercise } from '../../contexts/ExerciseContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { favoriteExercises } = useExercise();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const location = useLocation();
  
  // Mobil menü için durum
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Aktif sayfa kontrolü
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Dil değiştirme fonksiyonu
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo ve Ana Menü */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                {t('pages.home.title', 'Egzersiz Rehberi')}
              </Link>
            </div>
            
            {/* Desktop Menü */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link 
                to="/exercises" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/exercises') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {t('navbar.exercises', 'Egzersizler')}
              </Link>
              {/* Favoriler sadece giriş yapan kullanıcılar için görünür */}
              {user && (
                <Link 
                  to="/favorites" 
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActive('/favorites') 
                      ? 'text-indigo-700 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{t('navbar.favorites', 'Favoriler')}</span>
                  {favoriteExercises.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoriteExercises.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Giriş yapılmışsa profil sayfası bağlantısını göster */}
              {user && (
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/profile') 
                      ? 'text-indigo-700 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {t('navbar.profile', 'Profilim')}
                </Link>
              )}
            </div>
          </div>
          
          {/* Sağ taraftaki işlemler */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Dil değiştirme butonu */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 mr-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
            >
              <span className="mr-1">{i18n.language === 'en' ? '🇬🇧' : '🇹🇷'}</span>
              <span>{i18n.language === 'en' ? 'EN' : 'TR'}</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 text-sm font-medium">
                  {currentLanguage === 'en' ? 'Hello' : 'Merhaba'}, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  {t('navbar.logout', 'Çıkış Yap')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  {t('navbar.login', 'Giriş Yap')}
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {t('navbar.register', 'Kayıt Ol')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobil menü butonu */}
          <div className="flex items-center sm:hidden">
            {/* Mobil dil değiştirme butonu */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50 mr-1"
            >
              {i18n.language === 'en' ? '🇬🇧' : '🇹🇷'}
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Menüyü aç</span>
              {/* Menü açık/kapalı ikonları */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      <div
        className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/exercises"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/exercises')
                ? 'text-indigo-700 bg-indigo-50'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('navbar.exercises', 'Egzersizler')}
          </Link>
          {user && (
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive('/favorites')
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
            <span>{t('navbar.favorites', 'Favoriler')}</span>
            {favoriteExercises.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favoriteExercises.length}
              </span>
            )}
          </Link>
          )}

          {user && (
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/profile')
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.profile', 'Profilim')}
            </Link>
          )}
          
          {/* Oturum İşlemleri */}
          {user ? (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-3 py-2 text-sm text-gray-700">
                {i18n.language === 'en' ? 'Logged in as' : 'Giriş yapıldı'}: <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {t('navbar.logout', 'Çıkış Yap')}
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navbar.login', 'Giriş Yap')}
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navbar.register', 'Kayıt Ol')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;