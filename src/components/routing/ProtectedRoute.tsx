import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Korumalı sayfalar için bir bileşen.
 * Kullanıcının oturum durumu kontrol edilir ve eğer giriş yapmamışsa login sayfasına yönlendirilir.
 * Kullanıcı bilgisi yüklenirken bir yükleme göstergesi gösterir.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Kullanıcı bilgisi yükleniyorsa yükleme göstergesini göster
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Yükleme tamamlandı ve kullanıcı yok ise login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Yükleme tamamlandı ve kullanıcı var ise çocuk bileşenleri göster
  return <>{children}</>;
};

export default ProtectedRoute;
