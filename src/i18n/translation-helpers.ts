import i18n from './i18n';

// Artık lazy-loading kullanmıyoruz, talimatlar tr.ts içerisinde

// Dil değişikliklerini izle
i18n.on('languageChanged', () => {
  // Dil değiştiğinde yapılması gereken işlemler buraya gelebilir
});

import type { Exercise } from '../types';

// Egzersiz verileri için çeviriler
export const translateExerciseData = (exercise: Exercise): Exercise => {
  if (!exercise) return exercise;

  // Dil Türkçe ve bu egzersiz için çevirilmiş talimatlar varsa
  const currentLang = i18n.language;
  let translatedInstructions = exercise.instructions;
  
  if (currentLang === 'tr' && exercise.id) {
    // tr.ts içindeki exerciseInstructions içerisinden talimatları çek
    const exerciseId = exercise.id;
    const trInstructions = i18n.t(`exerciseInstructions.${exerciseId}`, { returnObjects: true });
    
    // Eğer talimatlar bulunduysa ve bir dizi ise kullan
    if (trInstructions && Array.isArray(trInstructions)) {
      translatedInstructions = trInstructions.map(instruction => 
        typeof instruction === 'string' ? instruction : String(instruction)
      );
    }
  }

  return {
    ...exercise,
    // Aşağıdaki alanları doğrudan i18n namespace'inden çeviriyoruz
    // Eğer çeviri bulunamazsa varsayılan değeri kullanır (exercise.bodyPart gibi)
    bodyPart: i18n.t(`exercises.bodyParts.${exercise.bodyPart}`, { defaultValue: exercise.bodyPart }),
    equipment: i18n.t(`exercises.equipment.${exercise.equipment}`, { defaultValue: exercise.equipment }),
    target: i18n.t(`exercises.targets.${exercise.target}`, { defaultValue: exercise.target }),
    
    // İkincil kasları çeviriyoruz
    secondaryMuscles: exercise.secondaryMuscles.map((muscle: string) => 
      i18n.t(`exercises.targets.${muscle}`, { defaultValue: muscle })
    ),
    
    // Çevirilen talimatları kullanıyoruz
    instructions: translatedInstructions
  };
};

// Egzersiz listesi için çeviri fonksiyonu
export const translateExerciseList = (exercises: Exercise[]) => {
  if (!exercises || !Array.isArray(exercises)) return [];
  return exercises.map(exercise => translateExerciseData(exercise)).filter(Boolean) as Exercise[];
};
