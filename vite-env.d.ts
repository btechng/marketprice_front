/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_OTHER_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
