import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; 
import ExercisesPage from './pages/Exercises';
import ExerciseDetail from './pages/Exercises/ExerciseDetail';
import FavoritesPage from './pages/Favorites';
import ProfilePage from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { LanguageProvider } from './contexts/LanguageContext';

// QueryClient oluştur
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 dakika
      gcTime: 30 * 60 * 1000, // 30 dakika (eski cacheTime)
      refetchOnMount: false, // Bileşen monte edildiğinde yeniden sorgulamayı engelle
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ExerciseProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/exercises/:id" element={<ExerciseDetail />} />
                  {/* Korumalı sayfalar */}
                  <Route path="/favorites" element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<div className="container mx-auto py-20 text-center"><h1 className="text-3xl font-bold mb-4">Sayfa Bulunamadı</h1><p>Üzgünüz, aradığınız sayfa bulunamadı.</p></div>} />
                </Routes>
              </Layout>
            </Router>
          </ExerciseProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
