import type { ViteUserConfig } from 'vitest/config';
import { IMPORT_CODE_WORKSPACE_PLUGIN } from './import-code-workspace-plugin.js';

export type PluginOptions = Required<ViteUserConfig>['plugins'];

export const PLUGIN_OPTIONS: PluginOptions = [IMPORT_CODE_WORKSPACE_PLUGIN];
