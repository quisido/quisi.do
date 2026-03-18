import type { Plugin } from 'vite';

export const IMPORT_CODE_WORKSPACE_PLUGIN: Plugin = {
  enforce: 'pre',
  transform(code: string, id: string): string | undefined {
    if (!id.endsWith('.code-workspace')) {
      return;
    }

    return `export default ${code};`;
  },
};
