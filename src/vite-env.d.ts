/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAPID_API_KEY: string
  readonly VITE_RAPID_API_HOST: string
  readonly VITE_EXERCISE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
