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
  
  // Egzersiz talimatları için çeviriler
  exerciseInstructions: {
    // 3/4 sit-up talimatları
    '0001': [
      'Sırtınız yerde düz bir şekilde, dizleriniz bükülü ve ayaklarınız yere düz basacak şekilde yatın.',
      'Dirsekleriniz dışarıya doğru bakar şekilde ellerinizi başınızın arkasına yerleştirin.',
      'Karın kaslarınızı kullanarak, üst vücudunuzu yavaşça yerden kaldırın, gövdeniz 45 derecelik bir açıya gelene kadar öne doğru kıvrılın.',
      'En tepe noktada bir an durun, ardından üst vücudunuzu yavaşça başlangıç pozisyonuna geri indirin.',
      'İstenilen tekrar sayısı kadar devam edin.'
    ],
    
    // 45° side bend talimatları
    '0002': [
      'Ayaklarınız omuz genişliğinde açık ve kollarınız düz bir şekilde yanlarınızda durur vaziyette ayakta durun.',
      'Sırtınızı düz ve karın kaslarınızı çekili tutarak, gövdenizi yavaşça bir yana doğru eğin, elinizi dizinize doğru indirin.',
      'En alt noktada bir an durun, ardından yavaşça başlangıç pozisyonuna dönün.',
      'Diğer tarafa tekrarlayın.',
      'İstenilen tekrar sayısı kadar, her iki tarafı da değişimli olarak yapmaya devam edin.'
    ],
    
    // air bike talimatları
    '0003': [
      'Sırtınız yerde düz, elleriniz başınızın arkasında olacak şekilde yatın.',
      'Bacaklarınızı yerden kaldırın ve dizlerinizi 90 derecelik açı yapacak şekilde bükün.',
      'Sağ dirseğinizi sol dizinize doğru getirirken aynı anda sağ bacağınızı düzleştirin.',
      'Başlangıç pozisyonuna geri dönün ve hareketi diğer tarafta tekrarlayın, bu sefer sol dirseğinizi sağ dizinize doğru getirirken sol bacağınızı düzleştirin.',
      'Pedal çevirme hareketi ile her iki tarafı da değişimli olarak, istenilen tekrar sayısı kadar devam edin.'
    ],
    
    // barbell bench press talimatları
    '0004': [
      'Bench press sehpasına sırtınız düz bir şekilde yatın, ayaklarınız yere sağlam basmalı.',
      'Barı omuz genişliğinde veya biraz daha geniş bir tutuşla kavrayın.',
      'Barı rackten kaldırıp göğsünüzün üzerine getirin, bu başlangıç pozisyonudur.',
      'Nefes alın ve barı yavaşça göğsünüze indirin, dirseklerinizi vücudunuzdan yaklaşık 45 derece açıyla dışarı doğru tutun.',
      'Bar göğsünüze hafifçe dokunduktan sonra, nefes vererek barı başlangıç pozisyonuna geri itin.',
      'İstenilen tekrar sayısı kadar devam edin.'
    ],
    
    // dumbbell curl talimatları
    '0005': [
      'Her bir elinizde bir dumbbell ile ayaklarınız omuz genişliğinde açık olacak şekilde ayakta durun.',
      'Kollarınız vücudunuzun yanında düz, avuç içleriniz vücudunuza dönük olmalı.',
      'Üst kollarınızı sabit tutarak, dumbbell\'ı dirseğinizden bükerek yavaşça omzunuza doğru kaldırın.',
      'Biceps kasınız tamamen kasıldığında bir an durun, ardından dumbbellları yavaşça başlangıç pozisyonuna geri indirin.',
      'İstenilen tekrar sayısı kadar devam edin.'
    ],
    
    // lat pulldown talimatları
    '0006': [
      'Lat pulldown makinesine oturun, dizlerinizi pedlerin altına yerleştirerek sabitleyin.',
      'Bar\'ı omuz genişliğinden biraz daha geniş bir tutuşla kavrayın, avuç içleriniz öne bakmalı.',
      'Göğsünüzü öne çıkarın ve sırtınızı hafifçe arkaya doğru yatırın.',
      'Nefes alın ve ardından nefes vererek barı göğsünüze doğru çekin, dirseklerinizi aşağı ve geriye doğru hareket ettirin.',
      'Bar göğsünüzün üst kısmına yaklaştığında bir an durun.',
      'Nefes alırken barı kontrollü bir şekilde başlangıç pozisyonuna geri bırakın, kollarınızı tamamen uzatmayın.',
      'İstenilen tekrar sayısı kadar devam edin.'
    ],
    
    // leg press talimatları
    '0007': [
      'Leg press makinesine oturun, sırtınızı sehpaya yaslayın ve ayaklarınızı platformun üzerine omuz genişliğinde yerleştirin.',
      'Platformun kilidini açın ve dizlerinizi bükün, platformu kontrollü bir şekilde size doğru indirin.',
      'Dizlerinizi göğsünüze yaklaştırın, ancak dizlerinizin aşırı bükülmemesine dikkat edin.',
      'Ayaklarınızla platform üzerinden kuvvetle iterek bacaklarınızı düzleştirin, ancak dizlerinizi tamamen kilitlemeyin.',
      'Başlangıç pozisyonunda bir an durun, ardından platformu tekrar yavaşça indirin.',
      'İstenilen tekrar sayısı kadar devam edin.'
    ]
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
    // Vücut bölgeleri çevirileri
    bodyParts: {
      'back': 'Sırt',
      'cardio': 'Kardiyo',
      'chest': 'Göğüs',
      'lower arms': 'Alt kollar',
      'lower legs': 'Alt bacaklar',
      'neck': 'Boyun',
      'shoulders': 'Omuzlar',
      'upper arms': 'Üst kollar',
      'upper legs': 'Üst bacaklar',
      'waist': 'Bel',
    },
    
    // Ekipman çevirileri
    equipment: {
      'assisted': 'Destekli',
      'band': 'Band',
      'barbell': 'Halter',
      'body weight': 'Vücut ağırlığı',
      'bosu ball': 'Bosu topu',
      'cable': 'Kablo',
      'dumbbell': 'Dambıl',
      'elliptical machine': 'Eliptik makine',
      'ez barbell': 'EZ bar',
      'hammer': 'Çekiç',
      'kettlebell': 'Kettlebell',
      'leverage machine': 'Kaldıraç makinesi',
      'medicine ball': 'Sağlık topu',
      'olympic barbell': 'Olimpik bar',
      'resistance band': 'Direnç bandı',
      'roller': 'Rulo',
      'rope': 'İp',
      'skierg machine': 'Skierg makinesi',
      'sled machine': 'Kızak makinesi',
      'smith machine': 'Smith makinesi',
      'stability ball': 'Stabilite topu',
      'stationary bike': 'Sabit bisiklet',
      'stepmill machine': 'Stepper makinesi',
      'tire': 'Lastik',
      'trap bar': 'Trap bar',
      'upper body ergometer': 'Üst vücut ergometresi',
      'weighted': 'Ağırlıklı',
      'wheel roller': 'Tekerlek rulosu',
    },
    
    // Hedef kas grupları çevirileri
    targets: {
      'abductors': 'Abduktörler',
      'abs': 'Karın kasları',
      'adductors': 'Adduktörler',
      'biceps': 'Biseps',
      'calves': 'Baldırlar',
      'cardiovascular system': 'Kardiyovasküler sistem',
      'delts': 'Deltoidler',
      'forearms': 'Ön kollar',
      'glutes': 'Kalça kasları',
      'hamstrings': 'Arka uyluk kasları',
      'lats': 'Sırt kasları',
      'levator scapulae': 'Scapula levatörü',
      'pectorals': 'Göğüs kasları',
      'quads': 'Kuadriseps',
      'serratus anterior': 'Serratus anterior',
      'spine': 'Omurga',
      'traps': 'Trapez kasları',
      'triceps': 'Triseps',
      'upper back': 'Üst sırt',
    },
    
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
    
    // Egzersiz detayları
    exerciseDetails: {
      '0001': {
        name: '3/4 mekik',
        bodyPart: 'bel',
        equipment: 'vücut ağırlığı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri', 'alt sırt'],
        instructions: [
          'Sırt üstü yatın, dizlerinizi bükün ve ayaklarınızı yere düz basın.',
          'Ellerinizi başınızın arkasına koyun, dirsekleriniz dışa dönük olsun.',
          'Karın kaslarınızı kullanarak üst vücudunuzu yavaşça yerden kaldırın, gövdenizi 45 derece açıyla öne doğru kıvırın.',
          'Üst pozisyonda bir an duraklayın, sonra üst vücudunuzu yavaşça başlangıç pozisyonuna indirin.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      },
      '0002': {
        name: '45° yan eğilme',
        bodyPart: 'bel',
        equipment: 'vücut ağırlığı',
        target: 'karın kasları',
        secondaryMuscles: ['yan karın kasları'],
        instructions: [
          'Ayaklarınızı omuz genişliğinde açın, kollarınızı yanlarda düz şekilde aşağıda tutun.',
          'Sırtınızı düz tutarak ve karın kaslarınızı sıkıca tutarak gövdenizi yavaşça bir yana eğin, elinizi dizinize doğru indirin.',
          'Alt pozisyonda bir an duraklayın, sonra başlangıç pozisyonuna yavaşça dönün.',
          'Diğer taraf için tekrarlayın.',
          'İstenilen tekrar sayısına kadar sağ ve sol tarafları dönüşümlü yapın.'
        ]
      },
      '0003': {
        name: 'hava bisikleti',
        bodyPart: 'bel',
        equipment: 'vücut ağırlığı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri'],
        instructions: [
          'Sırt üstü yatın, ellerinizi başınızın arkasına koyun.',
          'Bacaklarınızı yerden kaldırın ve dizlerinizi 90 derece bükün.',
          'Sağ dirseğinizi sol dizinize doğru getirirken sağ bacağınızı düzleştirin.',
          'Başlangıç pozisyonuna dönün ve hareketi diğer taraf için tekrarlayın, sol dirseğinizi sağ dizinize getirirken sol bacağı düzleştirin.',
          'Bisiklet sürer gibi dönüşümlü hareketleri istenilen tekrar sayısına kadar yapın.'
        ]
      },
      '0006': {
        name: 'alternatif topuk dokunuşları',
        bodyPart: 'bel',
        equipment: 'vücut ağırlığı',
        target: 'karın kasları',
        secondaryMuscles: ['yan karın kasları'],
        instructions: [
          'Sırt üstü yatın, dizlerinizi bükün ve ayaklarınızı yere düz basın.',
          'Kollarınızı yere paralel şekilde yanlara açın.',
          'Karın kaslarınızı kullanarak omuzlarınızı yerden kaldırın ve sağ elinizle sağ topuğunuza dokunun.',
          'Başlangıç pozisyonuna dönün, sonra sol elinizle sol topuğunuza dokunun.',
          'İstenilen tekrar sayısına kadar sağ ve sol tarafları dönüşümlü yapın.'
        ]
      },
      '0007': {
        name: 'alternatif lateral pulldown',
        bodyPart: 'sırt',
        equipment: 'kablo',
        target: 'sırt kasları',
        secondaryMuscles: ['biseps', 'rhomboid kasları'],
        instructions: [
          'Kablo makinesine oturun, sırtınızı düz tutun ve ayaklarınızı yere basın.',
          'Tutuşlarınızı omuz genişliğinden biraz daha geniş, avuç içleri aşağı bakacak şekilde kavrayın.',
          'Sırtınızı biraz geriye yaslayarak tutacakları göğsünüze doğru çekin, kürek kemiklerinizi sıkıştırın.',
          'Hareketin zirvesinde kısa süre duraklayın, sonra tutacakları yavaşça başlangıç pozisyonuna bırakın.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      },
      '0009': {
        name: 'yardımlı göğüs dip (diz üstü)',
        bodyPart: 'göğüs',
        equipment: 'mekanik destekli makine',
        target: 'göğüs kasları',
        secondaryMuscles: ['triseps', 'omuz kasları'],
        instructions: [
          'Makinayı istediğiniz yüksekliğe ayarlayın ve dizlerinizi yastığa yerleştirin.',
          'Avuç içleriniz aşağı bakacak şekilde tutacakları kavrayın, kollarınızı tamamen açın.',
          'Dirseklerinizi bükerek vücudunuzu aşağı indirin, üst kollarınız yere paralel olana kadar.',
          'Bir an duraklayın, sonra başlangıç pozisyonuna kendinizi itin.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      },
      '0010': {
        name: 'yardımlı asılı diz çekme ve fırlatma',
        bodyPart: 'bel',
        equipment: 'yardımlı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri', 'alt sırt'],
        instructions: [
          'Bir barfiks çubuğundan elleriniz tamamen açık ve avuç içleriniz dışa bakacak şekilde asılın.',
          'Karın kaslarınızı sıkın ve dizlerinizi göğsünüze doğru kaldırın, bacaklarınızı bir arada tutun.',
          'Dizleriniz göğüs hizasına geldiğinde, bacaklarınızı hızlıca yere doğru fırlatın ve tamamen uzatın.',
          'Bacaklarınız tekrar yukarı doğru sallanmasına izin verin ve hareketi tekrarlayın.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      },
      '0011': {
        name: 'yardımlı asılı diz çekme',
        bodyPart: 'bel',
        equipment: 'yardımlı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri'],
        instructions: [
          'Bir barfiks çubuğundan elleriniz tamamen açık ve avuç içleriniz dışa bakacak şekilde asılın.',
          'Karın kaslarınızı kullanarak dizlerinizi göğsünüze doğru kaldırın, kalça ve dizlerden bükün.',
          'Hareketin üst noktasında karın kaslarınızı sıkarak bir an durun.',
          'Bacaklarınızı yavaşça başlangıç pozisyonuna indirin.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      },
      '0012': {
        name: 'yardımlı yan yatarken bacak kaldırma ve yan fırlatma',
        bodyPart: 'bel',
        equipment: 'yardımlı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri', 'yan karın kasları'],
        instructions: [
          'Sırt üstü yatın, bacaklarınızı düz uzatın ve kollarınızı yanlarda tutun.',
          'Destek için ellerinizi kalçanızın altına koyun.',
          'Karın kaslarınızı kullanarak bacaklarınızı yerden kaldırın, düz tutun.',
          'Bacaklarınızı birlikte tutarak bir tarafa doğru yere birkaç santim indirecek şekilde indirin.',
          'Bir an duraklayın, sonra bacaklarınızı başlangıç pozisyonuna kaldırın.',
          'Hareketi diğer tarafa tekrarlayın.',
          'İstenilen tekrar sayısı kadar sağ ve sol tarafları dönüşümlü yapın.'
        ]
      },
      '0013': {
        name: 'yardımlı yan yatarken bacak kaldırma ve fırlatma',
        bodyPart: 'bel',
        equipment: 'yardımlı',
        target: 'karın kasları',
        secondaryMuscles: ['kalça fleksörleri', 'kuadriseps'],
        instructions: [
          'Sırt üstü yatın, bacaklarınızı düz uzatın ve kollarınızı yanlarda tutun.',
          'Destek için ellerinizi kalçanızın altına koyun.',
          'Karın kaslarınızı kullanarak bacaklarınızı yerden kaldırın, düz tutun.',
          'Bacaklarınızı yere dik konuma kadar kaldırın.',
          'Bacaklarınızı başlangıç pozisyonuna indirin.',
          'Aynı anda bacaklarınızı yere doğru fırlatın, düz tutarak.',
          'Bacaklarınızı tekrar başlangıç pozisyonuna kaldırın.',
          'İstenilen tekrar sayısı kadar devam edin.'
        ]
      }
    },
  },
};

export default trTranslations;
