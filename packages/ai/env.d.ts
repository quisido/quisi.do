declare module 'cloudflare:test' {
  import { type Ai } from '@cloudflare/ai';

  interface ProvidedEnv extends Env {
    readonly ACCESS_TOKEN: string;
    readonly AI: Ai;
    readonly SENTRY_AUTH_TOKEN: string;
  }
}
