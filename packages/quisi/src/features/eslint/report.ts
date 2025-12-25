import npxEslint from './npx-eslint.js';

interface Options {
  readonly eslintConfigFile: string;
  readonly format: 'html' | 'json';
}

export default async function report({
  eslintConfigFile,
  format,
}: Options): Promise<void> {
  await npxEslint(
    '--config',
    eslintConfigFile,
    '--format',
    format,
    '--output-file',
    `.tests/eslint.${format}`,
    '--stats',
  );
}
