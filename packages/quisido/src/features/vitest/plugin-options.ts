import type { Plugin } from 'vite';
import { IMPORT_CODE_WORKSPACE_PLUGIN } from './import-code-workspace-plugin.js';

export type PluginOptions = readonly Plugin[];

export const PLUGIN_OPTIONS: PluginOptions = [IMPORT_CODE_WORKSPACE_PLUGIN];
