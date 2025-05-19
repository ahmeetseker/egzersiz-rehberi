import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  isLoading?: boolean;
}

// Validation schema
const SearchSchema = Yup.object().shape({
  searchTerm: Yup.string()
    .min(2, 'Arama terimi çok kısa!')
    .max(50, 'Arama terimi çok uzun!')
    .required('Arama terimi gerekli')
});

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  return (
    <Formik
      initialValues={{ searchTerm: '' }}
      validationSchema={SearchSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSearch(values.searchTerm);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-full">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Field
                name="searchTerm"
                type="text"
                className={`w-full px-3 py-2 border rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.searchTerm && touched.searchTerm ? 'border-red-500' : 'border-zinc-300'
                }`}
                placeholder="Egzersiz adı ara..."
                disabled={isSubmitting || isLoading}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md shadow-sm disabled:opacity-70"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  'Ara'
                )}
              </button>
            </div>
            <ErrorMessage
              name="searchTerm"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;