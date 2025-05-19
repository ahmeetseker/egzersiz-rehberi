import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/index';
import { userApi } from '../services/api';

// Context için tip tanımlaması
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: User) => Promise<{ success: boolean; error?: string }>;
}

// Context'i oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Uygulama başladığında mevcut kullanıcıyı kontrol et
  useEffect(() => {
    const checkLoggedInUser = async () => {
      setLoading(true);
      const response = userApi.getCurrentUser();
      
      if (response.success && response.data) {
        setUser(response.data);
      }
      
      setLoading(false);
    };

    checkLoggedInUser();
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = userApi.login(email, password);
    
    if (response.success && response.data) {
      setUser(response.data);
    }
    
    setLoading(false);
    return {
      success: response.success,
      error: response.error
    };
  };

  // Kayıt fonksiyonu
  const register = async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    const response = userApi.register(userData);
    
    if (response.success && response.data) {
      setUser(response.data);
    }
    
    setLoading(false);
    return {
      success: response.success,
      error: response.error
    };
  };

  // Çıkış fonksiyonu
  const logout = () => {
    // NOT: Favorileri silmiyoruz, bu şekilde kalıcı olabilmeleri için
    
    userApi.logout();
    setUser(null);
  };

  // Kullanıcı bilgilerini güncelle
  const updateUser = async (userData: User) => {
    setLoading(true);
    const response = userApi.updateProfile(userData);
    
    if (response.success && response.data) {
      setUser(response.data);
    }
    
    setLoading(false);
    return {
      success: response.success,
      error: response.error
    };
  };

  // Provider değerlerini tanımla
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook - context'i kullanmak için
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};