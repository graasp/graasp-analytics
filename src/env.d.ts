/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_VERSION: string;
  readonly VITE_GRAASP_DOMAIN: string;
  readonly VITE_GRAASP_API_HOST?: string;
  readonly VITE_GRAASP_AUTH_HOST?: string;
  readonly VITE_GRAASP_PLAYER_HOST?: string;
  readonly VITE_GRAASP_LIBRARY_HOST?: string;
  readonly VITE_GRAASP_BUILDER_HOST?: string;
  readonly VITE_SENTRY_ENV: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
