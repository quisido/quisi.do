import npxEslint from './npx-eslint.js';

interface Options {
  readonly format: 'html' | 'json';
}

export default async function report({ format }: Options): Promise<void> {
  await npxEslint(
    '--config',
    'eslint.config.ts',
    '--format',
    format,
    '--output-file',
    `.tests/eslint.${format}`,
    '--stats',
  );
}
