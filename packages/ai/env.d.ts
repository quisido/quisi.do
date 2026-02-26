/// <reference types="../worker-configuration.d.ts" />

declare module 'cloudflare:test' {
  interface ProvidedEnv extends Env {
    readonly ACCESS_TOKEN: string;
    readonly AI: Ai;
    readonly SENTRY_AUTH_TOKEN: string;
  }
}
