import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const { t } = useTranslation();
  
  const [activeTab] = useState('profile');
  
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Form validasyonu için Formik kullanımı
  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, t('validation.nameMaxLength', 'İsim en fazla 50 karakter olabilir'))
        .required(t('validation.nameRequired', 'İsim gereklidir')),
      email: Yup.string()
        .email(t('validation.validEmail', 'Geçerli bir e-posta adresi giriniz'))
        .required(t('validation.emailRequired', 'E-posta adresi gereklidir')),
    }),
    onSubmit: async (values) => {
      try {
        setUpdateSuccess(false);
        setUpdateError(null);
        
        // Kullanıcı bilgilerini güncelle
        if (!user?.id) {
          throw new Error('User ID is required to update the profile.');
        }
        
        await updateUser({
          id: user.id,
          name: values.name,
          email: values.email,
          weight: user.weight,
          height: user.height,
          goals: user.goals,
          password: user.password, // Add the password from the existing user object
        });
        
        setUpdateSuccess(true);
        
        // Başarı mesajını 3 saniye sonra gizle
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } catch (error) {
        setUpdateError(t('profile.updateError', 'Profil güncellenirken bir hata oluştu.'));
      }
    },
  });

  // ProtectedRoute bileşeni sayesinde, oturum açmış kullanıcı garantili olarak buraya gelecek

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('pages.profile.title', 'Profil')}</h1>
          <p className="text-gray-600">{t('pages.profile.subtitle', 'Hesap bilgilerinizi yönetin ve aktivitelerinizi görüntüleyin')}</p>
        </div>

        {/* Profil Bilgileri Başlığı */}
        <div className="mb-6 border-b border-gray-200">
          <div className="py-3">
            <h2 className="font-medium text-lg text-indigo-600">
              {t('pages.profile.tabs.profileInfo', 'Profil Bilgileri')}
            </h2>
          </div>
        </div>

        {/* Profil Bilgileri İçeriği */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Güncelleme başarılı mesajı */}
            {updateSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {t('pages.profile.updateSuccess', 'Profil bilgileriniz başarıyla güncellendi.')}
              </div>
            )}

            {/* Hata mesajı */}
            {updateError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {updateError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('pages.profile.form.name', 'İsim')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('pages.profile.form.email', 'E-posta')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>

              {/* Fitness Level alanı kaldırıldı */}

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {formik.isSubmitting ? 
                    t('pages.profile.form.saving', 'Kaydediliyor...') : 
                    t('pages.profile.form.saveChanges', 'Değişiklikleri Kaydet')}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t('navbar.logout', 'Çıkış Yap')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;