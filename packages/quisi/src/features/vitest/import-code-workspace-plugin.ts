import type { Plugin } from 'vite';

export const IMPORT_CODE_WORKSPACE_PLUGIN: Plugin = {
  enforce: 'pre',
  name: '@quisido/import-code-workspace',
  transform(code, id): string | undefined {
    if (!id.endsWith('.code-workspace')) {
      return;
    }

    return `export default ${code};`;
  },
};
