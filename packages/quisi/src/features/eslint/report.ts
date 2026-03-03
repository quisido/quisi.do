import npxEslint from './npx-eslint.js';

interface Options {
  readonly format: 'html' | 'json';
}

export default async function report({ format }: Options): Promise<string> {
  const outputFile: string = `.tests/eslint.${format}`;

  await npxEslint(
    '--config',
    'eslint.config.ts',
    '--format',
    format,
    '--output-file',
    outputFile,
    '--stats',
  );

  return outputFile;
}
