/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_WEATHER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Materialize CSS types
declare global {
  interface Window {
    M: {
      FormSelect: {
        init: (element: HTMLSelectElement, options?: any) => void;
      };
    };
  }
}
