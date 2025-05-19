// Türkçe çeviriler
const trTranslations = {
  common: {
    loading: 'Yükleniyor...',
    error: 'Hata oluştu',
    noResults: 'Sonuç bulunamadı',
    search: 'Ara',
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    edit: 'Düzenle',
    back: 'Geri',
    viewDetails: 'Detayları Gör',
    addFavorite: 'Favorilere ekle',
    removeFavorite: 'Favorilerden çıkar',
    appName: 'Egzersiz Rehberi',
    resetFilters: 'Filtreleri Sıfırla',
    searchRequired: 'Arama terimi gerekli',
    showFavorites: 'Favorileri Göster',
    favoritesShowing: 'Favoriler Gösteriliyor',
    viewAll: 'Tümünü Gör',
  },
  

  
  // API'den gelen hata mesajları
  errors: {
    loading: 'Veri yüklenirken bir hata oluştu',
    notFound: 'İlgili kayıt bulunamadı',
    missingId: 'Geçersiz veya eksik ID',
  },
  
  // Doğrulama mesajları
  validation: {
    nameMaxLength: 'İsim en fazla 50 karakter olabilir',
    nameRequired: 'İsim gereklidir',
    validEmail: 'Geçerli bir e-posta adresi giriniz',
    emailRequired: 'E-posta adresi gereklidir',
    invalidFitnessLevel: 'Geçersiz fitness seviyesi',
    fitnessLevelRequired: 'Fitness seviyesi seçiniz',
  },

  // Kimlik doğrulama ile ilgili hatalar
  auth: {
    errors: {
      loginFailed: 'Giriş yapılamadı. E-posta veya şifrenizi kontrol edin.',
      registerFailed: 'Hesap oluşturulamadı. Lütfen tekrar deneyin.',
      passwordMismatch: 'Şifreler eşleşmiyor.',
    }
  },

  // Footer çevirileri
  footer: {
    subtitle: 'Kişisel fitness yolculuğunuz için en iyi rehberiniz.',
    explore: 'Keşfet',
    account: 'Hesap',
    copyright: 'Tüm hakları saklıdır.',
  },

  // Profil sayfası
  profile: {
    updateError: 'Profil güncellenirken bir hata oluştu.',
  },
  
  navbar: {
    home: 'Ana Sayfa',
    exercises: 'Egzersizler',
    favorites: 'Favoriler',
    profile: 'Profil',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    logout: 'Çıkış Yap',
    language: 'Dil',
  },
  
  // Sayfa çevirileri
  pages: {
    home: {
      title: 'Egzersiz Rehberi',
      subtitle: 'Antrenman rutininiz için en iyi egzersizleri bulun',
      startJourney: 'Kişisel Fitness Yolculuğunuzu Başlatın',
      journeyDescription: 'Egzersiz Rehberi ile hedeflerinize uygun antrenman programları oluşturun, egzersiz kütüphanesini keşfedin ve fitness yolculuğunuzu takip edin.',
      exploreExercises: 'Egzersizleri Keşfet',
      meetExerciseGuide: 'Egzersiz Rehberi ile Tanışın',
      toolsDescription: 'Fitness hedeflerinize ulaşmak için ihtiyacınız olan tüm araçları bir araya getirdik.',
      comprehensiveLibrary: 'Kapsamlı Egzersiz Kütüphanesi',
      libraryDescription: '0+ egzersiz ile her kas grubuna özel hareketler bulun',
      personalizedExperience: 'Kişiselleştirilmiş Deneyim',
      personalizedDescription: 'Kendi antrenman programınızı oluşturun ve fitness seviyenize göre özelleştirin',
    },
    exercises: {
      title: 'Egzersizler',
      searchPlaceholder: 'Egzersiz ara...',
      filters: {
        bodyPart: 'Vücut Bölgesine Göre Filtrele',
        equipment: 'Ekipmana Göre Filtrele',
        target: 'Hedef Kasa Göre Filtrele',
      },
      search: 'Egzersiz Ara',
      bodyPartFilter: 'Vücut Bölgesi',
      targetMuscleFilter: 'Hedef Kas',
      equipmentFilter: 'Ekipman',
    },

    auth: {
      login: {
        title: 'Giriş Yap',
        emailLabel: 'E-posta adresi',
        passwordLabel: 'Şifre',
        submitButton: 'Giriş Yap',
        registerLink: 'Hesabınız yok mu? Kayıt olun',
        rememberMe: 'Beni hatırla',
        loggingIn: 'Giriş yapılıyor...',
        noAccount: 'Hesabınız yok mu?',
        registerNow: 'Hemen üye olun',
        orDemo: 'Veya demo hesabı ile giriş yapın',
        useDemo: 'Demo Hesabını Kullan'
      },
      register: {
        title: 'Kayıt Ol',
        nameLabel: 'Ad Soyad',
        emailLabel: 'E-posta adresi',
        passwordLabel: 'Şifre',
        confirmPasswordLabel: 'Şifreyi Doğrula',
        fitnessLevelLabel: 'Fitness Seviyesi',
        submitButton: 'Kayıt Ol',
        loginLink: 'Zaten bir hesabınız var mı? Giriş yapın',
        haveAccount: 'Zaten bir hesabınız var mı?',
        registering: 'Kaydediliyor...',
      },
    },
    profile: {
      title: 'Profil',
      subtitle: 'Hesap bilgilerinizi yönetin ve aktivitelerinizi görüntüleyin',
      updateSuccess: 'Profil bilgileriniz başarıyla güncellendi.',
      tabs: {
        profileInfo: 'Profil Bilgileri',
        savedExercises: 'Kayıtlı Egzersizler',
      },
      form: {
        name: 'İsim',
        email: 'E-posta',
        fitnessLevel: 'Fitness Seviyesi',
        saving: 'Kaydediliyor...',
        saveChanges: 'Değişiklikleri Kaydet',
      },
      savedExercises: {
        title: 'Kayıtlı Egzersizlerim',
        noExercises: 'Henüz kaydedilmiş egzersiziniz bulunmuyor.',
        exploreExercises: 'Egzersizleri Keşfet',
      },
    },
    favorites: {
      title: 'Favori Egzersizlerim',
      description: 'Kaydettiğiniz egzersizlere buradan kolayca erişebilirsiniz.',
      loading: 'Favorileriniz yükleniyor...',
      noFavorites: 'Favori egzersiziniz bulunmuyor',
      addFavoritesHint: 'Egzersiz detaylarında kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.',
      browseExercises: 'Egzersizlere Göz At',
    },
  },
  exercises: {
  
    
  
    
    // Filtre çevirileri
    filters: {
      bodyPart: 'Vücut Bölgesi',
      equipment: 'Ekipman',
      target: 'Hedef Kas',
    },

    // İkincil kaslar ve talimatlar için etiketler
    labels: {
      instructions: 'Talimatlar',
      secondaryMuscles: 'İkincil Kaslar',
      howToPerform: 'Nasıl Yapılır',
    },
    
    // Arama/Filtreleme
    search: 'Egzersiz Ara',
    bodyPartSelect: 'Vücut Bölgesi Seçin',
    targetSelect: 'Hedef Kas Seçin',
    equipmentSelect: 'Ekipman Seçin',
    noResults: 'Sonuç bulunamadı',
    tryAgain: 'Filtreleri değiştirerek tekrar deneyiniz.',
    loading: 'Egzersizler yükleniyor...',
    library: 'Egzersiz Kütüphanesi',
    libraryDescription: 'Hedeflerinize uygun egzersizleri keşfedin ve fitness yolculuğunuzu bir üst seviyeye taşıyın.',
    

  },
};

export default trTranslations;
