import type { CompilerOptions } from 'typescript/unstable/proto';
import getPackageJson from '../../utils/get-package-json.js';

const REACT_JSX_EMIT: NonNullable<CompilerOptions['jsx']> = 4;

export default async function createJsx(): Promise<CompilerOptions['jsx']> {
  const { dependencies, devDependencies } = await getPackageJson();

  if (
    typeof dependencies === 'object' &&
    dependencies !== null &&
    'react' in dependencies
  ) {
    return REACT_JSX_EMIT;
  }

  if (
    typeof devDependencies === 'object' &&
    devDependencies !== null &&
    'react' in devDependencies
  ) {
    return REACT_JSX_EMIT;
  }

  return undefined;
}
