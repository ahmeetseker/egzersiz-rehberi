// İngilizce çeviriler
const enTranslations = {
  common: {
    loading: 'Loading...',
    error: 'Error occurred',
    noResults: 'No results found',
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    viewDetails: 'View Details',
    addFavorite: 'Add to Favorites',
    removeFavorite: 'Remove from Favorites',
    appName: 'Exercise Guide',
    resetFilters: 'Reset Filters',
    searchRequired: 'Search term required',
    showFavorites: 'Show Favorites',
    favoritesShowing: 'Showing Favorites',
    viewAll: 'View All',
  },
  
  // Error messages from API
  errors: {
    loading: 'An error occurred while loading data',
    notFound: 'Record not found',
    missingId: 'Invalid or missing ID',
  },
  
  // Validation messages
  validation: {
    nameMaxLength: 'Name must be at most 50 characters',
    nameRequired: 'Name is required',
    validEmail: 'Please enter a valid email address',
    emailRequired: 'Email address is required',
    invalidFitnessLevel: 'Invalid fitness level',
    fitnessLevelRequired: 'Please select a fitness level',
  },

  // Authentication related errors
  auth: {
    errors: {
      loginFailed: 'Login failed. Please check your email or password.',
      registerFailed: 'Account creation failed. Please try again.',
      passwordMismatch: 'Passwords do not match.',
    }
  },

  // Footer translations
  footer: {
    subtitle: 'Your best guide for your personal fitness journey.',
    explore: 'Explore',
    account: 'Account',
    copyright: 'All rights reserved.',
  },

  // Profile page
  profile: {
    updateError: 'An error occurred while updating your profile.',
  },
  
  navbar: {
    home: 'Home',
    exercises: 'Exercises',
    favorites: 'Favorites',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    language: 'Language',
  },
  
  exercises: {
    // Body parts translations
    bodyParts: {
      'back': 'Back',
      'cardio': 'Cardio',
      'chest': 'Chest',
      'lower arms': 'Lower arms',
      'lower legs': 'Lower legs',
      'neck': 'Neck',
      'shoulders': 'Shoulders',
      'upper arms': 'Upper arms',
      'upper legs': 'Upper legs',
      'waist': 'Waist',
    },
    
    // Equipment translations
    equipment: {
      'assisted': 'Assisted',
      'band': 'Band',
      'barbell': 'Barbell',
      'body weight': 'Body weight',
      'bosu ball': 'Bosu ball',
      'cable': 'Cable',
      'dumbbell': 'Dumbbell',
      'elliptical machine': 'Elliptical machine',
      'ez barbell': 'EZ barbell',
      'hammer': 'Hammer',
      'kettlebell': 'Kettlebell',
      'leverage machine': 'Leverage machine',
      'medicine ball': 'Medicine ball',
      'olympic barbell': 'Olympic barbell',
      'resistance band': 'Resistance band',
      'roller': 'Roller',
      'rope': 'Rope',
      'skierg machine': 'Skierg machine',
      'sled machine': 'Sled machine',
      'smith machine': 'Smith machine',
      'stability ball': 'Stability ball',
      'stationary bike': 'Stationary bike',
      'stepmill machine': 'Stepmill machine',
      'tire': 'Tire',
      'trap bar': 'Trap bar',
      'upper body ergometer': 'Upper body ergometer',
      'weighted': 'Weighted',
      'wheel roller': 'Wheel roller',
    },
    
    // Target muscle groups translations
    targets: {
      'abductors': 'Abductors',
      'abs': 'Abs',
      'adductors': 'Adductors',
      'biceps': 'Biceps',
      'calves': 'Calves',
      'cardiovascular system': 'Cardiovascular system',
      'delts': 'Delts',
      'forearms': 'Forearms',
      'glutes': 'Glutes',
      'hamstrings': 'Hamstrings',
      'lats': 'Lats',
      'levator scapulae': 'Levator scapulae',
      'pectorals': 'Pectorals',
      'quads': 'Quads',
      'serratus anterior': 'Serratus anterior',
      'spine': 'Spine',
      'traps': 'Traps',
      'triceps': 'Triceps',
      'upper back': 'Upper back',
    },
    
    // Filters translations
    filters: {
      bodyPart: 'Body Part',
      equipment: 'Equipment',
      target: 'Target Muscle',
    },

    // Secondary muscles and instructions
    labels: {
      instructions: 'Instructions',
      secondaryMuscles: 'Secondary Muscles',
      howToPerform: 'How to Perform',
    },

    // Arama/Filtreleme
    search: 'Search Exercises',
    bodyPartSelect: 'Select Body Part',
    targetSelect: 'Select Target Muscle',
    equipmentSelect: 'Select Equipment',
    noResults: 'No results found',
    tryAgain: 'Try changing the filters and try again.',
    loading: 'Loading exercises...',
    library: 'Exercise Library',
    libraryDescription: 'Find exercises that match your goals and level up your fitness journey.',
  },
  
  // Pages translations
  pages: {
    home: {
      title: 'Exercise Guide',
      subtitle: 'Find the best exercises for your workout routine',
      startJourney: 'Start Your Personal Fitness Journey',
      journeyDescription: 'Create workout programs that match your goals, discover the exercise library, and track your fitness journey.',
      exploreExercises: 'Explore Exercises',
      meetExerciseGuide: 'Meet Exercise Guide',
      toolsDescription: 'We\'ve brought together all the tools you need to reach your fitness goals.',
      comprehensiveLibrary: 'Comprehensive Exercise Library',
      libraryDescription: '0+ exercises with specific movements for each muscle group',
      personalizedExperience: 'Personalized Experience',
      personalizedDescription: 'Create your own workout program and customize it to your fitness level',
    },
    exercises: {
      title: 'Exercises',
      searchPlaceholder: 'Search exercises...',
      filters: {
        bodyPart: 'Filter by Body Part',
        equipment: 'Filter by Equipment',
        target: 'Filter by Target Muscle',
      },
      search: 'Search Exercises',
      bodyPartFilter: 'Body Part',
      targetMuscleFilter: 'Target Muscle',
      equipmentFilter: 'Equipment',
    },

    auth: {
      login: {
        title: 'Login to your account',
        emailLabel: 'Email address',
        passwordLabel: 'Password',
        submitButton: 'Login',
        registerLink: 'Don\'t have an account? Register',
        rememberMe: 'Remember me',
        loggingIn: 'Logging in...',
        noAccount: 'Don\'t have an account?',
        registerNow: 'Register now',
        orDemo: 'Or login with a demo account',
        useDemo: 'Use Demo Account'
      },
      register: {
        title: 'Create a new account',
        nameLabel: 'Full name',
        emailLabel: 'Email address',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm password',
        fitnessLevelLabel: 'Fitness Level',
        submitButton: 'Register',
        loginLink: 'Already have an account? Login',
        haveAccount: 'Already have an account?',
        registering: 'Registering...',
      },
    },
    profile: {
      title: 'Profile',
      subtitle: 'Manage your account information and view your activities',
      updateSuccess: 'Your profile information was successfully updated.',
      tabs: {
        profileInfo: 'Profile Information',
        savedExercises: 'Saved Exercises',
      },
      form: {
        name: 'Name',
        email: 'Email',
        fitnessLevel: 'Fitness Level',
        saving: 'Saving...',
        saveChanges: 'Save Changes',
      },
      savedExercises: {
        title: 'My Saved Exercises',
        noExercises: 'You don\'t have any saved exercises yet.',
        exploreExercises: 'Explore Exercises',
      },
    },
    favorites: {
      title: 'My Favorite Exercises',
      description: 'You can easily access your saved exercises here.',
      loading: 'Loading your favorites...',
      noFavorites: 'You don\'t have any favorite exercises',
      addFavoritesHint: 'Click on the heart icon in exercise details to add them to your favorites.',
      browseExercises: 'Browse Exercises',
    },
  }
};

export default enTranslations;
