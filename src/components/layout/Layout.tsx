import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-semibold mb-2">{t('common.appName', 'Egzersiz Rehberi')}</h2>
              <p className="text-gray-400 text-sm">
                {t('footer.subtitle', 'Kişisel fitness yolculuğunuz için en iyi rehberiniz.')}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider">{t('footer.explore', 'Keşfet')}</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/exercises" className="text-gray-400 hover:text-white text-sm">
                      {t('navbar.exercises', 'Egzersizler')}
                    </a>
                  </li>

                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider">{t('footer.account', 'Hesap')}</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/profile" className="text-gray-400 hover:text-white text-sm">
                      {t('navbar.profile', 'Profilim')}
                    </a>
                  </li>
                  {!user && (
                    <>
                      <li>
                        <a href="/login" className="text-gray-400 hover:text-white text-sm">
                          {t('navbar.login', 'Giriş Yap')}
                        </a>
                      </li>
                      <li>
                        <a href="/register" className="text-gray-400 hover:text-white text-sm">
                          {t('navbar.register', 'Kayıt Ol')}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {t('common.appName', 'Egzersiz Rehberi')}. {t('footer.copyright', 'Tüm hakları saklıdır.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;