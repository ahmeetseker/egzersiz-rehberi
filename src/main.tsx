import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// i18n konfigürasyonunu içe aktarıyoruz
import './i18n/i18n'

createRoot(document.getElementById('root')!).render(
    <App />

)
