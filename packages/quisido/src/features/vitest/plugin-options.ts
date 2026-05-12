import type { ViteUserConfig } from 'vitest/config';
import { IMPORT_CODE_WORKSPACE_PLUGIN } from './import-code-workspace-plugin.js';

export type PluginOptions = Required<ViteUserConfig>['plugins'];

export const PLUGIN_OPTIONS: PluginOptions = [
  // Vite 8's Plugin type (via Rolldown) causes TS2321 excessive stack depth
  // when TypeScript compares Plugin<any>[] to PluginOption[] directly.
  IMPORT_CODE_WORKSPACE_PLUGIN as unknown as PluginOptions[number],
];
