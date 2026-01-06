import { type Dirent, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type PackageJson from './types/package-json.js';
import type VSCodeExtensionsJson from './types/vs-code-extensions-json.js';
import describeWorkspaces from './utils/describe-workspaces.js';
import mapDirectoryToPackageJson from './utils/map-directory-to-package-json.js';
import mapDirectoryToVsCodeExtensionsJson from './utils/map-directory-to-vs-code-extensions-json.js';

const DEPENDENCY_EXTENSIONS: Record<string, string> = {
  eslint: 'dbaeumer.vscode-eslint',
  publint: 'kravets.vscode-publint',
  stylelint: 'stylelint.vscode-stylelint',
  vitest: 'vitest.explorer',
};

const FILE_EXTENSIONS: Record<string, string> = {
  // '**/*.sql': 'alexcvzz.vscode-sqlite',
  // '**/*.yml': 'redhat.vscode-yaml',
  '.coderabbit.yml': 'coderabbit.coderabbit-vscode',
  '.editorconfig': 'editorconfig.editorconfig',
  '.github/copilot-instructions.md': 'github.copilot',
  // '.github/workflows/*': 'github.vscode-github-actions',
};

describeWorkspaces(async (dirent: Dirent): Promise<void> => {
  const packageJson: PackageJson = await mapDirectoryToPackageJson(dirent);
  const isApplication: boolean = packageJson.private === true;

  describe('.vscode/extensions.json', async (): Promise<void> => {
    const extensions: VSCodeExtensionsJson =
      await mapDirectoryToVsCodeExtensionsJson(dirent);

    it('should recommend relevant extensions', (): void => {
      const dependencies = new Set<string>(
        Object.keys({
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        }),
      );

      for (const [dependency, extension] of Object.entries(
        DEPENDENCY_EXTENSIONS,
      )) {
        if (dependencies.has(dependency)) {
          expect(extensions.recommendations).toContain(extension);
        } else {
          expect(extensions.recommendations).not.toContain(extension);
        }
      }

      for (const [glob, extension] of Object.entries(FILE_EXTENSIONS)) {
        if (existsSync(join(dirent.parentPath, dirent.name, glob))) {
          expect(extensions.recommendations).toContain(extension);
        } else {
          expect(extensions.recommendations).not.toContain(extension);
        }
      }
    });
  });

  describe('package.json', (): void => {
    it('should contain a funding field', (): void => {
      expect(packageJson.funding).toEqual({
        type: 'individual',
        url: 'https://github.com/sponsors/quisido',
      });
    });

    // Modules should be tested with quisi.
    it.runIf(!isApplication)('should test with quisi', (): void => {
      expect(packageJson.scripts?.['test']).toMatch(/^quisi test\b/u);
    });
  });
});
