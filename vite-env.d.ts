/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB: string
}

interface ImportMeta {
  readonly glob: (pattern: string, options?: { query?: string; import?: string; eager?: boolean }) => Record<string, any>
}

declare global {
  interface Window {
    __PAGE_ROUTE__?: string;
  }
}

// Déclarations de types pour les imports de fichiers média
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.webp';
declare module '*.mp4';
declare module '*.webm';
