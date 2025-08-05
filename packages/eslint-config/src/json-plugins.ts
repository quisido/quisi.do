import type { ESLint } from 'eslint';
import jsonPlugin from '@eslint/json';

export const JSON_PLUGINS: Record<string, ESLint.Plugin> = {
  ...jsonPlugin.configs.recommended.plugins,
  json: jsonPlugin,
};
